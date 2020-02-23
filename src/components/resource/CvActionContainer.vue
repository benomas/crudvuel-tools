<template>
  <div class="row action-container fix-container">
    <transition name="component-fade" mode="out-in" v-if="cpDinGenShowOwnSpinner">
      <cv-spinner v-if="!cReady && cdIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>

    <slot name="cv-title-slot" class="col-lg-12 action-label" v-if="cpDinInsShowHeader">
      <label>
        <h5 class="custom-h">
          {{cpDinGenAction.label}}
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
import VueMirroring   from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring()

export default {
  mixins: [
    CvComponentSet,
    vueMirroring.fixProperties({
      '[P]dinGenShowOwnSpinner'       : true,
      '[P]dinGenExcludeActions'       : [],
      '[P]dinInsShowHeader'           : true,
      '[P]dinGenAction'               : true,
      '[P]dinInsActionClasses'        : '',
      '[P]dinInsActionContentClasses' : ''
    })
  ],

  components : {
    CvSpinner,
    CvTag
  },

  computed:{
    cGetted () {
      return this.cRows || !this.cpDinGenAction.getService  || this.cHasRowKeyValue || false
    },

    cBackLabel () {
      if (this.cpDinGenAction)
        return this.cpDinGenAction.backLabel || null
      return 'Cancelar'
    },

    cNextLabel () {
      if (this.cpDinGenAction)
        return this.cpDinGenAction.nextLabel || null
      return 'Guardar'
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>
