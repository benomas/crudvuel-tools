<template>
  <div>
  <!--
    TODO:no dependencies template need to be defined
  -->
  </div>
</template>
<script>

import CvTag                    from '../CvTag'
import CvPaginate               from './CvPaginate'
import CvSimpleFilter           from './CvSimpleFilter'
import CvCombinatoryFilter     from './CvCombinatoryFilter'
import CvAdvancedFilters        from './CvAdvancedFilters'
import CvExpertFilters          from './CvExpertFilters'
import CvSpinner                from './CvSpinner'
import CvParametrizer           from '../../CvParametrizer'
import CvFilterSelector         from './CvFilterSelector'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
export default {
  mixins     : [
    CvComponentSet
  ],
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
  data () {
    return {
    }
  },
  props:[
  ],
  computed:{
  },
  methods:{
  }
}
</script>
