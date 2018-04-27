<template>
  <cv-tag
    :tag="cTag"
    class="cv-grid-container"
    :style="{'min-height':cMinHeight, 'opacity':!cReady? '0.5':'1'}"
  >
    <transition name="component-fade" mode="out-in">
      <cv-spinner v-if="!cReady && cIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <transition name="component-fade" mode="out-in">
      <cv-simple-filters
        @go-to-find ="prepareToFind"
        v-if        ="cSimpleFilters"
      >
      </cv-simple-filters>
    </transition>
    <transition name="component-fade" mode="out-in">
      <cv-advanced-filters
        @go-to-find ="prepareToFind"
        v-if        ="cAdvancedFilters"
      >
      </cv-advanced-filters>
    </transition>
    <transition name="component-fade" mode="out-in">
      <cv-expert-filters
        @go-to-find ="prepareToFind"
        v-if        ="cExpertFilters"
      >
      </cv-expert-filters>
    </transition>
    <transition name="component-fade" mode="out-in">
      <hr v-if="cTotalPageElements && cTopPaginate">
    </transition>
    <transition name="component-fade" mode="out-in">
      <cv-paginate
        v-if ='cTotalPageElements && cTopPaginate'
        :cvTotalQueryElements='elementsCount'
        :cvTotalPageElements='cTotalPageElements'
        :cvCurrentPage='cvParametrizer.getPage()'
        :cvLimit='cvParametrizer.getLimit()'
        :cvPagesPerView='cPagesPerView'
        :cvLimitValues='cLimitValues'
        @event-page="refreshPaginate"
        @page-nave-up="pageNavUp"
        @page-nave-down="pageNavDown"
        @page-nave-neutral="pageNavNeutral"
      >
      </cv-paginate>
    </transition>
    <transition name="component-fade" mode="out-in">
      <span
        v-if ='cReady && !cTotalPageElements'
      >
        {{fLang('no-rows','Sin resultados para mostrar')}}
      </span>
    </transition>
    <div :class="{'b-top':cTotalPageElements && cTopPaginate,'b-bottom':cTotalPageElements && cBottomPaginate}" class="cv-grid-data-container">
      <slot name="cv-grid-data">
      </slot>
    </div>
    <transition name="component-fade" mode="out-in">
      <cv-paginate
        v-if='cTotalPageElements && cBottomPaginate'
        :cvTotalQueryElements='elementsCount'
        :cvTotalPageElements='cTotalPageElements'
        :cvCurrentPage='cvParametrizer.getPage()'
        :cvLimit='cvParametrizer.getLimit()'
        :cvPagesPerView='cPagesPerView'
        :cvLimitValues='cLimitValues'
        @event-page="refreshPaginate"
        @page-nave-up="pageNavUp"
        @page-nave-down="pageNavDown"
        @page-nave-neutral="pageNavNeutral"
      >
      </cv-paginate>
    </transition>
    <transition name="component-fade" mode="out-in">
      <hr v-if="cTotalPageElements && cBottomPaginate">
    </transition>
  </cv-tag>
</template>
<script>

import CvTag             from '../CvTag'
import CvPaginate        from './CvPaginate'
import CvSimpleFilters   from './CvSimpleFilters'
import CvAdvancedFilters from './CvAdvancedFilters'
import CvExpertFilters   from './CvExpertFilters'
import CvSpinner         from './CvSpinner'
import CvParametrizer    from '../../CvParametrizer'
export default {
  components: {
    CvTag,
    CvPaginate,
    CvSimpleFilters,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSpinner,
  },
  data () {
    return {
      config           : null,
      correctConfig    : true,
      cvParametrizer   : new CvParametrizer(),
      cvThs            : null,
      cvTds            : null,
      cvTableChildren  : null,
      cvHeadTrChildren : null,
      cvBodyTrs        : null,
      rows             : [],
      elementsCount    : 0,
      ready            : false,
      isMounted        : false
    }
  },
  props:[
    "cvTag",
    "cvService",
    "cvPage",
    "cvByColumn",
    "cvLimit",
    "cvOrderBy",
    "cvAscending",
    "cvPagesPerView",
    "cvContext",
    "cvLimitValues",
    "cvTopPaginate",
    "cvBottomPaginate",
    "cvSimpleFilters",
    "cvAdvancedFilters",
    "cvExpertFilters",
    "cvMinHeight",
    "cvGridLang"
  ],
  computed:{
    cPage:function(){
      return this.cvPage || 1
    },
    cByColumn:function(){
      return this.cvByColumn || 0
    },
    cLimit:function(){
      return this.cvLimit || 10
    },
    cOrderBy:function(){
      return this.cvOrderBy || "id"
    },
    cAscending:function(){
      return this.cvAscending || 1
    },
    cLimitValues:function(){
      return this.cvLimitValues || [10,20,50,100,200]
    },
    cPagesPerView:function(){
      return this.cvPagesPerView || 5
    },
    cTotalPageElements:function(){
      return this.rows.length || 0
    },
    cTopPaginate:function(){
      return this.cvTopPaginate || false
    },
    cBottomPaginate:function(){
      return this.cvBottomPaginate || false
    },
    cSimpleFilters:function(){
      return typeof this.cvSimpleFilters!=="undefined"?this.cvSimpleFilters:true
    },
    cAdvancedFilters:function(){
      return typeof this.cvAdvancedFilters!=="undefined"?this.cvAdvancedFilters:false
    },
    cExpertFilters:function(){
      return typeof this.cvExpertFilters!=="undefined"?this.cvExpertFilters:false
    },
    cTag:function(){
      return this.cvTag || "div"
    },
    cReady : function () {
      return this.ready || false
    },
    cMinHeight :  function () {
      return this.cvMinHeight || '300px'
    },
    cSelfRef :  function () {
      return this
    },
    cIsMounted: function () {
      return this.isMounted || false
    },
    cGridLang: function () {
      return this.cvGridLang || null
    }
  },
  mounted:function(){
    this.isMounted = true
    this.processSlots()
    this.refresh()
  },
  created:function(){
    this.cvParametrizer.setPage(this.cPage)
    this.cvParametrizer.setByColumn(this.cByColumn)
    this.cvParametrizer.setLimit(this.cLimit)
    this.cvParametrizer.setOrderBy(this.cOrderBy)
    this.cvParametrizer.setAscending(this.cAscending)
  },
  methods:{
    pageNavUp: function () {
      this.$emit('page-nave-up');
    },
    pageNavDown: function () {
      this.$emit('page-nave-down');
    },
    pageNavNeutral: function () {
      this.$emit('page-nave-neutral');
    },
    emitSuccessMutation:function(response){
      this.rows          = response.data.data
      this.elementsCount = response.data.count

      if(this.rows.length===0 && this.elementsCount>0){
        this.cvParametrizer.setPage(Math.ceil(this.elementsCount/this.cvParametrizer.getLimit()))
        this.refresh()
        return false
      }

      this.ready=true
      this.$emit('success-mutation', this.$data)
    },
    emitErrorMutation:function(response){
      this.ready=true
      this.$emit('error-mutation', this.$data)
    },
    emitInitialMutation:function(){
      this.$emit('initial-mutation', this.$data)
    },
    refreshPaginate:function(event){
      this.cvParametrizer.setPage(event.page)
      this.cvParametrizer.setLimit(event.limit)
      this.refresh()
    },
    prepareToFind(search){
      if(this.cvParametrizer.getGeneralSearch() === search)
        return false
      this.cvParametrizer.setGeneralSearch(search)
      this.cvParametrizer.setPage(1)
      this.refresh()
    },
    refresh:function(){
      this.ready=false
      this.cvService(this.emitSuccessMutation,this.emitErrorMutation,null,null,this.cvParametrizer.getSerialized())
    },
    showConfigErrorMessage:function(){
      this.correctConfig=false
      console.log("configurations error for cv-grid component")
      return false
    },
    findComponentChild:function(currentNode,component){
      if(!currentNode)
        return false

      if(
          typeof currentNode.children ==="undefined" &&
          typeof currentNode.componentInstance ==="undefined"
        )
        return false

      if(currentNode.componentInstance && currentNode.componentOptions.tag===component)
        return currentNode

      let componentFound = false
      for(let i=0; i<currentNode["children"].length; i++){
        if(currentNode["children"][i]["tag"])
          componentFound = this.findComponentChild(currentNode["children"][i],component)
        if(componentFound)
          return componentFound
      }
      return false
    },
    findSlotChild:function(currentNode,slot){
      if(!currentNode)
        return false;

      if( typeof currentNode.children ==="undefined" &&
          ( typeof currentNode.componentInstance ==="undefined" ||
            typeof currentNode.componentInstance.$slots ==="undefined" ||
            typeof currentNode.componentInstance.$slots[slot] ==="undefined"
          )
        )
        return false
      if(currentNode.componentInstance)
        return currentNode.componentInstance.$slots[slot]

      let slotFound = false
      for(let i=0; i<currentNode["children"].length; i++){
        if(currentNode["children"][i]["tag"])
          slotFound = this.findSlotChild(currentNode["children"][i],slot)
        if(slotFound)
          return slotFound
      }
      return false
    },
    processSlots:function(){
      if(
        !this.$slots["cv-grid-data"] ||
        !(this.cvThs = this.findComponentChild(this.$slots["cv-grid-data"][0],"cv-ths"))
      )
        return this.showConfigErrorMessage()
      var cvThsSlot
      if(!(cvThsSlot = this.findSlotChild(this.cvThs,"cv-ths-slot")))
        return this.showConfigErrorMessage()

      this.cvHeadTrChildren = this.findConfig(cvThsSlot[0])
      if(!this.cvHeadTrChildren)
        return false;
      for(let i=0; i<this.cvHeadTrChildren.length; i++){
        let cvTh =  this.cvHeadTrChildren[i]
        if(typeof cvTh.data==="undefined" || typeof cvTh.data.attrs==="undefined")
          continue
        let attrs =  cvTh.data.attrs
        if(attrs["cv-key"]){
          if(this.hasClass(cvTh,"cv-selectable")!==false)
            this.cvParametrizer.pushSelect(attrs["cv-key"])
          if(this.hasClass(cvTh,"cv-filterable")!==false)
            this.cvParametrizer.pushFilter(attrs["cv-key"],"")
          if(this.hasClass(cvTh,"cv-orderable")!==false)
            cvTh.elm.onclick=()=>{ this.lauchOrder(cvTh) }
        }
      }
    },
    hasClass:function(cvTh,cvClass){
      for(let i=0; i<cvTh.elm.classList.length; i++)
        if(cvTh.elm.classList[i]===cvClass)
          return i;
      return false;
    },
    findConfig:function(slotTree){

      if(slotTree.data && slotTree.data.attrs && slotTree.data.attrs["cv-role"] && slotTree.data.attrs["cv-role"]==="cv-header-config")
        return this.getSlotChildren(slotTree)

      if(!slotTree || !slotTree.children)
        return false

      var recursiveStat=false
      for(let i=0; i<slotTree.children.length; i++){
        recursiveStat = this.findConfig(slotTree.children[i])
        if(recursiveStat)
          return recursiveStat
      }
      return recursiveStat
    },
    getSlotChildren:function(slot){

      if(!slot || !slot["children"] || slot["children"]["length"]===0)
        return this.showConfigErrorMessage()

      let children = []
      for(let i=0; i<slot["children"].length; i++){
        if(slot["children"][i]["tag"])
          children.push(slot["children"][i])
      }

      if(children.length===0)
        return false
      return children
    },
    lauchOrder(cvTh){
      this.cvParametrizer.setOrderBy(cvTh.data.attrs["cv-key"])
      this.cvParametrizer.setAscending(this.cvParametrizer.getAscending()?0:1)
      this.pageNavNeutral();
      this.refresh()
    },
    fLang: function(word,defWord) {
      if(this.cGridLang && this.cGridLang[word])
        return this.cGridLang[word]
      return defWord || ''
    }
  }
}
</script>
<style lang="scss" scoped>
.cv-grid-container{
  & .cv-{
    &orderable{
      cursor:pointer
    }
    &filterable{
    }
    &selectable{

    }
  }
  & hr{
    border: 0;
    border-top: 1px solid #CCCCCC;
  }

  .b-top{
    border-top:1px solid #CCCCCC;
  }

  .b-bottom{
    border-bottom:1px solid #CCCCCC;
  }

  .cv-grid-data-container{
    overflow-x: auto;
  }
}
</style>
