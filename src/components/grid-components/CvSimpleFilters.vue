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
    >
  </div>
</template>
<script>
export default {
  data () {
    return {
      search               :this.cSearch || "",
      keyInterruption      :null,
      keyInterruptionLimit :this.cKeyInterruption || 500,
    }
  },
  props:[
    "cvSearch",
    "cvKeyInterruptionLimit",
    "cvSearchMessage",
    "cvSearchLabel",
    "cvActiveFilter",
    "cvLoading"
  ],
  methods:{
    goToFind:function(){
      this.$emit('go-to-find', this.search);
    },
    focused:function(){
      this.$emit('cv-focused', this.search);
    },
    blured:function(){
      this.$emit('cv-blured', this.search);
    },
    /**
     * auto launch get service after a limit time without press a new key
     *
     * @author Benomas benomas@gmail.com
     * @date   2017-07-02
     * @return void
     */
    interfaceInput:function(){
      if(this.keyInterruptionLimit<=0)
        return false;
      clearTimeout(this.keyInterruption);
      this.keyInterruption = setTimeout(()=>{
        this.goToFind();
        clearTimeout(this.keyInterruption);
      }, this.keyInterruptionLimit);
    },
    cleared:function(params){
      this.interfaceInput(params)
      this.$emit('cv-cleared')
    }
  },
  computed:{
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
    }
  }
}
</script>
