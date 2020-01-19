<script>
import CvGrid from '../../../../components/grid-components/CvGrid'
import CvTag             from '../CvTag'
import CvPaginate        from './CvPaginate'
import CvAdvancedFilters from './CvAdvancedFilters'
import CvExpertFilters   from './CvExpertFilters'
import CvSimpleFilters   from './CvSimpleFilters'
import CvCombinatoryFilters   from './CvCombinatoryFilters'
import CvFilterSelector   from './CvFilterSelector'
import CvSpinner         from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSpinner'
import {cvGridM} from '../../../../components/grid-components/CvGrid'
export {cvGridM as cvGridM}
export default {
  extends    : CvGrid,
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
