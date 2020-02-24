<template>
  <cv-simple-filter
    v-bind="mCustomBindins('cv-simple-filter',cCvSimpleFilterLocalBindin)"
    v-on="mCustomOns('cv-simple-filter')"
  >
  </cv-simple-filter>
</template>
<script>
import CvSimpleFieldFilter  from 'crudvuel-tools/src/components/grid-components/CvSimpleFieldFilter'
import CvComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvSimpleFilter       from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import VueMirroring         from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('SimpleFieldFilter').enableRoot()

export default {
  mixins: [
    CvSimpleFieldFilter,
    CvComponentExtraSet,
    vueMirroring.assimilate(
      {CvSimpleFilter}
    )
  ],

  components: {
    CvSimpleFilter
  },

  methods: {
    emStaInsfSimpleFieldFilterSimpleFilterSearchProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mSetSimpleFieldFilterSimpleFilterSearch(emitted)
        resolve({'field': this.cpDinInsField,search: emitted})
      })
    }
  }
}
</script>
