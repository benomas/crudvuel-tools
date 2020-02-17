<script>
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring()
export default {
  mixins: [
    CvComponentSet/*,
    vueMirroring.fixProperties({
      'search'                : {mode: 'D|P|CD|CP|M',init: ''},
      'searchInputContainer'  : {mode: 'D|CD|M',init: false},
      'disableList'           : {mode: 'D|CD|M',init: false},
      'disableFields'         : {mode: 'P|CP',init: false},
      'searchLabel'           : {mode: 'P|CP',init: ''},
      'searchMessage'         : {mode: 'P|CP',init: ''},
      'searchIcon'            : {mode: 'P|CP',init: 'fas fa-search'},
      'searchIconColor'       : {mode: 'P|CP',init: 'info'},
      'filterLoading'         : {mode: 'P|CP'},
      'searchKeyInterruption' : {mode: 'P|CP',init: false},
      'searchInterruption'    : {mode: 'D|DP|M',init: null},
      'keyInterruptionLimit'  : {mode: 'P|CP',init: 500},
      'searchActiveFilter'    : {mode: 'P|CP'}
    })*/
  ],
  data () {
    return {
      staticSearchLabel    : null
    }
  },
  props: [
  ],
  methods: {
    // Inyect search to the input filter
    mSimpleFilterInyectSearch: function (search = null,reactive =  true) {
      return new Promise ((resolve, reject) => {
        this.mSetSearch(search)
        if (!this.cdSearchInputContainer){
          this.cSimpleFilterRef.mSimpleFilterInyectSearch(this.cdSearch)
          resolve()
        }
        this.mSearchInyected()
        if (reactive)
          this.mSearchStart()
        resolve()
      })
    },
    // trigger inyected event through the parent tree
    mSearchInyected: function () {
      this.$emit('cv-search-inyected', this.cdSearch)
    },
    // trigger focused event through the parent tree
    mSearchFocused:function () {
      if (!this.cdSearchInputContainer)
        return this.$emit('cv-search-focused', this.cdSearch)
      if(this.cpDisableFields)
        return false
      this.$emit('cv-search-focused', this.cdSearch)
      this.mSearchStart()
    },
    mSearchBlured:function () {
      if(this.cpDisableFields)
        return false
      this.$emit('cv-search-blured', this.cdSearch)
    },
    mSearchKeyUp: function (key = null) {
      if (!this.cdSearchInputContainer)
        return this.$emit('cv-search-key-up', key)
      if(this.cpDisableFields)
        return false
      this.mSearchStart(key)
    },
    mSearchCleared:function (params) {
      this.$emit('cv-search-cleared')
      if (!this.cdSearchInputContainer)
        return null
      this.mSearchStart(params)
    },
    mSearchClear: function () {
      if (this.cdSearchInputContainer){
        this.$set(this,'search','')
        return this.$emit('cv-search-cleared')
      }
      if(this.cSimpleFilterRef)
        this.cSimpleFilterRef.mSearchClear()
    },
    mDefMatcherizerProps: function (referenceName = 'cvSimpleFilterRef') {
      return {
        'cv-search-label'            : this.cpSearchLabel,
        'cv-search-icon'             : this.cpSearchIcon,
        'cv-search-icon-color'       : this.cSearchIconColor,
        'cv-event-filter-loading'    : this.cpFilterLoading,
        'cv-search-key-interruption' : this.cSearchKeyInterruption,
        'ref'                        : referenceName
      }
    },
    prepareToFindSource:function(search){
      this.processList()
      this.mSetDisableList(false)
      return false
    }
  },
  computed:{
    cSimpleFilterRef: function () {
      return this.$refs.cvSimpleFilterRef || null
    },
    cInputRef: function() {
      return this.cSimpleFilterRef.cSearchInputRef || null
    }
  },
}
</script>
