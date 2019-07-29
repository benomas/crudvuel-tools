<script>
import {mySubString,myReplace} from '../../cvHelper'
export default {
  data () {
    return {
      search               : null,
      searchInputContainer : false,
      staticSearchLabel    : null
    }
  },
  props: [
    'cvParentRef',
    'cvDisableFields',
    'cvSearchLabel',
    'cvSearchMessage',
    'cvSearchIcon',
    'cvSearchIconColor',
    'cvExcludedReactionCharacters',
    'cvFilterLoading',
    'cvSearchKeyInterruption',
    'cvKeyInterruptionLimit'
  ],
  methods: {
    // Inyect search to the input filter
    mSimpleFilterInyectSearch: function (search = null,reactive =  true) {
      return new Promise ((resolve, reject) => {
        this.$set(this,'search',search)
        if (!this.cSearchInputContainer){
          this.cSimpleFilterRef.mSimpleFilterInyectSearch(this.search)
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
      this.$emit('cv-search-inyected', this.search)
    },
    // trigger focused event through the parent tree
    mSearchFocused:function () {
      if (!this.cSearchInputContainer)
        return this.$emit('cv-search-focused', this.search)
      if(this.cDisableFields)
        return false
      this.$emit('cv-search-focused', this.search)
      this.mSearchStart()
    },
    mSearchBlured:function () {
      if(this.cDisableFields)
        return false
      this.$emit('cv-search-blured', this.search)
    },
    mSearchKeyUp: function (key = null) {
      if (!this.cSearchInputContainer)
        return this.$emit('cv-search-key-up', key)
      if(this.cDisableFields)
        return false
      this.mSearchStart(key)
    },
    mSearchCleared:function (params) {
      this.$emit('cv-search-cleared')
      if (!this.cSearchInputContainer)
        return null
      this.mSearchStart(params)
    },
    mSearchClear: function () {
      if (this.cSearchInputContainer){
        this.$set(this,'search','')
        return this.$emit('cv-search-cleared')
      }
      if(this.cSimpleFilterRef)
        this.cSimpleFilterRef.mSearchClear()
    },
    mDefMatcherizerProps: function (referenceName = 'cvSimpleFilterRef') {
      return {
        'cv-search-label'            : this.cSearchLabel,
        'cv-search-icon'             : this.cSearchIcon,
        'cv-search-icon-color'       : this.cSearchIconColor,
        'cv-event-filter-loading'    : this.cFilterLoading,
        'cv-search-key-interruption' : this.cSearchKeyInterruption,
        'ref'                        : referenceName
      }
    },
    prepareToFindSource:function(search){
      this.processList()
      this.$set(this,'disableList',false)
      return false
    },
    mySubString,
    myReplace
  },
  computed:{
    cSimpleFilterRef: function () {
      return this.$refs.cvSimpleFilterRef || null
    },
    cInputRef: function() {
      return this.cSimpleFilterRef.cSearchInputRef || null
    },
    cParentRef: function() {
      return this.cvParentRef || null
    },
    cDisableFields:function(){
      return this.cvDisableFields || false
    },
    cSearchInputContainer: function () {
      return this.searchInputContainer
    },
    cSearchLabel:function(){
      if (this.cvSearchLabel != null){
        if(this.cvSearchLabel === '')
          return ''
        return this.cvSearchLabel
      }
      return this.staticSearchLabel || 'Buscar'
    },
    cSearchMessage:function(){
      return this.cvSearchMessage || "Realizar busqueda simple";
    },
    cSearchIconColor: function () {
      return this.cvSearchIconColor || ''
    },
    cSearchIcon: function () {
      if (this.cvSearchIcon != null){
        if(this.cvSearchIcon === '')
          return ''
        return this.cvSearchIcon
      }
      return 'fas fa-search'
    },
    cFilterLoading: function () {
      return this.cvFilterLoading
    },
    cSearchKeyInterruption: function () {
      return this.cvSearchKeyInterruption
    },
    cKeyInterruptionLimit:function () {
      return this.cvKeyInterruptionLimit
    }
  },
}
</script>
