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
import CvCustomExtender from 'src/crudvuel/customs/components/resource/CvActionContainer.vue'
import CvSpinner        from '../grid-components/CvSpinner'
import CvTag            from '../CvTag'
export default {
  extends : CvCustomExtender,
  props   : [
    'cvActionClasses',
    'cvActionContentClasses'
  ],
  computed: {
    cActionContentClasses: function () {
      return this.cvActionContentClasses || ('row action-content shadow-1 w-100 ' + (this.cLtmd ? 'q-pa-xs' : 'q-pa-md'))
    },
    cActionClasses: function () {
      return this.cvActionClasses || 'row action-container fix-container q-pa-lg txt-secondary'
    }
  },
  components: {
    CvSpinner,CvTag
  }
}
</script>
