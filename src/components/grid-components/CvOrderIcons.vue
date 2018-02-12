<template>
  <span>
    <slot name="orderable-icon">
      <span>ord</span>
    </slot>
    <slot name="ascending-icon" v-if="comCvData && comCvkey && comCvData.params && comCvData.params.paginate.orderBy===comCvkey && comCvData.params.paginate.ascending">
      <span>asc</span>
    </slot>
    <slot name="descending-icon" v-if="comCvData && comCvkey && comCvData.params &&  comCvData.params.paginate.orderBy===comCvkey && !comCvData.params.paginate.ascending">
      <span>des</span>
    </slot>
  </span>
</template>
<script>
export default {
  props:[
    "cvData",
    "cvKey"
  ],
  computed:{
    comCvData:function(){
      return this.cvData || {};
    },
    comCvkey:function(){
      return this.cvKey;
    }
  }
}
</script>
