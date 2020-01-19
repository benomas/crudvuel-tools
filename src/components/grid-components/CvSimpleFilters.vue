<template>
  <div class="simple-filters-container">
    <label for="search">{{cpSearchLabel}}</label>
    <input
      class="simple-filters-input form-control"
      type="text"
      name="search"
      autocomplete="off"
      v-model="search"
      ref="searchInputRef"
      :title="cpSearchMessage"
      :disabled="cpDisableFields"
      :clearable="!cpDisableFields"
      @keyup.13="mSearchGoToFind()"
      @keyup="mSearchKeyUp"
      @focus="mSearchFocused"
      @blur="mSearchBlured"
    >
  </div>
</template>
<script>
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/VueMirroring'
let vueMirroring = new VueMirroring()
let selfMirroring = vueMirroring.fixProperties({
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
})
let cvSfM = {props:selfMirroring.props}
export {cvSfM}
export default {
  mixins: [
    CvComponentSet,
    CvLocalSimpleFilterTrait,
    selfMirroring
  ],
  data () {
    return {
      searchInputContainer  : true,
      staticSearchLabel     : 'Busqueda simple'
    }
  },
  props:[
  ],
  methods:{
    mSearchGoToFind:function(){
      if(this.cpDisableFields)
        return false;
      this.$emit('cv-event-filter-go-to-find', this.cdSearch, 'cv-simple-paginator');
    },
    /**
     * auto launch get service after a limit time without press a new key
     *
     * @author Benomas benomas@gmail.com
     * @date   2017-07-02
     * @return void
     */
    mSearchStart:function(key = null){
      this.$nextTick().then(() => {
        this.$emit('cv-search-key-up', key)
        if(this.cpKeyInterruptionLimit<=0)
          return false
        clearTimeout(this.searchInterruption)
        this.mSetSearchInterruption(
          setTimeout(()=>{
            this.mSearchGoToFind()
            clearTimeout(this.searchInterruption)
          }, this.cpKeyInterruptionLimit)
        )
      })
    }
  },
  computed:{
    cSearchInputRef: function() {
      return this.$refs.searchInputRef || null
    }
  },
  mounted: function () {
    this.mSetSearch(this.cpSearch || '')
  }
}
</script>
