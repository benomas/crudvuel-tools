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
          <i class="glyphicon glyphicon-minus pull-right"></i>
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
          <i class="glyphicon glyphicon-plus pull-left"></i>
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
      "cvRelatedIdentifier"
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
        this.related.push(row);
        this.source.splice(index,1);
        this.relatedChanged();
      },
      removeRelated:function(index,row){
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
<style lang="scss">
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
  }
  .related-items{
    padding: 15px;
    & i:hover{
        color:#d9534f;
    };
  }
  .source-items{
      padding: 15px;
      & i:hover{
          color:#20895e;
      };
  }
</style>
