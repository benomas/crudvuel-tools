<template>
  <div class="cv-spinner absolute-center" >
    <div
      class="animation-container"
    >
      <slot>
        <vue-simple-spinner
          v-bind:line-size="9"
          v-bind:speed="1.0"
          :size="cXs?cpDinInsXsSize:cSm?cpDinInsSmSize:cMd?cpDinInsMdSize:cLg?cpDinInsLgSize:cpDinInsXlSize"
          :message="cLoadingLabel"
          :text-fg-color="cFgColor"
          :line-fg-color="cFgLineColor"
          :line-bg-color="cBgColor"
        >
        </vue-simple-spinner>
      </slot>
    </div>
  </div>
</template>
<script>
import CvSpinner            from 'crudvuel-tools/src/components/grid-components/CvSpinner'
import VueSimpleSpinner     from 'vue-simple-spinner'
import CvComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import VueMirroring         from 'crudvuel-tools/src/mirroring/VueMirroring'
import {colors}             from 'quasar'

export default {
  mixins: [
    CvSpinner,
    CvComponentExtraSet
  ],

  components : {
    VueSimpleSpinner
  },

  computed: {
    cBgColor: function () {
      return colors.getBrand('primary')
    },

    cFgLineColor: function () {
      return colors.getBrand('secondary')
    },

    cFgColor: function () {
      return colors.getBrand('black')
    }
  },

  methods:{
    mComponentInitialize () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.mSetReady()
          resolve()
        })
      })
    }
  }
}
</script>
