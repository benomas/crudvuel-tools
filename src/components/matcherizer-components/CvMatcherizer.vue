<template>
  <div class="cv-matcherizer-container">
    <div
      class="list-items"
    >
      <div
        ref="filterReference"
      >
        <cv-simple-filters
          v-bind="mDefMatcherizerProps()"
          :cv-search-message="cSourceMessage"
          :cv-active-filter="cShowingSelected"
          :cv-disable-fields="cDisableFields"
          @cv-search-key-up="keyed"
          @cv-event-filter-go-to-find="prepareToFindSource"
          @cv-search-focused="focused"
          @cv-search-blured="blured"
          @cv-search-cleared="resetCurrent"
        >
        </cv-simple-filters>
      </div>
      <ul
        v-if="cShowList && !cLoading"
        @mouseover="listIn"
        @mouseleave="listOut"
        class="list-group"
        :style="{'width':cContainerWidth}"
      >
        <li
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
import CvParametrizer           from '../../CvParametrizer'
import CvSimpleFilters          from '../grid-components/CvSimpleFilters'
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
export default {
  mixins     : [CvLocalSimpleFilterTrait],
  components : {
    CvSimpleFilters
  },
  data () {
    return {
      sourceParametrizer : new CvParametrizer(),
      sourceCount        : 0,
      sourcePageCount    : null,
      searchObject      : '',
      sourceData         : [],
      localData          : [],
      currentValue       : null,
      currentLabel       : null,
      preselected        : false,
      focus              : true,
      bluring            : false,
      listOver           : false,
      listWidth          :'200px',
      loading            : false,
      disableList        : false,
      listOfItems        : null,
      absolueRemoteData  : false,
      currentItem        : null,
      itemAdded          : false
    }
  },
  props:[
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
      return new Promise ((resolve, reject) => {
        this.loaded()
        this.sourceData      = response.data.data
        this.sourceCount     = response.data.count
        this.sourcePageCount = response.data.data.length
        this.processList().then(() => {
          this.$emit('success-source-mutation', this.$data)
          resolve()
        }).catch(reject)
      })
    },
    emitErrorMutationSource:function(response){
      return new Promise ((resolve, reject) => {
        this.loaded()
        this.processList().then(() => {
          this.$emit('error-source-mutation', this.$data)
          resolve()
        }).catch(reject)
      })
    },
    emitInitialMutationSource:function(){
      this.loaded()
      this.$emit('initial-source-mutation', this.$data)
    },
    refreshPaginateSource:function(event){
      return new Promise ((resolve, reject) => {
        this.sourceParametrizer.setPage(event.page)
        this.sourceParametrizer.setLimit(event.limit)
        this.refreshSource().then(resolve).catch(reject)
      })
    },
    prepareToFindSource:function(search){
      return new Promise ((resolve, reject) => {
        this.searchObject = search
        if (this.itemAdded) {
          this.$set(this,'itemAdded',false)
          resolve()
        }else{
          if (!this.requireNewRemoteSearch())
            this.processList().then(() => {
              this.$set(this,'disableList',false)
              resolve()
            }).catch(reject)
          else{
            this.saveSearchState()
            this.$set(this,'disableList',false)
            this.$nextTick().then(() => {
              this.toLoad()
              this.refreshSource().then(resolve).catch(reject)
            }).catch(reject)
          }
        }
      })
    },
    refreshSource:function(){
      return new Promise ((resolve, reject) => {
        this.cSourceService(null,null,this.sourceParametrizer.getSerialized())
          .then(response => this.emitSuccessMutationSource(response).then(resolve).catch(reject))
          .catch(response => this.emitErrorMutationSource(response).then(resolve).catch(reject))
      })
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
      return new Promise ((resolve, reject) => {
        this.$set(this,'disableList',true)
        this.$set(this,'itemAdded',true)
        this.setCurrent(this.cListOfItems,row).then(() => this.listOut().then(resolve).catch(reject)).catch(reject)
      })
    },
    setSearch: function (label = null, reactive = true) {
      return new Promise ((resolve, reject) => {
        if(this.cSimpleFilterRef){
          if (label===null)
            label = this.currentLabel
          this.cSimpleFilterRef.mSimpleFilterInyectSearch(label,reactive).then(() => {
            resolve()
          })
        }
        else
          resolve()
      })
    },
    setCurrent:function(rows,row){
      return new Promise ((resolve, reject) => {
        if(this.cDisableFields)
          resolve()
        else{
          this.currentLabel = this.mLabelCallBack(rows,row)
          this.currentValue = this.mValueCallBack(rows,row)
          this.refresh().then(() => {
            this.focus = false
            if(this.cParentRef)
              this.cParentRef.vueSetter({cvColumnMap:this.cColumnMap,row,destination:this.cDestination})
            this.$emit('cv-single-selected', {cvColumnMap:this.cColumnMap,row,destination:this.cDestination})
            resolve()
          }).catch(reject)
        }
      })
    },
    resetCurrent:function(clearBuffer = false){
      return new Promise ((resolve, reject) => {
        if (this.clearBuffer)
          this.sourcePageCount = true
        this.preselected  = false
        this.currentLabel = ''
        this.currentValue = null
        this.listOut().then(
          () => this.refresh().then(() => {
            if(this.cParentRef)
              this.cParentRef.vueSetter({cvColumnMap:this.cColumnMap,row:null,destination:this.cDestination})
            this.$emit('cv-reset', {cvColumnMap:this.cColumnMap,row:null,destination:this.cDestination})
          }).catch(reject)
        ).catch(reject)
      })
    },
    refresh:function(){
      return new Promise (
        (resolve, reject) => this.setSearch().then(
          () => this.prepareToFindSource(this.currentLabel).then(resolve).catch(reject)).catch(reject)
        )
    },
    focused: function() {
      return new Promise ((resolve, reject) => {
        if (this.cDisableFields)
          resolve()
        else {
          this.$set(this,'currentItem',null)
          this.$set(this,'focus',true)
          if (this.cSimpleFilterRef) {
            this.setSearch(this.cSearchObject).then(() => {
              this.fixListWidth()
              this.mSearchFocused()
              resolve()
            }).catch(reject)
          }
          else {
            this.fixListWidth()
            this.mSearchFocused()
            resolve()
          }
        }
      })
    },
    blured:function(){
      return new Promise ((resolve, reject) => {
        this.$set(this,'focus',false)
        if(this.currentLabel && this.currentLabel !== '')
          this.setSearch(this.cSearchObject)
        this.mSearchBlured()
        this.$nextTick().then(() => {
          this.listOut()
        })
      })
    },
    keyed:function(key){
      if (typeof key === 'undefined' || !key || typeof key.keyCode === 'undefined')
        return false
      this.preselected = false
      this.mSearchKeyUp(key)
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
            this.cSimpleFilterRef.mSearchClear()
          break
        default: this.currentItem = null
          break
      }
    },
    listIn:function(){
      return new Promise ((resolve, reject) => {
        this.$set(this,'listOver',true)
        this.$emit('cv-list-out', this.cSearchObject)
        resolve()
      })
    },
    listOut:function(){
      return new Promise ((resolve, reject) => {
        setTimeout(()=>{
          this.$emit('cv-list-out', this.cSearchObject)
          this.$set(this,'listOver',false)
          resolve()
        }, 200)
      })
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
      this.sourceParametrizer.setSearchObject(this.cSearchObject)
    },
    processList: function () {
      return new Promise ((resolve, reject) => {
        var listOfItems = []
        let data = this.cSourceListOfItems
        if (data != null)
          for (let i = 0; i < data.length; i++){
            if(listOfItems.length === this.cListOfItemsLimit)
              break

            let currentItemLabel = this.mLabelCallBack(data,data[i])

            if(this.mySubString(currentItemLabel,this.searchObject))
              listOfItems.push(data[i])
          }
        this.$set(this,'listOfItems',listOfItems)
        this.$nextTick().then(() => {
          resolve(listOfItems)
        })
      })
    },
    showPatter:function(label,isCurrent){
      let located = this.myReplace(label,this.searchObject,'<span class="matcherizer-item">$1</span>')
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
      let lastSearch = this.sourceParametrizer.getSearchObject()
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

      if(lastSearch===this.searchObject)
        return false

      //When the page is full, that means that there is more remote data compatible with the current searsh, other wise, no is necesary to make another remote data call
      if(this.sourcePageCount === this.cLimit)
        return true

      if(this.mySubString(this.searchObject,lastSearch))
        return false

      if(this.absolueRemoteData)
        return false

      return true
    },
    mClearData: function () {
      this.$set(this,'sourceCount', 0)
      this.$set(this,'sourcePageCount', null)
      this.$set(this,'searchObject', '')
      this.$set(this,'sourceData', [])
      this.$set(this,'localData', [])
      this.$set(this,'currentValue', null)
      this.$set(this,'currentLabel', null)
      this.$set(this,'listOfItems', null)
      this.$set(this,'absolueRemoteData', false)
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
    cSearchObject:function(){
      return this.searchObject || ''
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
    cColumnMap:function(){
      return this.cvSelectQuery || false
    },
    cShowList:function(){
      if (this.cDisableFields)
        return false
      if (this.cDisableList)
        return false
      return this.cFocus || this.cListOver
    },
    cContainerWidth:function(){
      return this.listWidth;
    },
    cShowingSelected:function(){
      return (this.cCurrentLabel && this.cCurrentLabel!=='' && this.cSearchObject === this.cCurrentLabel) || this.cPreselected
    },
    cLoading:function(){
      return this.cvLoading || this.loading || false
    },
    cDisableList:function(){
      return this.disableList || false
    },
    cListOfItemsLimit:function(){
      let cvListOfItemsLimit = this.cvListOfItemsLimit || 10
      return cvListOfItemsLimit > this.cLimit? this.cLimit:cvListOfItemsLimit
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
    cFocus:function(){
      return this.focus
    },
    cListOver:function(){
      return this.listOver
    },
    cPreselected: function () {
      return this.preselected
    }
  },
  mounted:function(){
    this.currenValue   = this.cvCurrentValue
    this.currentLabel  = this.cvCurrentLabel
    this.searchObject = this.currentLabel
    if (this.currentLabel && this.currentLabel !== ''){
      this.preselected =  true
      this.setSearch(null,false)
    }
  },
  created:function(){
    this.saveSearchState()
  }
}
</script>
