<template>
  <span>
    <slot name="orderable-icon" if="!cData || !ckey || cData.cvParametrizer.getOrderBy()!==ckey">
      <span>ord</span>
    </slot>
    <template if="cData && ckey && cData.cvParametrizer.getOrderBy()===ckey">
      <slot name="ascending-icon" v-if="cData.cvParametrizer.getAscending()">
        <span>asc</span>
      </slot>
      <slot name="descending-icon" v-if="!cData.cvParametrizer.getAscending()">
        <span>des</span>
      </slot>
    </template>
  </span>
</template>
<script>
export default {
  props:[
    "cvData",
    "cvKey"
  ],
  computed:{
    cData:function(){
      return this.cvData || null;
    },
    ckey:function(){
      return this.cvKey || null;
    }
  },
  created:function(){
    console.log(this.cData)
  }
}
</script>
