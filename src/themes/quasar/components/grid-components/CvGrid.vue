<script>
import CvCustomExtender   from 'src/crudvuel/customs/components/grid-components/CvGrid.vue'
import CvTag             from '../CvTag'
import CvPaginate        from './CvPaginate'
import CvAdvancedFilters from './CvAdvancedFilters'
import CvExpertFilters   from './CvExpertFilters'
import CvSimpleFilters   from './CvSimpleFilters'
import CvSpinner         from './CvSpinner'
export default {
  extends    : CvCustomExtender,
  components : {
    CvTag,
    CvPaginate,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSimpleFilters,
    CvSpinner
  }
}
</script>
<style lang="stylus" scoped>
  hr
    display:none
</style>
