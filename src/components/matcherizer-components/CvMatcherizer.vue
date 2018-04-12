<template>
  <div class="cv-matcherizer-container">
    <div
      class="col-sm-6 col-xs-12 source-items"
    >
      <div
        ref="filterReference"
      >
        <cv-simple-filters
          @go-to-find="prepareToFindSource"
          @cv-focused="focused"
          @cv-blured="blured"
          :cv-search-label="cSourceLabel"
          :cv-search-message="cSourceMessage"
          ref="cvSimpleFilterRef"
        >
        </cv-simple-filters>
        <span
          class="single-selected-label"
          v-if="cMode==='single' && cCurrentLabel"
        >
          <i
            v-if="!cDisableFields"
            class="fa fa-window-close"
            v-on:click="resetCurrent()">
          </i>
        </span>
      </div>
      <transition name="component-fade" mode="out-in">
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
          >
            <i class="fa fa-caret-right f-right" v-if="!cDisableFields"></i>
            {{mLabelCallBack(source,row)}}
          </li>
        </ul>
      </transition>
    </div>
    <div
      v-if="cMode==='multiple'"
      class="col-sm-6 col-xs-12 related-items"
    >
      <slot name="cv-related-label">
        <div class="t-center">Asignados</div>
      </slot>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in related"
            v-on:click="removeRelated(rowKey,row)"
        >
          <i class="fa fa-caret-left f-left" v-if="!cDisableFields"></i>
          {{row[labelProperty]}}
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
      sourceParametrizer  : new CvParametrizer(),
      relatedParametrizer : new CvParametrizer(),
      sourceCount         : 0,
      relatedCount        : 0,
      generalSearch       : "",
      source              : [],
      related             : [],
      toAdd               : [],
      toRemove            : [],
      currentValue        : null,
      currentLabel        : null,
      focus               : false,
      listOver            : false,
      listWidth           :'200px',
    }
  },
  props:[
    "cvMode", //single,multiple
    "cvCurrentValue",
    "cvCurrentLabel",
    "cvSourceLabel",
    "cvSourceMessage",
    "cvRelatedLabel",
    "cvRelatedMessage",
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
    "cvRelatedService",
    "cvEnableAdd",
    "cvEnableRemove",
    "cvAddCallBack",
    "cvRemoveCallBack",
    "cvDisableFields",
  ],
  methods:{
    //source
    emitSuccessMutationSource:function(response){
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
      this.$emit('error-source-mutation', this.$data)
    },
    emitInitialMutationSource:function(){
      this.$emit('initial-source-mutation', this.$data)
    },
    refreshPaginateSource:function(event){
      this.sourceParametrizer.setPage(event.page)
      this.sourceParametrizer.setLimit(event.limit)
      this.refreshSource()
    },
    prepareToFindSource:function(search){
      this.sourceParametrizer.setGeneralSearch(search)
      this.sourceParametrizer.setPage(1)
      this.refreshSource()
    },
    refreshSource:function(){
      //console.log(this.sourceParametrizer)
      this.cvSourceService(
        this.emitSuccessMutationSource,
        this.emitErrorMutationSource,
        null,
        null,
        this.sourceParametrizer.getSerialized()
      )
    },
    //related
    emitSuccessMutationRelated:function(response){
      this.related      = response.data.data
      this.relatedCount = response.data.count

      if(this.related.length===0 && this.relatedCount>0){
        this.cvParametrizer.setPage(
          Math.ceil(this.relatedCount/this.cvParametrizer.getLimit())
        )
        this.refreshRelated()
        return false
      }

      this.$emit('success-related-mutation', this.$data)
    },
    emitErrorMutationRelated:function(response){
      this.$emit('error-related-mutation', this.$data)
    },
    emitInitialMutationRelated:function(){
      this.$emit('initial-related-mutation', this.$data)
    },
    refreshPaginateRelated:function(event){
      this.cvParametrizer.setPage(event.page)
      this.cvParametrizer.setLimit(event.limit)
      this.refreshRelated()
    },
    prepareToFindRelated:function(search){
      this.source=[]
      this.cvParametrizer.setGeneralSearch(search)
      this.cvParametrizer.setPage(1)
      this.refreshRelated()
    },
    refreshRelated:function(){
      this.cvSourceService(this.emitSuccessMutation,this.emitErrorMutation,null,null,this.cvParametrizer.getSerialized())
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
      this.$refs.cvSimpleFilterRef.search=this.currentLabel
      this.prepareToFindSource(this.currentLabel)
      this.$emit('cv-single-selected', {cvColumnMap:this.cColumnMap,row})
    },
    resetCurrent:function(){
      if(this.cDisableFields)
        return false;
      this.currentLabel = null
      this.currentValue = null
      this.$refs.cvSimpleFilterRef.search=this.currentLabel
      this.prepareToFindSource('')
      this.$emit('cv-single-selected', {cvColumnMap:this.cColumnMap,row:null})
    },
    focused:function(){
      this.focus=true;
      this.fixListWidth()
      this.$emit('cv-focused', this.search);
    },
    blured:function(){
      this.focus=false;
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
    cRelatedService:function(){
      return this.cvRelatedService || null
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
    cRelatedLabel:function(){
      return this.cvRelatedLabel || "Asignados"
    },
    cSourceMessage:function(){
      return this.cvSourceMessage || "Buscar en disponibles"
    },
    cRelatedMessage:function(){
      return this.cvRelatedMessage || "Buscar en asignados"
    },
    cDisableFields:function(){
      return this.cvDisableFields || false
    },
    cColumnMap:function(){
      return this.cvSelectQuery || false
    },
    cShowList:function(){
      return this.focus || this.listOver
    },
    cContainerWidth:function(){
      return this.listWidth;
    }
  },
  mounted:function(){
    this.refreshSource()
    if(this.cMode==='multiple')
      this.refreshRelated()
    if(this.cMode==='single'){
      this.currenValue  =this.cvCurrentValue
      this.currentLabel =this.cvCurrentLabel
    }
  },
  created:function(){
    if(this.cMode==='multiple'){
      this.relatedParametrizer.setPage(this.cPage)
      this.relatedParametrizer.setByColumn(this.cByColumn)
      this.relatedParametrizer.setLimit(this.cLimit)
      this.relatedParametrizer.setOrderBy(this.cOrderBy)
      this.relatedParametrizer.setAscending(this.cAscending)
      this.relatedParametrizer.setFilterQuery(this.cFilterQuery)
      this.relatedParametrizer.setSelectQuery(this.cSelectQuery)
    }
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
    /* border-bottom:1px solid #CCCCCC; */
    & .related-items{
      padding: 15px;
      & i:hover{
          color:#d9534f;
      };
    }
    & .source-items{
      padding: 15px;
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
      /*
      border:1px solid #CCCCCC;
      background-color:#EEEEEE;
      min-height: 100px;
      max-height: 250px;
      overflow-y: auto;
      border-radius: 5px;
      */
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
