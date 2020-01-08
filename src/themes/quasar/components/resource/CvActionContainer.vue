<template>
  <div :class="cActionClasses">
    <transition name="component-fade" mode="out-in" v-if="cShowOwnSpinner">
      <cv-spinner v-if="!cReady && cIsMounted" >
      </cv-spinner>
    </transition>
    <slot name="cv-title-slot" class="col-lg-12 action-label q-pb-md" v-if="cShowHeader">
      <div class="col-xs-10 col-sm-9 col-md-8 q-pb-md">
        <label>
          <span class="q-headline txt-secondary">
            {{action.label}}
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
import CvCustomExtender from 'src/crudvuel/customs/components/resource/CvActionContainer'
import CvSpinner        from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvSpinner'
import CvTag            from '../CvTag'
export default {
  extends    : CvCustomExtender,
  components : {
    CvSpinner,CvTag
  },
  props: [
    'cvActionClasses',
    'cvActionContentClasses'
  ],
  computed: {
    cActionContentClasses: function () {
      return this.cvActionContentClasses || ('row action-content w-100 ' + (this.cLtsm ? '' : 'q-pa-md shadow-1'))
    },
    cActionClasses: function () {
      return this.cvActionClasses || ('row action-container fix-container ' + (this.cLtsm ? 'q-pa-md' : 'q-pa-lg'))
    }
  }
}
</script>
