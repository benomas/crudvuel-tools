<template>
  <cv-simple-filter
    v-bind="mCustomBindins('cv-simple-filter')"
    v-on="mCustomOns('cv-simple-filter')"
  >
  </cv-simple-filter>
</template>
<script>
import CvSimpleFilter       from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import CvComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import VueMirroring         from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('SimpleFieldFilter').enableRoot()

export default {
  mixins: [
    CvComponentExtraSet,
    vueMirroring.fixProperties({
      '[P]dinInsField'   : 'id',
      '[P|D]dinInsLabel' : 'Busqueda'
    }),
    vueMirroring.assimilate(
      {CvSimpleFilter}
    )
  ],

  computed: {
    cdSimpleFieldFilterSimpleFilterLabel () {
      if (this.cvStaInsfSimpleFieldFilterSimpleFilterLabel == null)
        return ''
      return this.cvStaInsfSimpleFieldFilterSimpleFilterLabel
    }
  },

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
