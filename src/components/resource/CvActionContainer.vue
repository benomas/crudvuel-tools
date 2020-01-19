<template>
  <div class="row action-container fix-container">
    <transition name="component-fade" mode="out-in" v-if="cpShowOwnSpinner">
      <cv-spinner v-if="!cReady && cdIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <slot name="cv-title-slot" class="col-lg-12 action-label" v-if="cpShowHeader">
      <label>
        <h5 class="custom-h">
          {{cpAction.label}}
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
import CvTag          from '../CvTag'
import CvSpinner      from '../grid-components/CvSpinner'
import CvComponentSet from '../sets/CvComponentSet'
import VueMirroring   from 'crudvuel-tools/src/VueMirroring'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    CvComponentSet,
    vueMirroring.fixProperties({
      'showOwnSpinner' : {init:true,mode:'P|CP'},
      'excludeActions' : {init:[],mode:'P|C'},
      'showHeader'     : {init:true,mode:'P|CP'},
      'action'         : {init:true,mode:'P|CP'}
    }),
  ],
  components : {
    CvSpinner,
    CvTag
  },
  computed:{
    cGetted:function(){
      return this.cRows || !this.cpAction.getService  || this.cHasRowKeyValue || false
    },
    cBackLabel: function () {
      if (this.cpAction)
        return this.cpAction.backLabel || null
      return 'Cancelar'
    },
    cNextLabel: function () {
      if (this.cpAction)
        return this.cpAction.nextLabel || null
      return 'Guardar'
    }
  },
  mounted: function () {
    this.isMounted = true
  }
}
</script>
