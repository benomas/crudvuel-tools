<script>
import CvGrid from '../../../../components/grid-components/CvGrid'
import CvTag             from '../CvTag'
import CvPaginate        from './CvPaginate'
import CvAdvancedFilters from './CvAdvancedFilters'
import CvExpertFilters   from './CvExpertFilters'
import CvSimpleFilter   from './CvSimpleFilter'
import CvCombinatoryFilters   from './CvCombinatoryFilters'
import CvFilterSelector   from './CvFilterSelector'
import CvSpinner         from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSpinner'
export default {
  extends    : CvGrid,
  components : {
    CvTag,
    CvPaginate,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSimpleFilter,
    CvCombinatoryFilters,
    CvSpinner,
    CvFilterSelector
  }
}
</script>
