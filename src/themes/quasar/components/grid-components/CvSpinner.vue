<template>
  <div class="cv-spinner absolute-center" >
    <div
      class="animation-container"
      v-if="cIsMounted"
    >
      <slot>
        <vue-simple-spinner
          v-bind:line-size="9"
          v-bind:speed="1.0"
          :size="cXs?70:cSm?75:cMd?80:cLg?90:90"
          :message="$tc('loading')"
          :text-fg-color="cBlack"
          :line-fg-color="cTertiary"
          :line-bg-color="cPrimary"
        >
        </vue-simple-spinner>
      </slot>
    </div>
  </div>
</template>
<script>
import CvCustomExtender from 'src/crudvuel/customs/components/grid-components/CvSpinner'
import VueSimpleSpinner from 'vue-simple-spinner'
import { colors }       from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    VueSimpleSpinner
  },
  computed: {
    cPrimary: function () {
      return colors.getBrand('primary')
    },
    cTertiary: function () {
      return colors.getBrand('tertiary')
    },
    cBlack: function () {
      return colors.getBrand('black')
    }
  }
}
</script>
