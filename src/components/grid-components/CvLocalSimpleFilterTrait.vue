<script>
import {mySubString,myReplace} from '../../cvHelper'
export default {
  data () {
    return {
      simpleSearch               : null,
      simpleSearchInputContainer : false
    }
  },
  props: [
    'cvParentRef',
    'cvDisableFields',
    'cvSimpleSearchLabel',
    'cvSimpleSearchMessage',
    'cvSimpleSearchIcon',
    'cvSimpleSearchIconColor',
    'cvExcludedReactionCharacters',
    'cvSimpleFilterLoading',
    'cvSimpleSearchKeyInterruption',
    'cvKeyInterruptionLimit'
  ],
  methods: {
    // Inyect search to the input filter
    mSimpleFilterInyectSearch: function (simpleSearch = null,reactive =  true) {
      return new Promise ((resolve, reject) => {
        this.$set(this,'simpleSearch',simpleSearch)
        if (!this.cSimpleSearchInputContainer){
          this.cSimpleFilterRef.mSimpleFilterInyectSearch(this.simpleSearch)
          resolve()
        }
        this.mSimpleSearchInyected()
        if (reactive)
          this.mSimpleSearchStart()
        resolve()
      })
    },
    // trigger inyected event through the parent tree
    mSimpleSearchInyected: function () {
      this.$emit('cv-simple-search-inyected', this.simpleSearch)
    },
    // trigger focused event through the parent tree
    mSimpleSearchFocused:function () {
      if (!this.cSimpleSearchInputContainer)
        return this.$emit('cv-simple-search-focused', this.simpleSearch)
      if(this.cDisableFields)
        return false
      this.$emit('cv-simple-search-focused', this.simpleSearch)
      this.mSimpleSearchStart()
    },
    mSimpleSearchBlured:function () {
      if(this.cDisableFields)
        return false
      this.$emit('cv-simple-search-blured', this.simpleSearch)
    },
    mSimpleSearchKeyUp: function (key = null) {
      if (!this.cSimpleSearchInputContainer)
        return this.$emit('cv-simple-search-key-up', key)
      if(this.cDisableFields)
        return false
      this.mSimpleSearchStart(key)
    },
    mSimpleSearchCleared:function (params) {
      this.$emit('cv-simple-search-cleared')
      if (!this.cSimpleSearchInputContainer)
        return null
      this.mSimpleSearchStart(params)
    },
    mSimpleSearchClear: function () {
      if (this.cSimpleSearchInputContainer){
        this.$set(this,'simpleSearch','')
        return this.$emit('cv-simple-search-cleared')
      }
      if(this.cSimpleFilterRef)
        this.cSimpleFilterRef.mSimpleSearchClear()
    },
    mDefMatcherizerProps: function (referenceName = 'cvSimpleFilterRef') {
      return {
        'cv-simple-search-label'            : this.cSimpleSearchLabel,
        'cv-simple-search-icon'             : this.cSimpleSearchIcon,
        'cv-simple-search-icon-color'       : this.cSimpleSearchIconColor,
        'cv-simple-filter-loading'          : this.cSimpleFilterLoading,
        'cv-simple-search-key-interruption' : this.cSimpleSearchKeyInterruption,
        'ref'                               : referenceName
      }
    },
    prepareToFindSource:function(simpleSearch){
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
      return this.cSimpleFilterRef.cInputRef || null
    },
    cParentRef: function() {
      return this.cvParentRef || null
    },
    cDisableFields:function(){
      return this.cvDisableFields || false
    },
    cSimpleSearchInputContainer: function () {
      return this.simpleSearchInputContainer
    },
    cSimpleSearchLabel:function(){
      if (this.cvSimpleSearchLabel != null){
        if(this.cvSimpleSearchLabel === '')
          return ''
        return this.cvSimpleSearchLabel
      }
      return 'Buscar'
    },
    cSimpleSearchMessage:function(){
      return this.cvSimpleSearchMessage || "Realizar busqueda simple";
    },
    cSimpleSearchIconColor: function () {
      return this.cvSimpleSearchIconColor || ''
    },
    cSimpleSearchIcon: function () {
      if (this.cvSimpleSearchIcon != null){
        if(this.cvSimpleSearchIcon === '')
          return ''
        return this.cvSimpleSearchIcon
      }
      return 'fas fa-search'
    },
    cSimpleFilterLoading: function () {
      return this.cvSimpleFilterLoading
    },
    cSimpleSearchKeyInterruption: function () {
      return this.cvSimpleSearchKeyInterruption
    },
    cKeyInterruptionLimit:function () {
      return this.cvKeyInterruptionLimit
    }
  },
}
</script>
