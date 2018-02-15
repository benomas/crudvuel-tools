<template>
  <cv-tag :tag="tag">
    <cv-simple-filters 
      @go-to-find="prepareToFind"
      v-if="cSimpleFilters"
    >
    </cv-simple-filters>
    <cv-advanced-filters 
      @go-to-find="prepareToFind"
      v-if="cAdvancedFilters"
    >
    </cv-advanced-filters>
    <cv-expert-filters 
      @go-to-find="prepareToFind"
      v-if="cExpertFilters"
    >
    </cv-expert-filters>
    <hr v-if="cTotalPageElements && topPaginate">
    <cv-paginate
      v-if ='cTotalPageElements && topPaginate'
      :cvTotalQueryElements='elementsCount'
      :cvTotalPageElements='cTotalPageElements'
      :cvCurrentPage='cvParametrizer.getPage()'
      :cvLimit='cvParametrizer.getLimit()'
      :cvPagesPerView='pagesPerView'
      :cvLimitValues='limitValues'
      @event-page="refreshPaginate"
    >
    </cv-paginate>
    <hr v-if="cTotalPageElements && topPaginate">
    <slot name="cv-grid-data">
    </slot>
    <hr v-if="cTotalPageElements && bottomPaginate">
    <cv-paginate
      v-if='cTotalPageElements && bottomPaginate'
      :cvTotalQueryElements='elementsCount'
      :cvTotalPageElements='cTotalPageElements'
      :cvCurrentPage='cvParametrizer.getPage()'
      :cvLimit='cvParametrizer.getLimit()'
      :cvPagesPerView='pagesPerView'
      :cvLimitValues='limitValues'
      @event-page="refreshPaginate"
    >
    </cv-paginate>
    <hr v-if="cTotalPageElements && bottomPaginate">
  </cv-tag>
</template>
<script>

import CvTag from '../CvTag'
import CvPaginate from './CvPaginate'
import CvSimpleFilters from './CvSimpleFilters'
import CvAdvancedFilters from './CvAdvancedFilters'
import CvExpertFilters from './CvExpertFilters'
import CvSpinner from './CvSpinner'
import CvParametrizer from '../../CvParametrizer'
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
      config:null,
      correctConfig:true,
      cvParametrizer:new CvParametrizer(),
      cvThs:null,
      cvTds:null,
      cvTableChildren:null,
      cvHeadTrChildren:null,
      cvBodyTrs:null,
      rows:[],
      elementsCount:0,
    }
  },
  props:[
    "tag",
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
  ],
  computed:{
    initialPage:function(){
      return this.cvPage || 1
    },
    initialByColumn:function(){
      return this.cvByColumn || 0
    },
    initialLimit:function(){
      return this.cvLimit || 10
    },
    initialOrderBy:function(){
      return this.cvOrderBy || "id"
    },
    initialAscending:function(){
      return this.cvAscending || 1
    },
    limitValues:function(){
      return this.cvLimitValues || [10,20,50,100,200]
    },
    pagesPerView:function(){
      return this.cvPagesPerView || 5
    },
    cTotalPageElements:function(){
      return this.rows.length || 0
    },
    topPaginate:function(){
      return this.cvTopPaginate || false
    },
    bottomPaginate:function(){
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
  },
  mounted:function(){
    this.processSlots()
    this.refresh()
  },
  created:function(){
    this.cvParametrizer.setPage(this.initialPage)
    this.cvParametrizer.setByColumn(this.initialByColumn)
    this.cvParametrizer.setLimit(this.initialLimit)
    this.cvParametrizer.setOrderBy(this.initialOrderBy)
    this.cvParametrizer.setAscending(this.initialAscending)
  },
  methods:{
    emitSuccessMutation:function(response){
      this.rows          = response.data.data
      this.elementsCount = response.data.count
      
      if(this.rows.length===0 && this.elementsCount>0){
        this.cvParametrizer.setPage(Math.ceil(this.elementsCount/this.cvParametrizer.getLimit()))
        this.refresh()
        return false
      }

      this.$emit('success-mutation', this.$data)
    },
    emitErrorMutation:function(response){
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
      this.cvParametrizer.setGeneralSearch(search)
      this.cvParametrizer.setPage(1)
      this.refresh()
    },
    refresh:function(){
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
      this.refresh()
    }
  }
}
</script>
<style lang="scss">

.cv-{
  &orderable{
    cursor:pointer
  }
  &filterable{
  }
  &selectable{
    
  }
}
</style>