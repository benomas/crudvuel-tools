<template>
  <div class="row cv-relator-container">
    <div
      class="col-sm-6 col-xs-12 related-items"
    >
      <div class="t-center">
        {{relatedLabel}}:
        <cv-simple-filters
          v-if="!cDisableFields"
          v-bind="mDefMatcherizerProps('relatedSimpleFilterRef')"
          @cv-simple-filter-go-to-find="relatedSimpleFilterFind"
          @cv-simple-search-key-up="((key)=>{keyed(key,'relatedSimpleFilterRef')})"
          class="q-pl-sm q-pr-xl"
        >
        </cv-simple-filters>
      </div>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in cFilteredRelated"
            v-on:click="removeRelated(rowKey,row)"
        >
          <i class="fa fa-caret-right f-right" v-if="!cDisableFields"></i>
          {{row[labelProperty]}}
        </li>
      </ul>
    </div>
    <div
      class="col-sm-6 col-xs-12 source-items"
    >
      <div class="t-center">
        {{sourceLabel}}
        <cv-simple-filters
          v-if="!cDisableFields"
          v-bind="mDefMatcherizerProps('sourceSimpleFilterRef')"
          @cv-simple-search-key-up="((key)=>{keyed(key,'sourceSimpleFilterRef')})"
          @cv-simple-filter-go-to-find="sourceSimpleFilterFind"
          class="q-pl-sm q-pr-xl"
        >
        </cv-simple-filters>
      </div>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in cFilteredSource"
            v-on:click="addRelated(rowKey,row)"
        >
          <i class="fa fa-caret-left f-left" v-if="!cDisableFields"></i>
          {{row[labelProperty]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CvSimpleFilters          from '../grid-components/CvSimpleFilters'
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
export default {
  mixins     : [CvLocalSimpleFilterTrait],
  components : {
    CvSimpleFilters
  },
  data:function(){
    return {
      source        :[],
      related       :[],
      labelProperty :'name',
      keyProperty   :'id',
      sourceLabel   :'Disponibles',
      relatedLabel  :'Asignados',
      relatedSearch :'',
      sourceSearch  :'',
      filterSource  :[],
      filterRelated :[],
    }
  },
  props:[
    'cvSource',
    'cvRelated',
    'cvLabelProperty',
    'cvRelatedIdentifier',
    'cvDisableFields',
  ],
  computed:{
    cSource:function(){
        return this.cvSource;
    },
    cRelated:function(){
        return this.cvRelated;
    },
    cLocalSource:function(){
        return this.source;
    },
    cLocalRelated:function(){
        return this.related;
    },
    cLabelProperty:function(){
        return this.cvLabelProperty;
    },
    cRelatedIdentifier:function(){
        return this.cvRelatedIdentifier;
    },
    cDisableFields:function(){
      return this.cvDisableFields || false;
    },
    cSourceSearch: function () {
      this.sourceSearch
    },
    cRelatedSearch: function () {
      this.relatedSearch
    },
    cFilteredSource:function(){
      return this.filterSource
    },
    cFilteredRelated:function(){
      return this.filterRelated
    },
    cSimpleSearchKeyInterruption: function () {
      return this.cvSimpleSearchKeyInterruption || 250
    }
  },
  mounted:function(){
    if(this.cRelated && this.cRelated.length>0)
      for(let i=0;i<this.cSource.length; i++){
        let sourceRow = this.cSource[i];
        let skip = false;
        for(let j=0;j<this.cRelated.length; j++){
          let relatedRow = this.cRelated[j];
          if(sourceRow[this.keyProperty]===relatedRow[this.keyProperty]){
            skip=true;
            continue;
          }
        }
        if(!skip)
          this.source.push(sourceRow);
    }
    else
      this.$set(this,'source',this.cSource)

    this.related=this.cRelated;
    this.labelProperty=this.cLabelProperty;
    this.relatedChanged();
  },
  methods:{
    addRelated:function(index,row){
      if(this.cDisableFields)
        return false;
      this.related.push(row);
      this.source.splice(index,1);
      this.related.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.source.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.$nextTick().then(this.relatedChanged)
    },
    removeRelated:function(index,row){
      if(this.cDisableFields)
        return false;
      this.source.push(row);
      this.related.splice(index,1)
      this.related.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.source.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.$nextTick().then(this.relatedChanged)
    },
    relatedChanged:function(){
      this.sourceReFilter()
      this.relatedReFilter()
      this.$emit(
        'related-changed',
        {
          cRelatedIdentifier:this.cRelatedIdentifier,
          related:this.cLocalRelated,
          source:this.cLocalSource,
        }
      );
    },
    sourceSimpleFilterFind: function (search) {
      this.$set(this,'sourceSearch',search)
      this.sourceReFilter()
    },
    sourceReFilter: function () {
      this.$nextTick().then(() => {
        this.$set(this,'filterSource',this.processList(this.cLocalSource,this.sourceSearch))
      })
    },
    relatedSimpleFilterFind: function (search) {
      this.$set(this,'relatedSearch',search)
      this.relatedReFilter()
    },
    relatedReFilter: function () {
      this.$nextTick().then(() => {
        this.$set(this,'filterRelated',this.processList(this.cLocalRelated,this.relatedSearch))
      })
    },
    processList: function (items = null,search = '') {
      let filterItems = []
      if(items == null)
        return items
      for (let i = 0; i < items.length; i++){
        let currentItemLabel = items[i][this.cLabelProperty]
        if(this.mySubString(currentItemLabel,search))
          filterItems.push(items[i])
      }
      return filterItems
    },
    keyed:function(key,ref){
      if (typeof key === 'undefined' || !key || typeof key.keyCode === 'undefined')
        return false
      this.mSimpleSearchKeyUp(key)
      switch(key.keyCode){
        case 27:
          if(this.$refs[ref])
            this.$refs[ref].mSimpleSearchClear()
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cv-relator-container
    border-bottom : 1px solid #CCCCCC
    margin-top:20px
    & ul
      border:1px solid #CCCCCC
      background-color:#EEEEEE
      min-height: 100px
      max-height: 250px
      overflow-y: auto
      border-radius: 5px
      padding-inline-start: 0
      list-style-type  : none
      & .list-group
        margin-bottom: 20px
        padding-left: 0
        &-item
          position: relative
          display: block
          padding: 10px 15px
          margin-bottom: -1px
          background-color: #fff
          border: 1px solid #d3e0e9
          &:first-child
            border-top-right-radius: 4px
            border-top-left-radius: 4px
          &:last-child
            border-bottom-right-radius: 4px
            border-bottom-left-radius: 4px
      & i
          margin-left  : 5px
          margin-right : 5px
          font-weight  : bold
          cursor       : pointer
    & .related-items
      & i:hover
          color:#d9534f
    & .source-items
        padding: 15px
        & i:hover
            color:#20895e
</style>
