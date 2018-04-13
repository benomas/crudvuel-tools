<template>
  <div class="cv-matcherizer-container">
    <div
      class="list-items"
    >
      <div
        ref="filterReference"
      >
        <cv-simple-filters
          @go-to-find="prepareToFindSource"
          @cv-focused="focused"
          @cv-blured="blured"
          @cv-cleared="resetCurrent"
          :cv-search-label="cSourceLabel"
          :cv-search-message="cSourceMessage"
          ref="cvSimpleFilterRef"
          :cv-active-filter="cShowingSelected"
          :cv-disable-fields="cDisableFields"
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
            class="list-group-item"
            v-for="(row, rowKey) in source"
            v-on:click="addRelated(rowKey,row)"
            :class="{'single-selected':cMode==='single' && mValueCallBack(source,row)===cCurrentValue}"
            :key="mValueCallBack(source,row)"
        >
          <i class="fa fa-plus f-right" v-if="!cDisableFields"></i>
          {{mLabelCallBack(source,row)}}
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
      generalSearch      : "",
      source             : [],
      currentValue       : null,
      currentLabel       : null,
      focus              : false,
      listOver           : false,
      listWidth          :'200px',
      lastSearch         : null,
      loading            : false,
      disableList        : false
    }
  },
  props:[
    "cvMode", //single,multiple
    "cvCurrentValue",
    "cvCurrentLabel",
    "cvSourceLabel",
    "cvSourceMessage",
    "cvLabelCallBack",// anonimousFuntion
    "cvValueCallBack",
    "cvSelectQuery",
    "cvPage",
    "cvByColumn",
    "cvLimit",
    "cvOrderBy",
    "cvAscending",
    "cvFilterQuery",
    "cvSourceService",
    "cvEnableAdd",
    "cvEnableRemove",
    "cvAddCallBack",
    "cvRemoveCallBack",
    "cvDisableFields",
    "cvLoading",
  ],
  methods:{
    //source
    emitSuccessMutationSource:function(response){
      this.loaded()
      this.source      = response.data.data
      this.sourceCount = response.data.count

      if(this.source.length===0 && this.sourceCount>0){
        this.sourceParametrizer.setPage(
          Math.ceil(this.sourceCount/this.sourceParametrizer.getLimit())
        )
        this.refreshSource()
        return false
      }

      this.$emit('success-source-mutation', this.$data)
    },
    emitErrorMutationSource:function(response){
      this.loaded()
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
      this.disableList   = false
      this.sourceParametrizer.setGeneralSearch(this.cGeneralSearch)
      this.sourceParametrizer.setPage(1)
      this.refreshSource()
    },
    refreshSource:function(){
      let newSearch = this.sourceParametrizer.getSerialized()

      if(this.lastSearch && this.lastSearch === newSearch)
          return false

      this.toLoad()
      this.lastSearch=newSearch
      this.cvSourceService(
        this.emitSuccessMutationSource,
        this.emitErrorMutationSource,
        null,
        null,
        this.lastSearch
      )
    },
    //others
    mLabelCallBack:function(rows,row){
      if(typeof this.cvLabelCallBack ==="undefined")
        return row.name || ""

      return typeof this.cvLabelCallBack ==="function"?
        this.cvLabelCallBack(rows,row):this.cvLabelCallBack
    },
    mValueCallBack:function(rows,row){
      if(typeof this.cvValueCallBack ==="undefined")
        return row.id || ""

      return typeof this.cvValueCallBack ==="function"?
        this.cvValueCallBack(rows,row):this.cvValueCallBack
    },
    mAddCallBack:function(rows,row){
      if (typeof this.cvAddCallBack ==="function")
        this.cvAddCallBack(rows,row)
    },
    mRemoveCallBack:function(rows,row){
      if (typeof this.cvRemoveCallBack ==="function")
        this.cvRemoveCallBack(rows,row)
    },
    addRelated:function(rowKey,row){
      if(this.cMode==='single'){
        this.disableList  = true
        this.setCurrent(this.source,row)
      }
      else{

      }
      this.focus=false
      this.listOver=false
    },
    setCurrent:function(rows,row){
      if(this.cDisableFields)
        return false;
      this.currentLabel = this.mLabelCallBack(rows,row)
      this.currentValue = this.mValueCallBack(rows,row)
      this.refresh()
      this.$emit('cv-single-selected', {cvColumnMap:this.cColumnMap,row})
    },
    resetCurrent:function(){
      if(this.cDisableFields)
        return false;
      this.currentLabel = ''
      this.currentValue = null
      this.refresh()
      this.$emit('cv-single-selected', {cvColumnMap:this.cColumnMap,row:null})
    },
    refresh:function(){
      this.$refs.cvSimpleFilterRef.search=this.currentLabel
      this.prepareToFindSource(this.currentLabel)
    },
    focused:function(){
      if(this.cDisableFields)
        return false
      this.focus=true;
      this.$refs.cvSimpleFilterRef.search=this.cGeneralSearch
      this.fixListWidth()
      this.$emit('cv-focused', this.search);
    },
    blured:function(){
      this.focus=false;
      if(this.currentLabel && this.currentLabel !== ''){
        this.$refs.cvSimpleFilterRef.search=this.currentLabel
      }
      this.$emit('cv-blured', this.search);
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
    }
  },
  computed:{
    cMode:function(){
      return this.cvMode || "single"
    },
    cCurrentValue:function(){
      return this.currentValue || this.cvCurrentValue || null
    },
    cCurrentLabel:function(){
      return this.currentLabel || this.cvCurrentLabel || null
    },
    cSelectQuery:function(){
      if(typeof this.cvSelectQuery ==="undefined")
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
      return this.generalSearch || ""
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
      return this.cvSourceLabel || "Disponibles"
    },
    cSourceMessage:function(){
      return this.cvSourceMessage || "Buscar en disponibles"
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
      /*
      if (this.source.length===1 && this.cShowingSelected)
        return false
      */
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
    }
  },
  mounted:function(){
    this.refreshSource()
    if(this.cMode==='single'){
      this.currenValue  =this.cvCurrentValue
      this.currentLabel =this.cvCurrentLabel
      if(this.currentLabel && this.currentLabel !== '')
        this.$refs.cvSimpleFilterRef.search=this.currentLabel
    }
  },
  created:function(){
    this.sourceParametrizer.setPage(this.cPage)
    this.sourceParametrizer.setByColumn(this.cByColumn)
    this.sourceParametrizer.setLimit(this.cLimit)
    this.sourceParametrizer.setOrderBy(this.cOrderBy)
    this.sourceParametrizer.setAscending(this.cAscending)
    this.sourceParametrizer.setFilterQuery(this.cFilterQuery)
    this.sourceParametrizer.setSelectQuery(this.cSelectQuery)
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
          position: relative;
          display: block;
          padding: 10px 15px;
          margin-bottom: -1px;
          background-color: #fff;
          border: 1px solid #d3e0e9;
          &:first-child{
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
          }
          &:last-child{
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          & i{
              margin-left:5px;
              margin-right:5px;
              font-weight: bold;
              cursor:pointer;
          }
        }
      }
    }
  }
</style>
