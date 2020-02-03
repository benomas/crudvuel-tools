<script>
import CvGrid                 from 'crudvuel-tools/src/components/grid-components/CvGrid'
import CvTag                  from 'crudvuel-tools/src/themes/quasar/components/CvTag'
import CvPaginate             from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvPaginate'
import CvAdvancedFilters      from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvAdvancedFilters'
import CvExpertFilters        from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvExpertFilters'
import CvSimpleFilter         from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import CvCombinatoryFilter   from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvCombinatoryFilter'
import CvFilterSelector       from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvFilterSelector'
import CvSpinner              from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSpinner'
import CvComponentSet         from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
export default {
  mixins     : [
    CvComponentSet,
    CvGrid
  ],
  components : {
    CvTag,
    CvPaginate,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSimpleFilter,
    CvCombinatoryFilter,
    CvSpinner,
    CvFilterSelector
  }
}
</script>
