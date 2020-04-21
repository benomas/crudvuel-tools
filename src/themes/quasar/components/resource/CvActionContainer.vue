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
    <div :class="{...cpDinInsActionContentClasses,...{'shadow-2 q-pa-md':cpDinInsShowActionDefaultContentClasses && cGtsm}}" :style="cStyle">
      <slot name="cv-content-slot"
      >
      </slot>
      <div v-if="cpDinInsAddBottonMargin && cLtmd" class="w-100 h-60px"></div>
      <div v-if="!cpDinInsAddBottonMargin && cLtmd" class="w-100 h-20px"></div>
    </div>
    <div class="mt-50px">
      <slot name="cv-buttons-slot"
      >
        <span v-cv-empty-slot="'cvButtonsSlot'"></span>
      </slot>
    </div>
  </div>
</template>
<script>
import {QPage} from 'quasar'
import CvActionContainer    from 'crudvuel-tools/src/components/resource/CvActionContainer'
import CvComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvSpinner            from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSpinner'
import cvEmptySlot          from 'crudvuel-tools/src/directives/cvEmptySlot'
import CvSeparator          from 'crudvuel-tools/src/themes/quasar/components/others/CvSeparator'
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
    CvSpinner,
    CvSeparator,
    QPage
  },

  directives : {
    cvEmptySlot: cvEmptySlot
  },

  computed: {
    cOffset () {
      return (this.cGtsm ? 115 : 0)*1 + (this.cpDinInsAddBottonMargin ? 80 : 35)*1
    },
    cStyle () {
      let calHeight = this.$q.screen.height === 0
        ? `calc(100vh - ${this.cOffset}px)`
        : (this.$q.screen.height - this.cOffset) + 'px'
      if (!this.cpDinInsDisableResponsiveBehavior)
        return {
          minHeight: calHeight
        }
      return {}
    }
  }
}
</script>
