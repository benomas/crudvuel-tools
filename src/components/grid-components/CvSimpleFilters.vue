<template>
  <div class="simple-filters-container">
    <label for="search">{{cpSimpleFiltersSearchLabel}}</label>
    <input
      class="simple-filters-input form-control"
      type="text"
      name="search"
      autocomplete="off"
      v-model="search"
      ref="searchInputRef"
      :title="cpSimpleFiltersSearchMessage"
      :disabled="cpSimpleFiltersDisableFields"
      :clearable="!cpSimpleFiltersDisableFields"
      @keyup.13="mSimpleFiltersSearchGoToFind()"
      @keyup="mSimpleFiltersSearchKeyUp"
      @focus="mSimpleFiltersSearchFocused"
      @blur="mSimpleFiltersSearchBlured"
    >
  </div>
</template>
<script>
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/VueMirroring'
export default {
  mixins: [
    CvComponentSet,
    CvLocalSimpleFilterTrait,
    new VueMirroring().fixProperties({
      'simpleFiltersSearch'                : {mode: 'D|P|CD|CP|M',init: ''},
      'simpleFiltersSearchInputContainer'  : {mode: 'D|CD|M',init: true},
      'simpleFiltersDisableList'           : {mode: 'D|CD|M',init: false},
      'simpleFiltersDisableFields'         : {mode: 'P|CP',init: false},
      'simpleFiltersSearchLabel'           : {mode: 'P|CP',init: ''},
      'simpleFiltersSearchMessage'         : {mode: 'P|CP',init: ''},
      'simpleFiltersSearchIcon'            : {mode: 'P|CP',init: 'fas fa-search'},
      'simpleFiltersSearchIconColor'       : {mode: 'P|CP',init: 'info'},
      'simpleFiltersFilterLoading'         : {mode: 'P|CP'},
      'simpleFiltersSearchKeyInterruption' : {mode: 'P|CP',init: false},
      'simpleFiltersSearchInterruption'    : {mode: 'D|DP|M',init: null},
      'simpleFiltersKeyInterruptionLimit'  : {mode: 'P|CP',init: 500},
      'simpleFiltersSearchActiveFilter'    : {mode: 'P|CP'}
    })
  ],
  data () {
    return {
      //searchInputContainer  : true,
      staticSearchLabel     : 'Busqueda simple'
    }
  },
  props:[
  ],
  methods:{
    mSimpleFiltersSearchGoToFind:function(){
      if(this.cpSimpleFiltersDisableFields)
        return false;
      this.$emit('cv-event-filter-go-to-find', this.cdSimpleFiltersSearch, 'cv-simple-paginator');
    },
    /**
     * auto launch get service after a limit time without press a new key
     *
     * @author Benomas benomas@gmail.com
     * @date   2017-07-02
     * @return void
     */
    mSimpleFiltersSearchStart:function(key = null){
      this.$nextTick().then(() => {
        this.$emit('cv-search-key-up', key)
        if(this.cpSimpleFiltersKeyInterruptionLimit<=0)
          return false
        clearTimeout(this.searchInterruption)
        this.mSetSearchInterruption(
          setTimeout(()=>{
            this.mSearchGoToFind()
            clearTimeout(this.searchInterruption)
          }, this.cpSimpleFiltersKeyInterruptionLimit)
        )
      })
    }
  },
  computed:{
    cSimpleFiltersSearchInputRef: function() {
      return this.$refs.searchInputRef || null
    }
  },
  mounted: function () {
    this.mSimpleFiltersSetSearch(this.cpSimpleFiltersSearch || '')
  }
}
</script>
