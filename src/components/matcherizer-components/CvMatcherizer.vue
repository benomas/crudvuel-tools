<template>
  <div>
    {{cGeneralSearch}}
  </div>
</template>
<script>

import CvParametrizer    from '../../CvParametrizer'
export default {
  data () {
    return {
      config:null,
      correctConfig:true,
      cvParametrizer:new CvParametrizer(),
      rows:[],
      elementsCount:0,
    }
  },
  props:[
    "cvMode", //single,multiple
    "cvLabelCallBack",// anonimousFuntion
    "cvValueCallBack",
    "cvSelectQuery",
    "cvPage",
    "cvByColumn",
    "cvLimit",
    "cvOrderBy",
    "cvAscending",
    "cvFilterQuery",
    "cvGeneralSearch",
    "cvService",
    "cvEnableAdd",
    "cvEnableRemove",
    "cvAddCallBack",
    "cvRemoveCallBack",
  ],
  methods:{
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
  },
  computed:{
    cMode:function(){
      return this.cvMode || "single"
    },
    cSelectQuery:function(){
      return this.cvSelectQuery || null
    },
    cPage:function(){
      return this.cvPage || 1
    },
    cByColumn:function(){
      return this.cvByColumn || 'name'
    },
    cLimit:function(){
      return this.cvLimit || null
    },
    cOrderBy:function(){
      return this.cvOrderBy || 'name'
    },
    cAscending:function(){
      return this.cvAscending || 0
    },
    cFilterQuery:function(){
      return this.cvFilterQuery || ["name"]
    },
    cGeneralSearch:function(){
      return this.cvGeneralSearch || ""
    },
    cService:function(){
      return this.cvService || null
    },
    cEnableAdd:function(){
      return this.cvEnableAdd || true
    },
    cEnableRemove:function(){
      return this.cvEnableRemove || true
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
    cSearch:function(){
      return this.cvSearch || ""
    }
  },
  mounted:function(){
    //this.processSlots()
    //this.refresh()
  },
  created:function(){
    this.cvParametrizer.setPage(this.cPage)
    this.cvParametrizer.setByColumn(this.cByColumn)
    this.cvParametrizer.setLimit(this.cLimit)
    this.cvParametrizer.setOrderBy(this.cOrderBy)
    this.cvParametrizer.setAscending(this.cAscending)
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
  .cv-relator-container{
    border-top:1px solid #CCCCCC;
    border-bottom:1px solid #CCCCCC;
    & ul{
      border-top:1px solid #CCCCCC;
      background-color:#EEEEEE;
      min-height: 120px;
      border-radius: 5px;
      & i{
          margin-left:5px;
          margin-right:5px;
          font-weight: bold;
          cursor:pointer;
      }
    }
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
        };
    }
  }
</style>
