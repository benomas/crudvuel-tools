<template>
  <div class="filters-container">
    <label for="search">{{cpSearchLabel}}</label>
    <input
      class="filters-input form-control"
      type="text"
      name="search"
      autocomplete="off"
      v-model="search"
      ref="searchInputRef"
      :title="cSearchMessage"
      :disabled="cDisableFields"
      :clearable="!cDisableFields"
      @keyup.13="mSearchGoToFind()"
      @keyup="mSearchKeyUp"
      @focus="mSearchFocused"
      @blur="mSearchBlured"
    >
  </div>
</template>
<script>
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
export default {
  mixins: [CvLocalSimpleFilterTrait],
  data () {
    return {
      searchKeyInterruption : null,
      searchInputContainer  : true,
      staticSearchLabel     : 'Busqueda simple'
    }
  },
  props:[
    'cvSearchActiveFilter',
    'cvDisableFields',
    'cvSearchKeyInterruption',
    'cvSearch'
  ],
  methods:{
    mSearchGoToFind:function(){
      if(this.cDisableFields)
        return false;
      this.$emit('cv-filter-go-to-find', this.search, 'cv-combinatory-paginator');
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
        if(this.cKeyInterruptionLimit<=0)
          return false
        clearTimeout(this.searchKeyInterruption)
        this.searchKeyInterruption = setTimeout(()=>{
          this.mSearchGoToFind()
          clearTimeout(this.searchKeyInterruption)
        }, this.cKeyInterruptionLimit)
      })
    }
  },
  computed:{
    cDisableFields:function(){
      return this.cvDisableFields || false
    },
    cSearch:function(){
      return this.cvSearch || "";
    },
    cKeyInterruptionLimit:function(){
      return this.cvKeyInterruptionLimit || 500;
    },
    cSearchKeyInterruption:function(){
      return this.cvSearchKeyInterruption || false
    },
    cSearchInputRef: function() {
      return this.$refs.searchInputRef || null
    },
    cSearchActiveFilter: function () {
      return this.cvSearchActiveFilter
    }
  },
  mounted: function () {
    this.search = this.cSearch || ''
  }
}
</script>
