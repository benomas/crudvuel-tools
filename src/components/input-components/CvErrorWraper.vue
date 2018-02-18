<template>
  <cv-tag :tag="cTag" class="cv-error-wraper" :class="{'cv-has-error':cError}">
    <slot>
    </slot>
    <span class="cv-error-message" v-if="cError">
        {{ cError[0] }}
    </span>
  </cv-tag>
</template>
<script>
  export default {
    props:[
      "cvError",
      "cvTag",
    ],
    computed:{
      cError:function(){
        return this.cvError || null;
      },
      cTag:function(){
        return this.cvTag || "div";
      }
    },
  }
</script>