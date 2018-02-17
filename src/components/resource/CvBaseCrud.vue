<template>
  <div >
    {{action.label}}
  </div>
</template>
<script>
  import CvSynchronizer from '../../CvSynchronizer';
  import CvErrorWraper from '../input-components/CvErrorWraper';
  export default{
    components: {
      CvErrorWraper
    },
    data (){
      return {
        resource       :null,
        action         :null,
        rowKey         :"id",
        rowKeyValue    :null,
        row            :null,
        rows           :null,
        ready          :false,
        cvSynchronizer :new CvSynchronizer(),
        errors:{},
        successNotificationMessages:null,
        errorNotificationMessages:null,
        cancelNotificationMessages:null,
      }
    },
    methods:{
      getSuccess:function(response){
        if(this.action && this.action.type==="rows")
          this.rows=response.data.data || response.data;
        if(this.action && this.action.type==="row")
          this.row=response.data.data || response.data;
        this.ready=true;
        this.collectSuccessMessages(this.action.getGetSuccessMessage())
      },

      getError:function(response){
        this.ready=true;
        this.collectErrorMessages(this.action.getGetErrorMessage())
      },
      getParams:function(){
        return null;
      },
      getService:function(getSuccess,getError,getParams,url,queryString){
        if(!this.resource || !this.action || !this.action.getService)
          return false;

        this.ready=false;
        getSuccess=getSuccess||this.getSuccess;
        getError=getError||this.getError;
        getParams=getParams||this.getParams();
        url=url||null;
        this.action.getService(
          getSuccess,
          getError,
          getParams,
          url,
          queryString,
        )
      },
      setSuccess:function(response){
        if(this.action && this.action.type==="rows")
          this.rows=response.data.data || response.data;
        if(this.action && this.action.type==="row")
          this.row=response.data.data || response.data;
        this.ready=true;
        this.collectSuccessMessages(this.action.getSetSuccessMessage())
        this.successRedirect()
      },
      setError:function(response){
        this.ready=true;
        this.collectErrorMessages(this.action.getSetErrorMessage())
        this.errorRedirect()
      },
      setParams:function(){
        return this.action && this.action.type && this[this.action.type]?
          this[this.action.type]:null
      },
      setService:function(setSuccess,setError,setParams,url,queryString){
        if(!this.resource || !this.action || !this.action.setService)
          return false;

        if(!this.validator()){
          this.collectErrorMessages('No se han superado las validaciones del formulario')
          return
        }

        this.ready=false;
        setSuccess=setSuccess||this.setSuccess;
        setError=setError||this.setError;
        setParams=setParams||this.setParams();
        url=url||null;
        if(this.rowKeyValue)
          this.action.setService(this.rowKeyValue,setSuccess,setError,setParams,url,queryString)
        else
          this.action.setService(setSuccess,setError,setParams,url,queryString)
      },
      validateAction:function(action){
        return this.cExcludeActions.indexOf(action)<0 && this.resorceAction(action) && this.hasPermission(action);
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
        if(resourceAction)
          return resourceAction.getFixedPath(row)
        return null;
      },
      toSync:function(row,identifier){
        this.cvSynchronizer.toSync(row,this.rowKey,identifier);
      },
      synchronized:function(row,identifier){
        this.cvSynchronizer.synchronized(row,this.rowKey,identifier);
      },
      isSynchronizing:function(row,identifier){
        return this.cvSynchronizer.isSynchronizing(row,this.rowKey,identifier);
      },
      validIdentifier:function(identifier){
        return this.cvSynchronizer.validIdentifier(identifier);
      },
      someSyncInProgress:function(){
        return this.cvSynchronizer.someSyncInProgress();
      },
      messageCollector:function(property,message){
        if(typeof this[property] ==="undefined")
          return false;
        if(!this[property])
          this[property]="-"+message
        else
          this[property]=this[property] + "<br>-" + message
        if(!this.someSyncInProgress())
          this.proccessMessages()
      },
      messageNotificator:function(property,message){
        if(typeof this[property] ==="undefined")
          return false;
        if(typeof this[property] !=="undefined"){
          console.log(this[property])
          this[property]=null;
        }
      },
      collectSuccessMessages:function(message){
        this.messageCollector("successNotificationMessages",message)
      },
      collectErrorMessages:function(message){
        this.messageCollector("errorNotificationMessages",message)
      },
      collectCancelMessages:function(message){
        this.messageCollector("cancelNotificationMessages",message)
      },
      proccessMessages:function(){
        this.successNotification()
        this.errorNotification()
        this.cancelNotification()
      },
      successNotification:function(){
        this.messageNotificator("successNotificationMessages",message)
      },
      errorNotification:function(){
        this.messageNotificator("errorNotificationMessages",message)
      },
      cancelNotification:function(){
        this.messageNotificator("cancelNotificationMessages",message)
      },
      validator:function(){
        return true;
      },
      rowChanged:function(){
        this.$emit('row-changed', this.row);
      },
      rowsChanged:function(){
        this.$emit('rows-changed', this.rows);
      },
      refreshRow:function(row){
        this.row = row;
      },
      refreshRows:function(rows){
        this.rows = rows;
      },
      backToIndex:function(){
      },
      successRedirect:function(){
        this.cancelRedirect()
      },
      errorRedirect:function(){
      },
      cancelRedirect:function(){
        if(this.action.name!=="index" && typeof this.resource.actions.index !=="undefined")
            this.$router.push(this.actionPath("index"))
      },
      cancelAction:function(){
        this.collectCancelMessages(this.action.getSetCancelMessage()+this.actionKeyMessage(this.row))
        this.cancelRedirect()
      },
      actionKeyMessage:function(gridRow){
        if( typeof gridRow==="undefined" || 
            !gridRow || 
            typeof this.rowKey!=="undefined" || 
            typeof gridRow[this.rowKey]!=="undefined"
        )
          return " <b>";
        return " <b>"+this.rowKey+":"+gridRow[this.rowKey]+"</b>"
      },
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
      cRowKeyValue:function(){
        return this.$route.params.id || null;
      },
      cExcludeActions:function(){
        return this.cvExcludeActions || [];
      }
    },
    props:[
      "cvAction",
      "cvExcludeActions",
      "cvResource",
      "cvRow",
      "cvRows",
    ],
    created:function(){
      this.resource    = this.cResource;
      this.action      = this.cAction;
      this.rowKeyValue = this.cRowKeyValue;
    }
  }
</script>