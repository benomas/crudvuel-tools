<template>
  <span v-if="cData && cKey">
    <slot
      name="orderable-icon"
      v-if="cData.cvParametrizer.getOrderBy()!=cKey"
    >
      <span>ord</span>
    </slot>
    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cData.cvParametrizer.getOrderBy()===cKey && cData.cvParametrizer.getAscending()"
      >
        <span>asc</span>
      </slot>
      <slot
        name="descending-icon"
        v-if="cData.cvParametrizer.getOrderBy()===cKey && !cData.cvParametrizer.getAscending()"
      >
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
    cKey:function(){
      return this.cvKey || null;
    }
  }
}
</script>
