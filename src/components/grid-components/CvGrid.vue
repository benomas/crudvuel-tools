<template>
  <div>
  <!--
    TODO:no dependencies template need to be defined
  -->
  </div>
</template>
<script>

import CvTag                    from 'crudvuel-tools/src/components/CvTag'
import CvPaginate               from 'crudvuel-tools/src/components/grid-components/CvPaginate'
import CvSimpleFilter           from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import CvCombinatoryFilter      from 'crudvuel-tools/src/components/grid-components/CvCombinatoryFilter'
import CvAdvancedFilters        from 'crudvuel-tools/src/components/grid-components/CvAdvancedFilters'
import CvExpertFilters          from 'crudvuel-tools/src/components/grid-components/CvExpertFilters'
import CvSpinner                from 'crudvuel-tools/src/components/grid-components/CvSpinner'
import CvFilterSelector         from 'crudvuel-tools/src/components/grid-components/CvFilterSelector'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Grid')

export default {
  mixins: [
    CvComponentSet,
    vueMirroring.fixProperties({
      '[P]dinInsGridTag'              : 'div',
      '[P]dinInsRows'                 : [],
      '[P]dinInsShowTopPagination'    : true,
      '[P]dinInsShowBottomPagination' : true,
      '[P]staInsMinHeight'            : '300px',
      '[P]dinComGridLang'             : {},
      '[EM]dinGenMsync'               : null
    }),
    vueMirroring.assimilate(
      {CvPaginate, posFix: 'top'},
      {CvPaginate, posFix: 'bottom'},
      {CvSimpleFilter},
      {CvCombinatoryFilter},
      {CvFilterSelector}
    )
  ],

  computed: {
    cShowSimpleFilter () {
      if (this.cpDinInsfGridFilterSelectorCurrentFilter == null)
        return true
      return this.cpDinInsfGridFilterSelectorCurrentFilter === 'cv-simple-paginator'
    },

    cShowCombinatoryFilters () {
      if (this.cpDinInsfGridFilterSelectorCurrentFilter == null)
        return false
      return this.cpDinInsfGridFilterSelectorCurrentFilter === 'cv-combinatory-paginator'
    }
  },

  components : {
    CvTag,
    CvPaginate,
    CvSimpleFilter,
    CvCombinatoryFilter,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSpinner,
    CvFilterSelector
  },

  methods: {
    //reset search when switch filter mode
    emDinInsfGridFilterSelectorCurrentFilterProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        resolve(emitted)
        this.$nextTick().then(() => {
          this.emDinInsfGridCombinatoryFilterSearchEmitter('')
          this.emDinInsfGridSimpleFilterSearchEmitter('')
        })
      })
    }
  }
}
</script>
