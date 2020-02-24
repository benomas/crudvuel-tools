<template>
  <div >
  <!--
    TODO:no dependencies template need to be defined
  -->
  </div>
</template>
<script>
import CvSimpleFilter from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import CvComponentSet from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring   from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('SimpleFieldFilter').enableRoot()

export default {
  mixins: [
    CvComponentSet,
    vueMirroring.fixProperties({
      '[P]dinInsField'   : 'id',
      '[P|D]dinInsLabel' : 'Busqueda'
    }),
    vueMirroring.assimilate(
      {CvSimpleFilter}
    )
  ],

  computed: {
    cCvSimpleFilterLocalBindin () {
      return {
        'cv-din-ins-label': ''
      }
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
