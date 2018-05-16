<template>
  <div
    class="row action-container fix-container"
  >
    <transition name="component-fade" mode="out-in" v-if="cShowOwnSpinner">
      <cv-spinner v-if="!cReady && cIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <slot name="cv-title-slot" class="col-lg-12 action-label" v-if="cShowHeader">
      <label>
        <h5 class="custom-h">
          {{action.label}}
        </h5>
      </label>
    </slot>
    <div class="row action-content">
      <slot name="cv-content-slot"
      >
      </slot>
    </div>
    <slot name="cv-test"
    >
    </slot>
  </div>
</template>
<script>
  import CvCore    from './CvCore'
  import CvTag     from '../CvTag'
  import CvSpinner from '../grid-components/CvSpinner'
  export default{
    extends    : CvCore,
    components : {
      CvSpinner,
      CvTag
    },
    data (){
      return {
        resource                    : null,
        action                      : null,
        isMounted                   : false
      }
    },
    methods:{
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
      cGetted:function(){
        return this.cRows || !this.cAction.getService  || this.cHasRowKeyValue || false;
      },
      cShowHeader:function(){
        if(typeof this.cvShowHeader!=='undefined')
          return this.cvShowHeader
        return true
      },
      cIsMounted: function () {
        return this.isMounted || false
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
      "cvShowHeader"
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
