<template>
  <div>
  <!--
    TODO:Template to be updated
  -->
  </div>
</template>
<script>

import CvTag                    from '../CvTag'
import CvPaginate               from './CvPaginate'
import CvSimpleFilter           from './CvSimpleFilter'
import CvCombinatoryFilters     from './CvCombinatoryFilters'
import CvAdvancedFilters        from './CvAdvancedFilters'
import CvExpertFilters          from './CvExpertFilters'
import CvSpinner                from './CvSpinner'
import CvParametrizer           from '../../CvParametrizer'
import CvFilterSelector         from './CvFilterSelector'
import CvGridMirroring          from './CvGridMirroring'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
export default {
  mixins     : [
    CvComponentSet,
    CvGridMirroring
  ],
  components : {
    CvTag,
    CvPaginate,
    CvSimpleFilter,
    CvCombinatoryFilters,
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
    "cvTag",
    "cvGridLang"
  ],
  computed:{
    cTag:function(){
      return this.cvTag || "div"
    },
    cGridLang: function () {
      return this.cvGridLang || null
    }
  },
  methods:{
    fLang: function(word,defWord) {
      if(this.cGridLang && this.cGridLang[word])
        return this.cGridLang[word]
      return defWord || ''
    }
  }
}
</script>
