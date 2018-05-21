<template>
  <div class="simple-filters-container">
    <label for="search">{{cSearchLabel}}</label>
    <input
      class="simple-filters-input form-control"
      type="text"
      name="search"
      v-on:keyup.13="goToFind()"
      v-on:keyup="interfaceInput"
      v-model="search"
      :title="cSearchMessage"
      v-on:focus="focused"
      v-on:blur="blured"
      autocomplete="off"
      :disabled="cDisableFields"
      :clearable="!cDisableFields"
      ref="inputRef"
    >
  </div>
</template>
<script>
export default {
  data () {
    return {
      search          :this.cSearch || "",
      keyInterruption :null
    }
  },
  props:[
    "cvSearch",
    "cvKeyInterruptionLimit",
    "cvSearchMessage",
    "cvSearchLabel",
    "cvActiveFilter",
    "cvLoading",
    "cvDisableFields"
  ],
  methods:{
    goToFind:function(){
      if(this.cDisableFields)
        return false;
      this.$emit('go-to-find', this.search);
    },
    focused:function(){
      if(this.cDisableFields)
        return false;
      this.interfaceInput()
      this.$emit('cv-focused', this.search);
    },
    blured:function(){
      if(this.cDisableFields)
        return false;
      this.$emit('cv-blured', this.search);
    },
    /**
     * auto launch get service after a limit time without press a new key
     *
     * @author Benomas benomas@gmail.com
     * @date   2017-07-02
     * @return void
     */
    interfaceInput:function(key){
      this.$emit('cv-keyup', key);
      if(this.cKeyInterruptionLimit<=0)
        return false;
      clearTimeout(this.keyInterruption);
      this.keyInterruption = setTimeout(()=>{
        this.goToFind();
        clearTimeout(this.keyInterruption);
      }, this.cKeyInterruptionLimit);
    },
    cleared:function(params){
      this.interfaceInput(params)
      this.$emit('cv-cleared')
    },
    clear: function () {
      this.search=''
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
    cSearchLabel:function(){
      return this.cvSearchLabel || "Buscar";
    },
    cSearchMessage:function(){
      return this.cvSearchMessage || "Realizar busqueda simple";
    },
    cActiveFilter:function(){
      return this.cvActiveFilter || false
    },
    cLoading:function(){
      return this.cvLoading || false
    },
    cInputRef: function() {
      return this.$refs.inputRef || null
    }
  }
}
</script>
