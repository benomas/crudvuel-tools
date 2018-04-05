<template>
  <div class="row cv-relator-container">
    <div
      class="col-sm-6 col-xs-12 related-items"
    >
      <div class="t-center">{{relatedLabel}}</div>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in related"
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
      <div class="t-center">{{sourceLabel}}</div>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in source"
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
  export default {
    data:function(){
      return {
        source        :[],
        related       :[],
        labelProperty :"name",
        keyProperty   :"id",
        sourceLabel   :"Disponibles",
        relatedLabel  :"Asignados",
      }
    },
    props:[
      "cvSource",
      "cvRelated",
      "cvLabelProperty",
      "cvRelatedIdentifier",
      "cvDisableFields",
    ],
    computed:{
      cSource:function(){
          return this.cvSource;
      },
      cRelated:function(){
          return this.cvRelated;
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
        this.source=this.cSource;

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
        this.relatedChanged();
      },
      removeRelated:function(index,row){
        if(this.cDisableFields)
          return false;
        this.source.push(row);
        this.related.splice(index,1);
        this.relatedChanged();
      },
      relatedChanged:function(){
        this.$emit(
          'related-changed',
          {
            cRelatedIdentifier:this.cRelatedIdentifier,
            related:this.related,
            source:this.source,
          }
        );
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cv-relator-container{
    border-bottom : 1px solid #CCCCCC;
    margin-top:20px;
    & ul{
      border:1px solid #CCCCCC;
      background-color:#EEEEEE;
      min-height: 100px;
      max-height: 250px;
      overflow-y: auto;
      border-radius: 5px;
      padding-inline-start: 0;
      list-style-type  : none;
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
        }
      }
      & i{
          margin-left  : 5px;
          margin-right : 5px;
          font-weight  : bold;
          cursor       : pointer;
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
