<template>
  <div >
    Selector de tipo de busqueda
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentFilter : null,
    }
  },
  props:[
    'cvCurrentFilter'
  ],
  methods:{
    selected: function () {
      this.$emit('cv-filter-selected', this.currentFilter)
    }
  },
  computed:{
    cCurrentFilter:function(){
      return this.currentFilter
    },
  },
  mounted: function () {
    this.currentFilter = this.cvCurrentFilter || null
  }
}
</script>
