<template>
  <cv-tag
    :tag="cTag"
    class="cv-grid-container f-weight-400"
    :style="{'min-height':cMinHeight, 'opacity':!cReady? '0.5':'1'}"
  >
    <transition name="component-fade" mode="out-in">
      <cv-spinner v-if="!cReady && cdIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <div>
      <cv-filter-selector @cv-filter-selected="mSwitchFilter" :cv-current-filter="cdGridCurrentFilter"></cv-filter-selector>
      <!--<transition name="component-fade" mode="out-in">-->
        <cv-simple-filter
          v-if="cSimpleFilter"
          class="q-pb-md"
          :class="{'mxw-300px':cGtxs,'q-pl-xs q-pr-md':cLtmd}"
          v-bind="mCustomBingins('cv-simple-filter')"
          v-on="mOns('cv-simple-filter')"
        >
        </cv-simple-filter>
      <!--</transition>-->
      <!--<transition name="component-fade" mode="out-in">-->
        <cv-combinatory-filters
          v-if="cCombinatoryFilters"
          :class="{'mxw-300px':cGtxs,'q-pl-xs q-pr-md':cLtmd}"
          class="q-pb-md"
          v-bind="mDefMatcherizerProps()"
          :cv-search-label="'Busqueda dinamica'"
          cv-search-icon="fas fa-search-plus"
          @cv-filter-go-to-find="prepareToFind"
        >
        </cv-combinatory-filters>
      <!--</transition>-->
      <!--<transition name="component-fade" mode="out-in">-->
        <cv-advanced-filters
          @go-to-find ="prepareToFind"
          v-if        ="cAdvancedFilters"
        >
        </cv-advanced-filters>
      <!--</transition>-->
      <!--<transition name="component-fade" mode="out-in">-->
        <cv-expert-filters
          @go-to-find ="prepareToFind"
          v-if        ="cExpertFilters"
        >
        </cv-expert-filters>
      <!--</transition>-->
    </div>
    <transition name="component-fade" mode="out-in">
      <hr v-if="cTotalPageElements && cTopPaginate">
    </transition>
    <transition name="component-fade" mode="out-in">
      <cv-paginate
        v-if ='cTotalPageElements && cTopPaginate'
        ref="top-cv-paginate"
        cvPosition="top"
        :cvTotalQueryElements='elementsCount'
        :cvTotalPageElements='cTotalPageElements'
        :cvCurrentPage='cvParametrizer.getPage()'
        :cvLimit='cDLimit'
        :cvPagesPerView='cPagesPerView'
        :cvLimitValues='cLimitValues'
        :cvReady='cReady'
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
    <div class="cv-grid-data-container">
      <slot name="cv-grid-data">
      </slot>
    </div>
    <transition name="component-fade" mode="out-in">
      <cv-paginate
        v-if='cTotalPageElements && cBottomPaginate'
        ref="bottom-cv-paginate"
        cvPosition="bottom"
        :cvTotalQueryElements='elementsCount'
        :cvTotalPageElements='cTotalPageElements'
        :cvCurrentPage='cvParametrizer.getPage()'
        :cvLimit='cDLimit'
        :cvPagesPerView='cPagesPerView'
        :cvLimitValues='cLimitValues'
        :cvReady='cReady'
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

import CvTag                    from '../CvTag'
import CvPaginate               from './CvPaginate'
import CvSimpleFilter           from './CvSimpleFilter'
import CvCombinatoryFilters     from './CvCombinatoryFilters'
import CvAdvancedFilters        from './CvAdvancedFilters'
import CvExpertFilters          from './CvExpertFilters'
import CvSpinner                from './CvSpinner'
import CvParametrizer           from '../../CvParametrizer'
import CvFilterSelector         from './CvFilterSelector'
import CvLocalSimpleFilterTrait from './CvLocalSimpleFilterTrait'
import CvGridMirroring          from './CvGridMirroring'
export default {
  mixins     : [
    CvLocalSimpleFilterTrait,
    CvGridMirroring
  ],
  components : {
    CvTag,
    CvPaginate,
    CvSimpleFilter,
    CvCombinatoryFilters,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSpinner,
    CvFilterSelector
  },
  data () {
    return {
      config                 : null,
      correctConfig          : true,
      cvParametrizer         : new CvParametrizer(),
      cvThs                  : null,
      cvTds                  : null,
      cvTableChildren        : null,
      cvHeadTrChildren       : null,
      cvBodyTrs              : null,
      rows                   : [],
      elementsCount          : 0,
      ready                  : false,
      isMounted              : false,
      showSimpleFilter      : true,
      showCombinatoryFilters : false,
      showAdvancedFilters    : false,
      showExpertFilters      : false,
      gridCurrentFilter      : null
    }
  },
  props:[
    "cvTag",
    "cvRows",
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
    "cvSimpleFilter",
    "cvCombinatoryFilters",
    "cvAdvancedFilters",
    "cvExpertFilters",
    "cvMinHeight",
    "cvGridLang",
    "cvIcon",
    "cvSearchLabel"
  ],
  computed:{
    cRows: function () {
      return this.cvRows
    },
    cPage:function(){
      return this.cvPage || 1
    },
    cByColumn:function(){
      return this.cvByColumn || 0
    },
    cLimit:function(){
      return this.cvLimit || 10
    },
    cDLimit: function (){
      return this.cvParametrizer.getLimit() || this.cLimit
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
    cSimpleFilter:function(){
      return this.showSimpleFilter
    },
    cCombinatoryFilters:function(){
      return this.showCombinatoryFilters
    },
    cAdvancedFilters:function(){
      return this.showAdvancedFilters
    },
    cExpertFilters:function(){
      return this.showExpertFilters
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
    cdIsMounted: function () {
      return this.isMounted || false
    },
    cGridLang: function () {
      return this.cvGridLang || null
    },
    cIcon: function () {
      return this.cvIcon
    },
    cpSearchLabel:function(){
      return this.cvSearchLabel
    }
  },
  mounted:function(){
    this.isMounted = true
    if (this.cRows)
      this.$set(this,'rows',this.rows)
    this.showSimpleFilter      = this.cvSimpleFilter || this.showSimpleFilter
    this.showCombinatoryFilters = this.cvCombinatoryFilters || this.showCombinatoryFilters
    this.showAdvancedFilters    = this.cvAdvancedFilters || this.showAdvancedFilters
    this.showExpertFilters      = this.cvExpertFilters || this.showExpertFilters
    //this.processSlots()
    //this.refresh()
  },
  created:function(){
    this.cvParametrizer.setPage(this.cPage)
    this.cvParametrizer.setByColumn(this.cByColumn)
    this.cvParametrizer.setLimit(this.cLimit)
    this.cvParametrizer.setOrderBy(this.cOrderBy)
    this.cvParametrizer.setAscending(this.cAscending)
    this.gridCurrentFilter = this.cGridCurrentFilter
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
      this.$nextTick().then(() => {
        if (this.$refs['top-cv-paginate'] != null )
          this.$refs['top-cv-paginate'].refreshParams()
        if (this.$refs['bottom-cv-paginate'] != null )
          this.$refs['bottom-cv-paginate'].refreshParams()
      })
      this.refresh()
    },
    prepareToFind(search = {}) {
      let searchObject = search.searchObject != null ? search.searchObject : ''
      let searchMode   = search.searchMode != null ? search.searchMode : 'cv-simple-paginator'

      if(this.cvParametrizer.getSearchObject() === searchObject && this.cvParametrizer.getSearchMode() === searchMode)
        return false
      this.cvParametrizer.setSearchObject(searchObject)
      this.cvParametrizer.setSearchMode(searchMode)
      this.cvParametrizer.setPage(1)
      this.pageNavNeutral()
      this.refresh()
    },
    emGridSimpleFilterGoToFindProcesor(search = {}) {
      console.log('asdasd')
      /*
      let searchObject = search.searchObject != null ? search.searchObject : ''
      let searchMode   = search.searchMode != null ? search.searchMode : 'cv-simple-paginator'

      if(this.cvParametrizer.getSearchObject() === searchObject && this.cvParametrizer.getSearchMode() === searchMode)
        return false
      this.cvParametrizer.setSearchObject(searchObject)
      this.cvParametrizer.setSearchMode(searchMode)
      this.cvParametrizer.setPage(1)
      this.pageNavNeutral()
      this.refresh()*/
    },
    forceToFind() {
      let searchObject = this.cvParametrizer.getSearchObject()
      let searchMode = this.cvParametrizer.getSearchMode()
      this.cvParametrizer.setSearchObject(searchObject)
      this.cvParametrizer.setSearchMode(searchMode)
      this.cvParametrizer.setPage(1)
      this.pageNavNeutral()
      this.refresh()
    },
    refresh:function(){
      this.ready=false
      if (this.cvService)
        this.cvService(null,null,this.cvParametrizer.getSerialized())
          .then(this.emitSuccessMutation)
          .catch(this.emitErrorMutation)
      else
        this.emitSuccessMutation({response:{data:{data:this.rows}}})
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
      for(let i=0; i<currentNode.children.length; i++){
        if(currentNode.children[i]["tag"])
          componentFound = this.findComponentChild(currentNode.children[i],component)
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
    },
    mSwitchFilter: function (newFilter=null) {
      this.showSimpleFilter      = false
      this.showCombinatoryFilters = false
      this.showAdvancedFilters    = false
      this.showExpertFilters      = false
      switch (newFilter){
        case 'simple-filters':
          this.showSimpleFilter = true
          this.gridCurrentFilter     = newFilter
          this.cvParametrizer.setSearchMode(newFilter)
          break
        case 'combinatory-filters':
          this.showCombinatoryFilters = true
          this.gridCurrentFilter     = newFilter
          this.cvParametrizer.setSearchMode(newFilter)
          break
        case 'advanced-filters':
          this.showAdvancedFilters = true
          this.gridCurrentFilter     = newFilter
          this.cvParametrizer.setSearchMode(newFilter)
          break
        case 'expert-filters':
          this.showExpertFilters = true
          this.gridCurrentFilter     = newFilter
          this.cvParametrizer.setSearchMode(newFilter)
          break
      }
      this.cvParametrizer.setSearchObject('')
      this.mGridSwitchFilterStartEmiter()
    }
  }
}
</script>
