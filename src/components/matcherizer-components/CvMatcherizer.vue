<template>
  <div class="cv-matcherizer-container">
    <div
      class="list-items"
    >
      <div
        ref="filterReference"
      >
        <cv-simple-filters
          @cv-keyup="keyed"
          @go-to-find="prepareToFindSource"
          @cv-focused="focused"
          @cv-blured="blured"
          @cv-cleared="resetCurrent"
          :cv-search-label="cSourceLabel"
          :cv-search-message="cSourceMessage"
          ref="cvSimpleFilterRef"
          :cv-active-filter="cShowingSelected"
          :cv-disable-fields="cDisableFields"
          :cv-key-interruption-limit="cKeyInterruptionLimit"
        >
        </cv-simple-filters>
      </div>
      <ul
        v-if="cShowList"
        @mouseover="listIn"
        @mouseleave="listOut"
        class="list-group"
        :style="{'width':cContainerWidth}"
      >
        <li
            v-if="!cLoading"
            class="list-group-item"
            v-for="(row, rowKey) in cListOfItems"
            v-on:click="add(rowKey,row)"
            :class="{'single-selected':mValueCallBack(cListOfItems,row)===cCurrentValue,'current-cursor-item':currentItem===rowKey}"
            :key="mValueCallBack(cListOfItems,row)"
            v-html="showPatter(mLabelCallBack(cListOfItems,row))"
        >
        </li>
        <li
          v-if="cLoading"
          class="list-group-item more-data-message"
        >
          Cargando...
        </li>
        <li
          v-if="sourceCount && sourceCount > cListOfItemsLimit"
          class="list-group-item more-data-message"
        >
          {{cMoreDataMessage}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import CvParametrizer    from '../../CvParametrizer'
import CvSimpleFilters   from '../grid-components/CvSimpleFilters'
export default {
  components: {
    CvSimpleFilters
  },
  data () {
    return {
      sourceParametrizer : new CvParametrizer(),
      sourceCount        : 0,
      sourcePageCount    : null,
      generalSearch      : '',
      sourceData         : [],
      localData          : [],
      currentValue       : null,
      currentLabel       : null,
      focus              : false,
      listOver           : false,
      listWidth          :'200px',
      loading            : false,
      disableList        : false,
      listOfItems        : null,
      absolueRemoteData  : false,
      currentItem        : null,
    }
  },
  props:[
    'cvParentRef',
    'cvCurrentValue',
    'cvCurrentLabel',
    'cvSourceLabel',
    'cvSourceMessage',
    'cvLabelCallBack',// anonimousFuntion
    'cvValueCallBack',
    'cvListOfItemsLimit',
    'cvEnableAdd',
    'cvEnableRemove',
    'cvAddCallBack',
    'cvRemoveCallBack',
    'cvDisableFields',
    'cvLocalLimit',
    'cvLoading',
    'cvSelectQuery',
    'cvPage',
    'cvByColumn',
    'cvLimit',
    'cvOrderBy',
    'cvAscending',
    'cvFilterQuery',
    'cvSourceService',
    'cvLocalData',
    'cvKeyInterruptionLimit',
    'cvMoreDataMessage',
    'cvDestination'
  ],
  methods:{
    //sourceData
    emitSuccessMutationSource:function(response){
      this.loaded()
      this.sourceData      = response.data.data
      this.sourceCount     = response.data.count
      this.sourcePageCount = response.data.data.length
      this.processList()
      this.$emit('success-source-mutation', this.$data)
    },
    emitErrorMutationSource:function(response){
      this.loaded()
      this.processList()
      this.$emit('error-source-mutation', this.$data)
    },
    emitInitialMutationSource:function(){
      this.loaded()
      this.$emit('initial-source-mutation', this.$data)
    },
    refreshPaginateSource:function(event){
      this.sourceParametrizer.setPage(event.page)
      this.sourceParametrizer.setLimit(event.limit)
      this.refreshSource()
    },
    prepareToFindSource:function(search){
      this.generalSearch = search
      if( !this.requireNewRemoteSearch() ){
        this.processList()
        this.disableList   = false
        return false
      }

      this.saveSearchState()
      this.disableList   = false
      this.toLoad()
      this.refreshSource()
    },
    refreshSource:function(){
      this.cSourceService(
        this.emitSuccessMutationSource,
        this.emitErrorMutationSource,
        null,
        null,
        this.sourceParametrizer.getSerialized()
      )
    },
    //others
    mLabelCallBack:function(rows,row){
      if(typeof this.cvLabelCallBack ==='undefined')
        return row.name || ''

      return typeof this.cvLabelCallBack ==='function'?
        this.cvLabelCallBack(rows,row):this.cvLabelCallBack
    },
    mValueCallBack:function(rows,row){
      if(typeof this.cvValueCallBack ==='undefined')
        return row.id || ''

      return typeof this.cvValueCallBack ==='function'?
        this.cvValueCallBack(rows,row):this.cvValueCallBack
    },
    mAddCallBack:function(rows,row){
      if (typeof this.cvAddCallBack ==='function')
        this.cvAddCallBack(rows,row)
    },
    mRemoveCallBack:function(rows,row){
      if (typeof this.cvRemoveCallBack ==='function')
        this.cvRemoveCallBack(rows,row)
    },
    add:function(rowKey,row){
      this.disableList  = true
      this.setCurrent(this.cListOfItems,row)
      //this.focus=false
      this.listOver=false
    },
    setSearch: function (label = null) {
      if(this.cSimpleFilterRef){
        if (label===null)
          label = this.currentLabel
        this.cSimpleFilterRef.search = label
      }
    },
    setCurrent:function(rows,row){
      if(this.cDisableFields)
        return false;
      this.currentLabel = this.mLabelCallBack(rows,row)
      this.currentValue = this.mValueCallBack(rows,row)
      this.refresh()
      if(this.cParentRef){
        this.cParentRef.vueSetter({cvColumnMap:this.cColumnMap,row,destination:this.cDestination})
      }
      this.$emit('cv-single-selected', {cvColumnMap:this.cColumnMap,row,destination:this.cDestination})
    },
    resetCurrent:function(){
      //this.focus=true
      /*
      if(this.cDisableFields)
        return false;
      */
      this.currentLabel = ''
      this.currentValue = null
      this.refresh()
      if(this.cParentRef)
        this.cParentRef.vueSetter({cvColumnMap:this.cColumnMap,row:null,destination:this.cDestination})
      this.$emit('cv-reset', {cvColumnMap:this.cColumnMap,row:null,destination:this.cDestination})
    },
    refresh:function(){
      this.setSearch()
      this.prepareToFindSource(this.currentLabel)
    },
    focused:function(){
      if(this.cDisableFields)
        return false
      this.currentItem=null
      this.focus=true
      if(this.cSimpleFilterRef)
        this.setSearch(this.cGeneralSearch)
        //this.cSimpleFilterRef.search = this.cGeneralSearch
      this.fixListWidth()
      this.$emit('cv-focused', this.search);
    },
    blured:function(){
      this.focus=false;
      if(this.currentLabel && this.currentLabel !== '')
        this.setSearch()
      this.$emit('cv-blured', this.search);
    },
    keyed:function(key){
      if (typeof key === 'undefined' || !key || typeof key.keyCode === 'undefined')
        return false

      switch(key.keyCode){
        case 38:
          if(this.currentItem !== null && this.currentItem > 0)
            this.currentItem--
          break
        case 40:
          if(this.currentItem === null && this.cListOfItems.length){
            this.currentItem = 0
            break
          }
          if (this.currentItem !== null && this.currentItem<this.cListOfItems.length-1)
            this.currentItem++
          break
        case 13:
          if(this.currentItem !== null && this.currentItem >= 0 && this.currentItem<this.cListOfItems.length)
            this.add(this.currentItem,this.cListOfItems[this.currentItem])
          break
        case 27:
          if(this.cSimpleFilterRef)
            this.cSimpleFilterRef.clear()
          break
        default: this.currentItem = null
          break
      }
      //console.log(key.keyCode)
    },
    listIn:function(){
      this.listOver=true;
      this.fixListWidth()
      this.$emit('cv-list-in', this.search);
    },
    listOut:function(){
      this.listOver=false;
      this.$emit('cv-list-out', this.search);
    },
    fixListWidth:function(){
      if( typeof this.$refs.filterReference!=='undefined' &&
          typeof this.$refs.filterReference.offsetWidth!=='undefined'
          )
        this.listWidth = this.$refs.filterReference.offsetWidth +'px'
      else
        this.listWidth = '200px'
    },
    toLoad:function(){
      this.loading = true
      this.$emit('cv-toLoad');
    },
    loaded:function(){
      this.loading = false
      this.$emit('cv-loaded');
    },
    saveSearchState:function(){
      this.sourceParametrizer.setPage(this.cPage)
      this.sourceParametrizer.setByColumn(this.cByColumn)
      this.sourceParametrizer.setLimit(this.cLimit)
      this.sourceParametrizer.setOrderBy(this.cOrderBy)
      this.sourceParametrizer.setAscending(this.cAscending)
      this.sourceParametrizer.setFilterQuery(this.cFilterQuery)
      this.sourceParametrizer.setSelectQuery(this.cSelectQuery)
      this.sourceParametrizer.setGeneralSearch(this.cGeneralSearch)
    },
    mySubString: function(subject,patter){
      let regexString = "(.|\s)*" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + "(.|\s)*"
      let patt = new RegExp(regexString,"i")
      return patt.test(subject)
    },
    myReplace: function(subject,patter,replace){
      let regexString = "(" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + ")"
      let patt = new RegExp(regexString,"ig")
      let fixDataType = subject
      if(typeof fixDataType === 'boolean' || typeof fixDataType === 'number')
        fixDataType=fixDataType.toString()
      return fixDataType.replace(patt,replace)
    },
    processList: function () {
      this.listOfItems = []
      let data = this.cSourceListOfItems
      if(typeof data ==='undefined' || !data)
        return this.listOfItems
      for (let i = 0; i < data.length; i++){
        if(this.listOfItems.length === this.cListOfItemsLimit)
          return this.listOfItems

        let currentItemLabel = this.mLabelCallBack(data,data[i])

        if(this.mySubString(currentItemLabel,this.generalSearch))
          this.listOfItems.push(data[i])
      }
      return this.listOfItems
    },
    showPatter:function(label,isCurrent){
      let located = this.myReplace(label,this.generalSearch,'<span class="matcherizer-item">$1</span>')
      if(isCurrent)
        located += this.currentSelectedItemMark()
      return located
    },
    currentSelectedItemMark: function () {
      return '<span class="f-right">*</span>'
    },
    requireNewRemoteSearch:function(){
      //when matcherizer has receiving static cvLocalData, then is not necesary to make a remote data call
      if (this.cLocalData)
        return false

      let lastSearch = this.sourceParametrizer.getGeneralSearch()
      let staticPropertys = [
        'Page',
        'ByColumn',
        'Limit',
        'OrderBy',
        'Ascending',
        'FilterQuery',
        'SelectQuery'
      ]

      if(this.sourcePageCount===null)
        return true

      this.absolueRemoteData = false

      if (lastSearch==='' && this.sourcePageCount!==null && this.sourcePageCount < this.cLimit)
          this.absolueRemoteData = true

      for (let i = 0; i < staticPropertys.length; i++){
        let property=staticPropertys[i]
        if( typeof this.sourceParametrizer['get'+property] !=='function' || JSON.stringify(this.sourceParametrizer['get'+property]())  !== JSON.stringify(this['c'+property])){
          this.absolueRemoteData = false
          return true
        }
      }

      if(lastSearch===this.generalSearch)
        return false

      //When the page is full, that means that there is more remote data compatible with the current searsh, other wise, no is necesary to make another remote data call
      if(this.sourcePageCount === this.cLimit)
        return true

      if(this.mySubString(this.generalSearch,lastSearch))
        return false

      if(this.absolueRemoteData)
        return false

      return true
    }
  },
  computed:{
    cCurrentValue:function(){
      return this.currentValue || this.cvCurrentValue || null
    },
    cCurrentLabel:function(){
      return this.currentLabel || this.cvCurrentLabel || null
    },
    cSelectQuery:function(){
      if(typeof this.cvSelectQuery ==='undefined')
        return [];
      return Object.keys(this.cvSelectQuery)
    },
    cPage:function(){
      return this.cvPage || 1
    },
    cByColumn:function(){
      return this.cvByColumn || 0
    },
    cLimit:function(){
      return this.cvLimit || null
    },
    cOrderBy:function(){
      return this.cvOrderBy || 'name'
    },
    cAscending:function(){
      return this.cvAscending || 1
    },
    cFilterQuery:function(){
      return this.cvFilterQuery || {'name':''}
    },
    cGeneralSearch:function(){
      return this.generalSearch || ''
    },
    cSourceService:function(){
      return this.cvSourceService || null
    },
    cEnableAdd:function(){
      return this.cvEnableAdd || true
    },
    cEnableRemove:function(){
      return this.cvEnableRemove || true
    },
    cSourceLabel:function(){
      return this.cvSourceLabel || 'Disponibles'
    },
    cSourceMessage:function(){
      return this.cvSourceMessage || 'Buscar en disponibles'
    },
    cDisableFields:function(){
      return this.cvDisableFields || false
    },
    cColumnMap:function(){
      return this.cvSelectQuery || false
    },
    cShowList:function(){
      if (this.cDisableList)
        return false
      return this.focus || this.listOver
    },
    cContainerWidth:function(){
      return this.listWidth;
    },
    cShowingSelected:function(){
      return this.cCurrentLabel && this.cCurrentLabel!=='' && this.cGeneralSearch === this.cCurrentLabel
    },
    cLoading:function(){
      return this.cvLoading || this.loading || false
    },
    cDisableList:function(){
      return this.disableList || false
    },
    cListOfItemsLimit:function(){
      return this.cvListOfItemsLimit || 10
    },
    cLastSearchFail(){
      return this.sourcePageCount===0
    },
    cLocalData(){
      return this.cvLocalData || null
    },
    cSourceListOfItems:function(){
      return this.cLocalData || this.sourceData
    },
    cListOfItems:function(){
      return this.listOfItems
    },
    cKeyInterruptionLimit:function(){
      return this.cvKeyInterruptionLimit
    },
    cAbsolueRemoteData: function (){
      return this.absolueRemoteData || false
    },
    cMoreDataMessage:function(){
      return this.cvMoreDataMessage || '*Mas resultados disponibles mediante busqueda'
    },
    cDestination: function () {
      return this.cvDestination || 'row'
    },
    cSimpleFilterRef: function () {
      return this.$refs.cvSimpleFilterRef || null
    },
    cInputRef: function() {
      return this.cSimpleFilterRef.cInputRef || null
    },
    cParentRef: function() {
      return this.cvParentRef || null
    }
  },
  mounted:function(){
    this.currenValue  =this.cvCurrentValue
    this.currentLabel =this.cvCurrentLabel
    if (this.currentLabel && this.currentLabel !== '')
      this.setSearch()
  },
  created:function(){
    this.saveSearchState()
  }
}
</script>
<style lang="scss" scoped>
  .cv-matcherizer-container{
    & .related-items{
      padding: 15px;
      & i:hover{
          color:#d9534f;
      };
    }
    & .list-items{
      & i:hover{
          color:#20895e;
      }
      & .single-selected{
        background-color:#dff0d8;
        &-label{
          display:inline-block;
          padding:8px;
          border:1px solid #CCCCCC;
          border-radius:5px;
          color: #fff;
          background-color: #5cb85c;
          font-weight: bold;
          & i{
            cursor:pointer;
          }
        }
      }
    }
    & ul{
      z-index: 1000;
      position: absolute;
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      & .list-group{
        margin-bottom: 20px;
        padding-left: 0;
        &-item{
          cursor:pointer;
          position: relative;
          display: block;
          padding: 10px 15px;
          margin-bottom: -1px;
          background-color: #fff;
          border-left: 1px solid #d3e0e9;
          border-right: 1px solid #d3e0e9;
          &:first-child{
            border-top: 1px solid #d3e0e9;
            /*
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            */
          }
          &:last-child{
            border-bottom: 1px solid #d3e0e9;
            /*
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            */
          }
          & i{
              margin-left:5px;
              margin-right:5px;
              font-weight: bold;
              cursor:pointer;
          }
          &:hover{
            background-color: #CCCCCC;
          }
          &.current-cursor-item{
            background-color: #CCCCCC;
          }
          &.more-data-message{
            cursor:default;
            font-size: 11px;
            vertical-align: middle;
            padding: 2px 15px;
            color:#A2A2A2;
            &:hover{
              background-color: #FFFFFF;
            }
          }
        }
      }
    }
  }
</style>
