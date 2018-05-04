<template>
  <div
    class="row action-container"
  >
    <transition name="component-fade" mode="out-in" v-if="cShowOwnSpinner">
      <cv-spinner v-if="!cReady && cIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <slot name="cv-title-slot" class="col-lg-12 action-label" v-if="cShowHeader">
      <label>
        <h5>
          {{action.label}}
        </h5>
      </label>
    </slot>
    <div class="row action-content">
      <slot name="cv-content-slot"
      >
      </slot>
    </div>
  </div>
</template>
<script>
  import cvVueSetter from '../../cvVueSetter'
  import CvSpinner   from '../grid-components/CvSpinner'
  export default{
    components: {
      CvSpinner
    },
    data (){
      return {
        resource                    : null,
        action                      : null,
        isMounted                   : false
      }
    },
    methods:{
      vueSetter(source){
        if(
            typeof source==="undefined" ||
            typeof source.row==="undefined" ||
            typeof source.cvColumnMap==="undefined"
        )
          return false;
        let destination = source.destination || 'row'
        let mapKeys = Object.keys(source.cvColumnMap)
        for (let i=0; i<mapKeys.length; i++) {
          if(source.row && typeof source.row[mapKeys[i]]!=="undefined")
            this.$set(this[destination], source.cvColumnMap[mapKeys[i]], source.row[mapKeys[i]])
          else
            this.$set(this[destination], source.cvColumnMap[mapKeys[i]], null)
        }
      },
      resorceAction:function(action){
        return (this.resource && this.resource.actions && this.resource.actions[action])?this.resource.actions[action]:null;
      },
      actionType:function(action){
        let resourceAction =  this.resorceAction(action);
        return resourceAction.type || null;
      },
      actionPath:function(action,row){
        let resourceAction =  this.resorceAction(action);
        if(resourceAction)
          return resourceAction.getFixedPath(row)
        return null;
      },
    },
    computed:{
      cAction:function(){
        return this.cvAction || null;
      },
      cResource:function(){
        return (this.cAction && this.cAction.resource)? this.cAction.resource:null;
      },
      cExcludeActions:function(){
        return this.cvExcludeActions || [];
      },
      cDisableFields:function(){
        return this.cvDisableFields || this.cAction.disableFields || false;
      },
      cGetted:function(){
        return this.cRows || !this.cAction.getService  || this.cHasRowKeyValue || false;
      },
      cShowHeader:function(){
        if(typeof this.cvShowHeader!=='undefined')
          return this.cvShowHeader
        return true
      },
      cReady : function () {
        return this.cvReady || false
      },
      cIsMounted: function () {
        return this.isMounted || false
      },
      cSelfRef :  function () {
        return this
      },
      cShowOwnSpinner : function() {
        if (typeof this.cvShowOwnSpinner !== 'undefined')
          return this.cvShowOwnSpinner
        return true
      },
      cBackLabel: function () {
        if (this.cAction)
          return this.cAction.backLabel || null
        return 'Cancelar'
      },
      cNextLabel: function () {
        if (this.cAction)
          return this.cAction.nextLabel || null
        return 'Guardar'
      }
    },
    props:[
      "cvAction",
      "cvExcludeActions",
      "cvDisableFields",
      "cvReady",
      "cvShowHeader",
      "cvShowOwnSpinner"
    ],
    created:function(){
      this.resource    = this.cResource;
      this.action      = this.cAction;
    },
    mounted: function () {
      this.isMounted = true
    }
  }
</script>
<style lang="scss">
  .action-container{
    padding:20px 30px;
  }
  .action-label{
    width: 100%;
    text-align:center;
    & label{
      font-weight: bold;
    }
    & hr{
        border: 0;
        border-top: 1px solid #CCCCCC;
    }
  }
  .action-content{
    width      : 100%;
    box-shadow : #514d5c1a 0px 1px 15px 1px;
    padding    : 1.5%;
  }
</style>
