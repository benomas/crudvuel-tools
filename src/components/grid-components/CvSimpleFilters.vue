<template>
  <div class="simple-filters-container">
    <label for="simpleSearch">{{cSimpleSearchLabel}}</label>
    <input
      class="simple-filters-input form-control"
      type="text"
      name="simpleSearch"
      autocomplete="off"
      v-model="simpleSearch"
      ref="simpleSearchInputRef"
      :title="cSimpleSearchMessage"
      :disabled="cDisableFields"
      :clearable="!cDisableFields"
      @keyup.13="mSimpleSearchGoToFind()"
      @keyup="mSimpleSearchKeyUp"
      @focus="mSimpleSearchFocused"
      @blur="mSimpleSearchBlured"
    >
  </div>
</template>
<script>
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
export default {
  mixins: [CvLocalSimpleFilterTrait],
  data () {
    return {
      simpleSearchKeyInterruption : null,
      simpleSearchInputContainer  : true
    }
  },
  props:[
    'cvSimpleSearchActiveFilter',
    'cvDisableFields',
    'cvSimpleSearchKeyInterruption',
    'cvSimpleSearch'
  ],
  methods:{
    mSimpleSearchGoToFind:function(){
      if(this.cDisableFields)
        return false;
      this.$emit('cv-simple-filter-go-to-find', this.simpleSearch);
    },
    /**
     * auto launch get service after a limit time without press a new key
     *
     * @author Benomas benomas@gmail.com
     * @date   2017-07-02
     * @return void
     */
    mSimpleSearchStart:function(key = null){
      this.$nextTick().then(() => {
        this.$emit('cv-simple-search-key-up', key)
        if(this.cKeyInterruptionLimit<=0)
          return false
        clearTimeout(this.simpleSearchKeyInterruption)
        this.simpleSearchKeyInterruption = setTimeout(()=>{
          this.mSimpleSearchGoToFind()
          clearTimeout(this.simpleSearchKeyInterruption)
        }, this.cKeyInterruptionLimit)
      })
    }
  },
  computed:{
    cDisableFields:function(){
      return this.cvDisableFields || false
    },
    cSimpleSearch:function(){
      return this.cvSimpleSearch || "";
    },
    cKeyInterruptionLimit:function(){
      return this.cvKeyInterruptionLimit || 500;
    },
    cSimpleSearchKeyInterruption:function(){
      return this.cvSimpleSearchKeyInterruption || false
    },
    cSimpleSearchInputRef: function() {
      return this.$refs.simpleSearchInputRef || null
    },
    cSimpleSearchActiveFilter: function () {
      return this.cvSimpleSearchActiveFilter
    }
  },
  mounted: function () {
    this.simpleSearch = this.cSimpleSearch || ''
  }
}
</script>
