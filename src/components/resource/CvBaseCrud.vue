<template>
  <div >
    {{currentAction}}
  </div>
</template>
<script>
  export default{
    data (){
        return {
            row:null,
            rows:null,
            ready:false
        }
    },
    methods:{
    },
    props:[
      "resource",
      "currentAction"
    ],
    created:function(){
    }
  }
</script>