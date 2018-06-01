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
        cancelNotificationMessages  : null,
        infoNotificationMessages    : null
      }
    },
    methods:{
      serverMessageTransform: function (message = ''){
        if (message!=='')
          return ' Server:' + message
        return ''
      },
      transformResponse: function (response){
        return response.data.data || response.data
      },
      getSuccess:function(response){
        if(this.action && this.action.type==="rows")
          this.rows=this.transformResponse(response);
        if(this.action && this.action.type==="row")
          this.row=this.transformResponse(response);
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
      fixGetServiceParams: function (getSuccess=null,getError=null,getParams=null,url=null,queryString=null) {
        return [
          ...(this.cHasRowIdentifier ? [this.rowKeyValue] : []),
          getSuccess||this.getSuccess,
          getError||this.getError,
          getParams||this.getParams(),
          url||null,
          queryString
        ]
      },
      getService:function(...serviceParams){
        if(!this.resource || !this.cActionGetService)
          return false;
        this.ready = false;
        this.cActionGetService(...this.fixGetServiceParams(...serviceParams))
      },
      setSuccess:function(response){
        if(this.action && this.action.type==="rows")
          this.rows=this.transformResponse(response);
        if(this.action && this.action.type==="row")
          this.row=this.transformResponse(response);
        this.ready=true;
        if(this.cShowSetMessages)
          this.collectSuccessMessages(this.action.getSetSuccessMessage()+this.cIdentText)
        this.successRedirect()
      },
      setError:function(errorResponse){
        this.ready=true;
        this.errors = {};
        if (
          typeof errorResponse!=='undefined' &&
          typeof errorResponse.response!=='undefined'  &&
          typeof errorResponse.response.data!=='undefined'  &&
          typeof errorResponse.response.data.errors!=='undefined'
        )
          this.errors = errorResponse.response.data.errors

        if(this.cShowSetMessages)
          this.collectErrorMessages(this.action.getSetErrorMessage()+this.cIdentText + this.serverMessageTransform(errorResponse.response.data.message || ''))
        this.errorRedirect()
      },
      setParams:function(){
        return this.action && this.action.type && this[this.action.type]?
          this[this.action.type]:null
      },
      fixSetServiceParams: function (setSuccess=null,setError=null,setParams=null,url=null,queryString=null) {
        return [
          ...(this.cHasRowIdentifier ? [this.rowKeyValue] : []),
          setSuccess||this.setSuccess,
          setError||this.setError,
          setParams||this.setParams(),
          url||null,
          queryString
        ]
      },
      setService: function (...serviceParams) {
        if (!this.resource || !this.cActionSetService)
          return false

        if (!this.validator()) {
          if (this.cShowSetMessages)
            this.collectErrorMessages('No se han superado las validaciones del formulario')
          return false
        }

        this.ready  = false
        this.errors = {}
        this.cActionSetService(...this.fixSetServiceParams(...serviceParams))
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
      collectInfoMessages:function(message){
        this.messageCollector("infoNotificationMessages",message)
      },
      proccessMessages:function(){
        this.successNotification()
        this.errorNotification()
        this.cancelNotification()
        this.infoNotification()
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
      infoNotification:function(){
        this.messageNotificator("infoNotificationMessages")
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
      },
      cAutoload : function () {
        if(typeof this.cvAutoload !== 'undefined')
          return this.cvAutoload
        return true
      },
      cActionGetService: function () {
        return this.action.getService || null
      },
      cActionSetService: function () {
        return this.action.setService || null
      },
      cHasRowIdentifier: function () {
        return this.rowKeyValue || false
      },
      cIdentText: function () {
        return this.cHasRowIdentifier ? this.actionKeyMessage(this.row) : ''
      },
      cExportHeaders: function () {
        return this.services.general.cvComunicator.shareHeaders() || {}
      },
      cRelBaseUrl: function () {
        return this.resource.crudServices.getRelBaseUrl() || ''
      },
      cAbsBaseUrl: function () {
        return this.resource.crudServices.getAbsBaseUrl() || ''
      }
    },
    props:[
      "cvRow",
      "cvRows",
      "cvRowKey",
      "cvAutoload"
    ],
    created:function(){
      this.rowKey      = this.cRowKey;
      this.rowKeyValue = this.cRowKeyRouteValue;

      // Check for an active field, to set it 'true - 1' as default
      this.row = this.cResource !=null &&
        this.cResource.lang !=null &&
        this.cResource.lang.fields !=null &&
        this.cResource.lang.fields.active !=null?
        {active: 1}:{}
      // Call to init, this function helps to init props for components, example: toggle and checkboxes or whatever you want to pre-init
      if(typeof this.init === 'function') this.init()
    }
  }
</script>
