<template>
  <cv-tag :tag="cTag">
    <slot
      name="cv-ths-slot"
    >
    </slot>
  </cv-tag>
</template>
<script>
export default {
  props:[
    "cvTag"
  ],
  computed:{
    cTag:function(){
      return this.cvTag || "div"
    }
  }
}
</script>
