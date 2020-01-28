<template>
  <div :class="cActionClasses">
    <transition name="component-fade" mode="out-in" v-if="cpDinGenShowOwnSpinner">
      <cv-spinner v-if="!cReady && cdIsMounted" >
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
    <div :class="cActionContentClasses">
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
import CvActionContainer  from '../../../../components/resource/CvActionContainer'
import CvSpinner          from '../../components/grid-components/CvSpinner'
import CvTag              from '../CvTag'
export default {
  extends    : CvActionContainer,
  components : {
    CvSpinner,CvTag
  },
  props: [
    'cvActionClasses',
    'cvActionContentClasses'
  ],
  computed: {
    cActionContentClasses: function () {
      return this.cvActionContentClasses || ('row action-content w-100 ' + (this.cLtsm ? '' : 'rounded-borders q-pa-md shadow-2'))
    },
    cActionClasses: function () {
      return this.cvActionClasses || ('row action-container fix-container ' + (this.cLtsm ? 'q-pa-md' : 'q-pa-lg'))
    }
  }
}
</script>
