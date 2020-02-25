<template>
  <div :class="cpDinInsActionClasses" class="q-pa-sm" >
    <transition name="component-fade" mode="out-in" >
      <cv-spinner v-if="!cdReady" >
      </cv-spinner>
    </transition>
    <slot name="cv-title-slot" class="col-lg-12 action-label q-pb-md" v-if="cpDinInsShowHeader">
      <div class="col-xs-10 col-sm-9 col-md-8 q-pb-md">
        <label>
          <span class="q-headline txt-secondary">
            {{cpDinGenAction.label}}
          </span>
        </label>
      </div>
    </slot>
    <div :class="{...cpDinInsActionContentClasses,...{'q-pa-md':cGtmd}}" class="shadow-2 of-y-auto"  :style="{'height':cFixedActionContainerHeight}">
      <slot name="cv-content-slot"
      >
      </slot>
    </div>
    <div >
      <slot name="cv-buttons-slot"
      >
        <span v-cv-empty-slot="'cvButtonsSlot'"></span>
      </slot>
    </div>
  </div>
</template>
<script>
import CvActionContainer    from 'crudvuel-tools/src/components/resource/CvActionContainer'
import CvComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvSpinner            from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSpinner'
import cvEmptySlot          from 'crudvuel-tools/src/directives/cvEmptySlot'
import VueMirroring         from 'crudvuel/mirroring/VueMirroring'

export default {
  mixins: [
    CvActionContainer,
    CvComponentExtraSet,
    new VueMirroring('ActionContainer').assimilate(
      {CvSpinner}
    )
  ],

  data () {
    return {
      cvButtonsSlot:false
    }
  },

  components : {
    CvSpinner
  },

  directives : {
    cvEmptySlot: cvEmptySlot
  },

  computed: {
    cFixedActionContainerHeight () {
      if (this.cvButtonsSlot)
        return this.cActionContentHeightFixNoButtons
      return this.cActionContentHeightFix
    }
  },
}
</script>
