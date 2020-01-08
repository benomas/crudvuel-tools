<script>
  import CvActionContainer from './CvActionContainer'
  import CvSynchronizer    from '../../CvSynchronizer'
  import CvErrorWraper     from '../input-components/CvErrorWraper'
  import cvVueSetter       from '../../cvVueSetter'
  import {cvFixDotDepth}   from '../../cvHelper'
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
        infoNotificationMessages    : null,
        toggles                     : {},
        gridRefs                    : {}
      }
    },
    methods:{
      serverMessageTransform (message = ''){
        return message!==''?' Server:' + message:message
      },
      transformResponse (response){
        return response.data.data || response.data
      },
      getSuccess (response){
        if(this.action && this.action.type==="rows")
          this.rows=this.transformResponse(response)
        if(this.action && this.action.type==="row")
          this.row=this.transformResponse(response)
        this.setReady()
        if(this.cShowGetMessages)
          this.collectSuccessMessages(this.action.getGetSuccessMessage())
      },
      getError (response){
        this.setReady()
        if(this.cShowGetMessages)
          this.collectErrorMessages(this.action.getGetErrorMessage())
      },
      getParams (){
        return null
      },
      fixGetServiceParams (getParams=null,url=null,queryString=null) {
        return [
          ...(this.cHasRowIdentifier ? [this.rowKeyValue] : []),
          getParams||this.getParams(),
          url||null,
          queryString
        ]
      },
      dinamicGetService (...serviceParams){
        if(!this.resource || !this.cActionGetService)
          return false
        this.setUnReady()
        return this.cActionGetService(...this.fixGetServiceParams(...serviceParams))
      },
      getService (...serviceParams){
        this.dinamicGetService(...serviceParams).then(this.getSuccess).catch(this.getError)
      },
      setSuccess (response){
        if(this.action && this.action.type==="rows")
          this.rows=this.transformResponse(response)
        if(this.action && this.action.type==="row")
          this.row=this.transformResponse(response)
        this.setReady()
        if(this.cShowSetMessages)
          this.collectSuccessMessages(this.action.getSetSuccessMessage()+this.cIdentText)
        this.successRedirect()
      },
      setError (errorResponse){
        this.setReady()
        this.errors = {}
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
      setParams (){
        return this.action && this.action.type && this[this.action.type]?
          this[this.action.type]:null
      },
      fixSetServiceParams (setParams=null,url=null,queryString=null) {
        return [
          ...(this.cHasRowIdentifier ? [this.rowKeyValue] : []),
          setParams||this.setParams(),
          url||null,
          queryString
        ]
      },
      dinamicSetService (...serviceParams){
        if (!this.resource || !this.cActionSetService)
          return false

        if (!this.validator()) {
          if (this.cShowSetMessages)
            this.collectErrorMessages('No se han superado las validaciones del formulario')
          return false
        }

        this.setUnReady()
        this.errors = {}
        return this.cActionSetService(...this.fixSetServiceParams(...serviceParams))
      },
      setService (...serviceParams) {
        this.dinamicSetService(...serviceParams).then(this.setSuccess).catch(this.setError)
      },
      toSync (row,identifier){
        this.cvSynchronizer.toSync(row,this.cRowKey,identifier)
      },
      synchronized (row,identifier){
        this.cvSynchronizer.synchronized(row,this.cRowKey,identifier)
      },
      isSynchronizing (row,identifier){
        return this.cvSynchronizer.isSynchronizing(row,this.cRowKey,identifier)
      },
      validIdentifier (identifier){
        return this.cvSynchronizer.validIdentifier(identifier)
      },
      someSyncInProgress (){
        return this.cvSynchronizer.someSyncInProgress()
      },
      messageCollector (property,message){
        if(typeof this[property] ==="undefined")
          return false
        if(!this[property])
          this[property]="-"+message
        else
          this[property]=this[property] + ", -" + message
        if(!this.someSyncInProgress())
          this.proccessMessages()
      },
      messageNotificator (property,message){
        if(typeof this[property] ==="undefined")
          return false
        if(typeof this[property] !=="undefined")
          this[property]=null
      },
      collectSuccessMessages (message){
        this.messageCollector("successNotificationMessages",message)
      },
      collectErrorMessages (message){
        this.messageCollector("errorNotificationMessages",message)
      },
      collectCancelMessages (message){
        this.messageCollector("cancelNotificationMessages",message)
      },
      collectInfoMessages (message){
        this.messageCollector("infoNotificationMessages",message)
      },
      proccessMessages (){
        this.successNotification()
        this.errorNotification()
        this.cancelNotification()
        this.infoNotification()
      },
      successNotification (){
        this.messageNotificator("successNotificationMessages")
      },
      errorNotification (){
        this.messageNotificator("errorNotificationMessages")
      },
      cancelNotification (){
        this.messageNotificator("cancelNotificationMessages")
      },
      infoNotification (){
        this.messageNotificator("infoNotificationMessages")
      },
      validator (){
        return true
      },
      rowChanged (){
        this.$emit('row-changed', this.row)
      },
      rowsChanged (){
        this.$emit('rows-changed', this.rows)
      },
      refreshRow (row){
        this.row = row
      },
      refreshRows (rows){
        this.rows = rows
      },
      backToIndex (){
      },
      successRedirect (){
        this.cancelRedirect()
      },
      errorRedirect (){
      },
      cancelRedirect () {
        if (this.action.name !== 'index' && typeof this.resource.actions.index !== 'undefined') {
          let baseRoute = this.$route.path.split(this.actionPath('index'))
          this.$router.push(baseRoute[0] + this.actionPath('index'))
        }
      },
      cancelAction (){
        let cancelMessage = this.action.getSetCancelMessage()
        if(cancelMessage)
          this.collectCancelMessages(cancelMessage+this.actionKeyMessage(this.row))
        this.cancelRedirect()
      },
      actionKeyMessage (gridRow){
        if( typeof gridRow==="undefined" ||
            !gridRow ||
            typeof this.cRowKey==="undefined" ||
            typeof gridRow[this.cRowKey]==="undefined"
        )
          return ""
        return " \""+this.cRowKey+":"+gridRow[this.cRowKey]+"\""
      },
      nextTick (){
        return this.$nextTick()
      },
      mDinamicBooleanModel (dothProperty,value) {
        return cvFixDotDepth(this,dothProperty)
      },
      mDinamicBooleanSwitch (dothProperty,value = true) {
        return new Promise((resolve, reject) => {
          let dinamicModalModel = cvFixDotDepth(this,dothProperty,value)
          let timeOut = setTimeout(()=>{
            resolve(dinamicModalModel)
          }, 200)
        })
      },
      init () {

      }
    },
    computed:{
      cRows:function(){
        return this.cvRows || this.rows || null
      },
      cRow:function(){
        return this.cvRow  || this.row || null
      },
      cRowKey:function(){
        return this.cvRowKey || 'id'
      },
      cRowKeyRouteValue:function(){
        return this.$route.params.id  || null
      },
      cShowGetMessages:function(){
        return (this.cAction && typeof this.cAction.cvShowGetMessages !== "undefined")?
          this.cAction.cvShowGetMessages:false
      },
      cShowSetMessages:function(){
        return (this.cAction && typeof this.cAction.cvShowSetMessages !== "undefined")?
          this.cAction.cvShowSetMessages:true
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
      },
      cFileUrl: function () {
        return this.cvGlobDep.globals.cvEnv.apiUrl() + '/api/files'
      }
    },
    props:[
      "cvRow",
      "cvRows",
      "cvRowKey",
      "cvAutoload"
    ],
    created:function(){
      this.rowKey      = this.cRowKey
      this.rowKeyValue = this.cRowKeyRouteValue

      // Check for an active field, to set it 'true - 1' as default
      this.row = this.cResource != null &&
        this.cResource.lang != null &&
        this.cResource.lang.fields != null &&
        this.cResource.lang.fields.active != null?
        {active: 1}:{}
      // Call to init, this function helps to init props for components, example: toggle and checkboxes or whatever you want to pre-init
      this.init()
      if(this.cAutoFill){
        let fields = Object.keys(this.cResource.lang.fields)
        for (let i=0; i<fields.length; i++){
          if (this.row[fields[i]] ==  null)
            this.$set(this.row,fields[i],1)
        }
      }
    }
  }
</script>
