<template>
  <div class="row action-container fix-container">
    <transition name="component-fade" mode="out-in" v-if="cShowOwnSpinner">
      <cv-spinner v-if="!cReady && cdIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <slot name="cv-title-slot" class="col-lg-12 action-label" v-if="cShowHeader">
      <label>
        <h5 class="custom-h">
          {{cAction.label}}
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
import CvTag     from '../CvTag'
import CvSpinner from '../grid-components/CvSpinner'
import VueMirroring from '../../VueMirroring'
import CvBaseComponent from '../CvBaseComponent'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    CvBaseComponent,
    vueMirroring.fixProperties({
      'showOwnSpinner' : {init:true,mode:'P|C'},
      'excludeActions' : {init:[],mode:'P|C'},
      'showHeader'     : {init:true,mode:'P|C'}
    }),
  ],
  components : {
    CvSpinner,
    CvTag
  },
  computed:{
    cGetted:function(){
      return this.cRows || !this.cAction.getService  || this.cHasRowKeyValue || false
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
  }
}
</script>
