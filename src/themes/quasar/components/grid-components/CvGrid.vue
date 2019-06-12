<script>
import CvCustomExtender  from 'src/crudvuel/customs/components/grid-components/CvGrid'
import CvTag             from '../CvTag'
import CvPaginate        from './CvPaginate'
import CvAdvancedFilters from './CvAdvancedFilters'
import CvExpertFilters   from './CvExpertFilters'
import CvSimpleFilters   from './CvSimpleFilters'
import CvCombinatoryFilters   from './CvCombinatoryFilters'
import CvFilterSelector   from './CvFilterSelector'
import CvSpinner         from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvSpinner'
export default {
  extends    : CvCustomExtender,
  components : {
    CvTag,
    CvPaginate,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSimpleFilters,
    CvCombinatoryFilters,
    CvSpinner,
    CvFilterSelector
  }
}
</script>
