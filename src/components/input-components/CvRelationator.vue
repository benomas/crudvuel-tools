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
            :key="mDinamicIndex(row)"
            @click="removeRelated(rowKey,row)"
        >
          <i class="fa fa-caret-right f-right" v-if="!cDisableFields"></i>
          {{row[cLabelProperty]}}
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
            :key="mDinamicIndex(row)"
            @click="addRelated(rowKey,row)"
        >
          <i class="fa fa-caret-left f-left" v-if="!cDisableFields"></i>
          {{row[cLabelProperty]}}
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
        return this.cvLabelProperty || 'name';
    },
    cKeyProperty:function(){
        return this.cvKeyProperty || 'id';
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
          if(sourceRow[this.cKeyProperty]===relatedRow[this.cKeyProperty]){
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
    this.relatedChanged();
  },
  methods:{
    addRelated:function(index,row){
      if(this.cDisableFields)
        return false;
      this.related.push(row);
      this.related.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.$set(
        this,
        'source',
        this.source.filter(currentRow =>
          this.mDinamicIndex(currentRow) !== this.mDinamicIndex(row)
        )
      )
      this.source.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.relatedChanged()
    },
    removeRelated:function(index,row){
      if(this.cDisableFields)
        return false;
      this.source.push(row)
      this.source.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.$set(
        this,
        'related',
        this.related.filter(currentRow =>
          this.mDinamicIndex(currentRow) !== this.mDinamicIndex(row)
        )
      )
      this.related.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.relatedChanged()
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
      this.$set(this,'filterSource',this.processList(this.cLocalSource,this.sourceSearch))
    },
    relatedSimpleFilterFind: function (search) {
      this.$set(this,'relatedSearch',search)
      this.relatedReFilter()
    },
    relatedReFilter: function () {
      this.$set(this,'filterRelated',this.processList(this.cLocalRelated,this.relatedSearch))
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
    },
    mDinamicIndex: function (row = null,index = null) {
      if (index)
        return index
      if (row != null && row[this.cKeyProperty] != null)
        return row[this.cKeyProperty]
      return null
    }
  }
}
</script>
