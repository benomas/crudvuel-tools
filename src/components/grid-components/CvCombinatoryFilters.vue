<template>
  <div class="filters-container">
    <label for="search">{{cpSimpleFilterSearchLabel}}</label>
    <input
      class="filters-input form-control"
      type="text"
      name="search"
      autocomplete="off"
      v-model="search"
      ref="searchInputRef"
      :title="cpSimpleFilterSearchMessage"
      :disabled="cpSimpleFilterDisableFields"
      :clearable="!cpSimpleFilterDisableFields"
      @keyup.13="mSimpleFilterSearchGoToFind()"
      @keyup="mSimpleFilterSearchKeyUp"
      @focus="mSimpleFilterSearchFocused"
      @blur="mSimpleFilterSearchBlured"
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
      'simpleFilterSearch'                : {mode: 'D|P|CD|CP|M',init: ''},
      'simpleFilterSearchInputContainer'  : {mode: 'D|CD|M',init: true},
      'simpleFilterDisableList'           : {mode: 'D|CD|M',init: false},
      'simpleFilterDisableFields'         : {mode: 'P|CP',init: false},
      'simpleFilterSearchLabel'           : {mode: 'P|CP',init: ''},
      'simpleFilterSearchMessage'         : {mode: 'P|CP',init: ''},
      'simpleFilterSearchIcon'            : {mode: 'P|CP',init: 'fas fa-search'},
      'simpleFilterSearchIconColor'       : {mode: 'P|CP',init: 'info'},
      'simpleFilterFilterLoading'         : {mode: 'P|CP'},
      'simpleFilterSearchKeyInterruption' : {mode: 'P|CP',init: false},
      'simpleFilterSearchInterruption'    : {mode: 'D|DP|M',init: null},
      'simpleFilterKeyInterruptionLimit'  : {mode: 'P|CP',init: 500},
      'simpleFilterSearchActiveFilter'    : {mode: 'P|CP'}
    })
  ],
  data () {
    return {
      staticSearchLabel     : 'Busqueda simple'
    }
  },
  props:[
  ],
  methods:{
    mSearchGoToFind:function(){
      if(this.cpSimpleFilterDisableFields)
        return false;
      this.$emit('cv-filter-go-to-find', this.cdSimpleFilterSearch, 'cv-combinatory-paginator');
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
        if(this.cpSimpleFilterKeyInterruptionLimit<=0)
          return false
        clearTimeout(this.searchKeyInterruption)
        this.searchKeyInterruption = setTimeout(()=>{
          this.mSearchGoToFind()
          clearTimeout(this.searchKeyInterruption)
        }, this.cpSimpleFilterKeyInterruptionLimit)
      })
    }
  },
  computed:{
  },
  mounted: function () {
    this.mSimpleFilterSetSearch(this.cpSearch || '')
  }
}
</script>
