<template>
  <cv-tag :tag="tag">
    <slot 
      name="cv-tds-slot"
      v-for="row in cvRows"
      :row="row"
    >
    </slot>
  </cv-tag>
</template>
<script>
export default {
  props:[
    "tag",
    "cvRows"
  ]
}
</script>
