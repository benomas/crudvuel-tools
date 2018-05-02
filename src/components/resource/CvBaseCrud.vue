<script>
  import CvActionContainer from './CvActionContainer';
  import CvSynchronizer    from '../../CvSynchronizer';
  import CvErrorWraper     from '../input-components/CvErrorWraper';
  import cvVueSetter       from '../../cvVueSetter'
  export default{
    extends    : CvActionContainer,
    components : {
      CvErrorWraper
    },
    data (){
      return {
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
        cancelNotificationMessages  : null
      }
    },
    methods:{
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
      }
    },
    computed:{
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
      cShowGetMessages:function(){
        return (this.cAction && typeof this.cAction.cvShowGetMessages !== "undefined")?
          this.cAction.cvShowGetMessages:false;
      },
      cShowSetMessages:function(){
        return (this.cAction && typeof this.cAction.cvShowSetMessages !== "undefined")?
          this.cAction.cvShowSetMessages:true;
      },
      cHasRowKeyValue:function(){
        return this.cRow && this.cRow[this.cRowKey]
      },
      cReady : function () {
        return this.ready || false
      }
    },
    props:[
      "cvRow",
      "cvRows",
      "cvRowKey"
    ],
    created:function(){
      this.rowKey      = this.cRowKey;
      this.rowKeyValue = this.cRowKeyRouteValue;
    }
  }
</script>
