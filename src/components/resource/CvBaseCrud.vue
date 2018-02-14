<template>
  <div >
    {{action.label}}
  </div>
</template>
<script>
  export default{
    data (){
        return {
          resource :null,
          action   :null,
          rowId    :null,
          row      :null,
          rows     :null,
          ready    :false,
        }
    },
    methods:{
      getSuccess:function(response){
        if(action && action.type==="rows")
          this.rows=response.data.data || response.data;
        if(action && action.type==="row")
          this.row=response.data.data || response.data;
        this.ready=true;
      },
      getError:function(response){
        this.ready=true;
      },
      getParams:function(){
        return null;
      },
      getService:function(getSuccess,getError,getParams,url,queryString){
        if(!this.resource || !this.resource.getService)
          return false;

        this.ready=false;
        getSuccess=getSuccess||this.getSuccess;
        getError=getError||this.getError;
        getParams=getParams||this.getParams();
        url=url||null;
        this.resource.getService(
          getSuccess,
          getError,
          getParams,
          url,
          queryString,
        )
      },
      setSuccess:function(response){
        if(action && action.type==="rows")
          this.rows=response.data.data || response.data;
        if(action && action.type==="row")
          this.row=response.data.data || response.data;
        this.ready=true;
      },
      setError:function(response){
        this.ready=true;
      },
      setParams:function(){
        return null;
      },
      setService:function(setSuccess,setError,setParams,url,queryString){
        if(!this.resource || !this.resource.setService)
          return false;

        this.ready=false;
        setSuccess=setSuccess||this.setSuccess;
        setError=setError||this.setError;
        setParams=setParams||this.setParams();
        url=url||null;
        if(this.rowId)
          this.resource.setService(this.rowId,setSuccess,setError,setParams,url,queryString)
        else
          this.resource.setService(setSuccess,setError,setParams,url,queryString)
      },
      validateAction:function(action){
        return this.resorceAction(action) && this.hasPermission(action);
      },
      hasPermission:function(action){
        return true;
      },
      resorceAction:function(action){
        return (this.resource && this.resource.actions && this.resource.actions[action])?this.resource.actions[action]:null;
      },
      actionType:function(action){
        let resourceAction =  this.resorceAction(action);
        return resourceAction.type || null;
      },
      actionPath:function(action,row){
        let resourceAction =  this.resorceAction(action);
        if(resourceAction){
          if(resourceAction.type ==="rows")
            return this.resource.path+"/"+resourceAction.name;
          if(resourceAction.type ==="row" && row && row.id)
            return this.resource.path+"/"+row.id+"/"+resourceAction.name;
        }
        return null;
      }
    },
    computed:{
      cResource:function(){
        return this.cvResource || null;
      },
      cAction:function(){
        return this.cvAction || null;
      },
      cRows:function(){
        return this.cvRows || null;
      },
      cRow:function(){
        return this.cvRow || null;
      },
      cRowId:function(){
        return this.$route.params.id || null;
      }
    },
    props:[
      "cvResource",
      "cvAction",
      "cvRows",
      "cvRow",
    ],
    created:function(){
      this.resource = this.cResource;
      this.action   = this.cAction;
      this.rowId   = this.cRowId;
    }
  }
</script>