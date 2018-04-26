<template>
  <div
    class="row action-container"
  >
    <transition name="component-fade" mode="out-in">
      <cv-spinner v-if="!cReady && cIsMounted" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <div class="col-lg-12 action-label" v-if="cShowHeader">
      <label>
        {{action.label}}
      </label>
      <hr>
    </div>

    <slot
    >
    </slot>
  </div>
</template>
<script>
  import CvSynchronizer from '../../CvSynchronizer';
  import CvErrorWraper  from '../input-components/CvErrorWraper';
  import cvVueSetter    from '../../cvVueSetter'
  import CvSpinner         from '../grid-components/CvSpinner'
  export default{
    components: {
      CvErrorWraper,
      CvSpinner
    },
    data (){
      return {
        resource                    : null,
        action                      : null,
        rowKey                      : null,
        rowKeyValue                 : null,
        row                         : null,
        rows                        : null,
        ready                       : false,
        errors                      : {},
        hasErrors                   : false,
        cvSynchronizer              : new CvSynchronizer(),
        successNotificationMessages : null,
        errorNotificationMessages   : null,
        cancelNotificationMessages  : null,
        isMounted                   : false
      }
    },
    methods:{
      vueSetter(source){
        if(
            typeof source==="undefined" ||
            typeof source.row==="undefined" ||
            typeof source.cvColumnMap==="undefined"
        )
          return false;

        let mapKeys = Object.keys(source.cvColumnMap)
        for (let i=0; i<mapKeys.length; i++) {
          if(source.row && typeof source.row[mapKeys[i]]!=="undefined")
            this.$set(this.row, source.cvColumnMap[mapKeys[i]], source.row[mapKeys[i]])
          else
            this.$set(this.row, source.cvColumnMap[mapKeys[i]], null)
        }
      },
      getSuccess:function(response){
        if(this.action && this.action.type==="rows")
          this.rows=response.data.data || response.data;
        if(this.action && this.action.type==="row")
          this.row=response.data.data || response.data;
        this.ready=true;
        if(this.cShowGetMessages)
          this.collectSuccessMessages(this.action.getGetSuccessMessage())
      },

      getError:function(response){
        this.ready=true;
        if(this.cShowGetMessages)
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
        if(this.rowKeyValue)
          this.action.getService(this.rowKeyValue,getSuccess,getError,getParams,url,queryString)
        else
          this.action.getService(getSuccess,getError,getParams,url,queryString)
      },
      setSuccess:function(response){
        if(this.action && this.action.type==="rows")
          this.rows=response.data.data || response.data;
        if(this.action && this.action.type==="row")
          this.row=response.data.data || response.data;
        this.ready=true;
        let currentRowIdent=""
        if(this.rowKeyValue)
          currentRowIdent = this.actionKeyMessage(this.row)
        if(this.cShowSetMessages)
          this.collectSuccessMessages(this.action.getSetSuccessMessage()+currentRowIdent)
        this.successRedirect()
      },
      setError:function(errorResponse){
        this.ready=true;
        //cvVueSetter(this.$set,this.error,errorResponse.response.data.errors || {})
        if (
          typeof errorResponse!=='undefined' &&
          typeof errorResponse.response!=='undefined'  &&
          typeof errorResponse.response.data!=='undefined'  &&
          typeof errorResponse.response.data.errors!=='undefined'
        )
          this.errors = errorResponse.response.data.errors
        else
          this.errors = {};
        //console.log(this.errors);
        let currentRowIdent=""
        if(this.rowKeyValue)
          currentRowIdent = this.actionKeyMessage(this.row)
        if(this.cShowSetMessages)
          this.collectErrorMessages(this.action.getSetErrorMessage()+currentRowIdent)
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
          if(this.cShowSetMessages)
            this.collectErrorMessages('No se han superado las validaciones del formulario')
          return
        }

        this.ready=false;
        this.errors = {};
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
        return this.cExcludeActions.indexOf(action)<0 &&
          this.resorceAction(action) &&
          this.hasActionPermission(this.resource.actions[action])
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
        this.cvSynchronizer.toSync(row,this.cRowKey,identifier);
      },
      synchronized:function(row,identifier){
        this.cvSynchronizer.synchronized(row,this.cRowKey,identifier);
      },
      isSynchronizing:function(row,identifier){
        return this.cvSynchronizer.isSynchronizing(row,this.cRowKey,identifier);
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
          this[property]=this[property] + ", -" + message
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
        this.messageNotificator("successNotificationMessages")
      },
      errorNotification:function(){
        this.messageNotificator("errorNotificationMessages")
      },
      cancelNotification:function(){
        this.messageNotificator("cancelNotificationMessages")
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
            this.$router.push("../../"+this.actionPath("index"))
      },
      cancelAction:function(){
        let cancelMessage = this.action.getSetCancelMessage()
        if(cancelMessage)
          this.collectCancelMessages(cancelMessage+this.actionKeyMessage(this.row))
        this.cancelRedirect()
      },
      actionKeyMessage:function(gridRow){
        if( typeof gridRow==="undefined" ||
            !gridRow ||
            typeof this.cRowKey==="undefined" ||
            typeof gridRow[this.cRowKey]==="undefined"
        )
          return "";
        return " \""+this.cRowKey+":"+gridRow[this.cRowKey]+"\""
      },
    },
    computed:{
      cAction:function(){
        return this.cvAction || null;
      },
      cResource:function(){
        return (this.cAction && this.cAction.resource)? this.cAction.resource:null;
      },
      cRows:function(){
        return this.cvRows || this.rows || null;
      },
      cRow:function(){
        return this.cvRow  || this.row || null;
      },
      cRowKey:function(){
        return this.cvRowKey || 'id';
      },
      cRowKeyRouteValue:function(){
        return this.$route.params.id  || null;
      },
      cExcludeActions:function(){
        return this.cvExcludeActions || [];
      },
      cShowGetMessages:function(){
        return (this.cAction && typeof this.cAction.cvShowGetMessages !== "undefined")?
          this.cAction.cvShowGetMessages:false;
      },
      cShowSetMessages:function(){
        return (this.cAction && typeof this.cAction.cvShowSetMessages !== "undefined")?
          this.cAction.cvShowSetMessages:true;
      },
      cDisableFields:function(){
        return this.cvDisableFields || this.cAction.disableFields || false;
      },
      cHasRowKeyValue:function(){
        return this.cRow && this.cRow[this.cRowKey]
      },
      cGetted:function(){
        return this.cRows || !this.cAction.getService  || this.cHasRowKeyValue || false;
      },
      cShowHeader:function(){
        if(typeof this.cvShowHeader!=='undefined')
          return this.cvShowHeader
        return true
      },
      cReady : function () {
        return this.ready || false
      },
      cIsMounted: function () {
        return this.isMounted || false
      },
      cSelfRef :  function () {
        return this
      }
    },
    props:[
      "cvAction",
      "cvExcludeActions",
      "cvRow",
      "cvRows",
      "cvDisableFields",
      "cvRowKey",
      "cvShowHeader"
    ],
    created:function(){
      this.resource    = this.cResource;
      this.action      = this.cAction;
      this.rowKey      = this.cRowKey;
      this.rowKeyValue = this.cRowKeyRouteValue;
    },
    mounted: function () {
      this.isMounted = true
    }
  }
</script>
<style lang="scss">
  .action-container{
    padding:20px 30px;
  }
  .action-label{
    width: 100%;
    text-align:center;
    & label{
      font-weight: bold;
    }
    & hr{
        border: 0;
        border-top: 1px solid #CCCCCC;
    }
  }
</style>
