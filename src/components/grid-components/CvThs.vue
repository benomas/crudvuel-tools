<template>
  <cv-tag :tag="tag">
    <slot 
      name="cv-ths-slot"
    >
    </slot>
  </cv-tag>
</template>
<script>
export default {
  props:[
    "tag"
  ],
  computed:{
  }
}
</script>
