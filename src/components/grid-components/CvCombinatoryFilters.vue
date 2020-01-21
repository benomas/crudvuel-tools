<template>
  <div class="filters-container">
    <label for="search">{{cpCombinatoryFiltersSearchLabel}}</label>
    <input
      class="filters-input form-control"
      type="text"
      name="search"
      autocomplete="off"
      v-model="search"
      ref="searchInputRef"
      :title="cpCombinatoryFiltersSearchMessage"
      :disabled="cpCombinatoryFiltersDisableFields"
      :clearable="!cpCombinatoryFiltersDisableFields"
      @keyup.13="mCombinatoryFiltersSearchGoToFind()"
      @keyup="mCombinatoryFiltersSearchKeyUp"
      @focus="mCombinatoryFiltersSearchFocused"
      @blur="mCombinatoryFiltersSearchBlured"
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
      'combinatoryFiltersSearch'                : {mode: 'D|P|CD|CP|M',init: ''},
      'combinatoryFiltersSearchInputContainer'  : {mode: 'D|CD|M',init: true},
      'combinatoryFiltersDisableList'           : {mode: 'D|CD|M',init: false},
      'combinatoryFiltersDisableFields'         : {mode: 'P|CP',init: false},
      'combinatoryFiltersSearchLabel'           : {mode: 'P|CP',init: ''},
      'combinatoryFiltersSearchMessage'         : {mode: 'P|CP',init: ''},
      'combinatoryFiltersSearchIcon'            : {mode: 'P|CP',init: 'fas fa-search'},
      'combinatoryFiltersSearchIconColor'       : {mode: 'P|CP',init: 'info'},
      'combinatoryFiltersFilterLoading'         : {mode: 'P|CP'},
      'combinatoryFiltersSearchKeyInterruption' : {mode: 'P|CP',init: false},
      'combinatoryFiltersSearchInterruption'    : {mode: 'D|DP|M',init: null},
      'combinatoryFiltersKeyInterruptionLimit'  : {mode: 'P|CP',init: 500},
      'combinatoryFiltersSearchActiveFilter'    : {mode: 'P|CP'}
    })
  ],
  data () {
    return {
      staticSearchLabel     : 'Busqueda simple'
    }
  },
  methods:{
    mSearchGoToFind:function(){
      if(this.cpCombinatoryFiltersDisableFields)
        return false;
      this.$emit('cv-filter-go-to-find', this.cdCombinatoryFiltersSearch, 'cv-combinatory-paginator');
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
        this.$emit('cv-earch-key-up', key)
        if(this.cpCombinatoryFiltersKeyInterruptionLimit<=0)
          return false
        clearTimeout(this.searchKeyInterruption)
        this.searchKeyInterruption = setTimeout(()=>{
          this.mSearchGoToFind()
          clearTimeout(this.searchKeyInterruption)
        }, this.cpCombinatoryFiltersKeyInterruptionLimit)
      })
    }
  },
  computed:{
  },
  mounted: function () {
    console.log('asdasd')
    this.mCombinatoryFiltersSetSearch(this.cpSearch || '')
  }
}
</script>
