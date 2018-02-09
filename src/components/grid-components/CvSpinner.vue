<template>
  <div class="cv-spinner">
    <img src="../../assets/spinner.gif">
  </div>
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
<style lang="scss">
  .cv-spinner{
    position: absolute;
    margin: 15% 40%;
    font-size: 25px;
    img{
      width:100px;
    }
  }
</style>
