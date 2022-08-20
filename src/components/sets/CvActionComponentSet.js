import VueMirroring           from 'crudvuel-tools/src/mirroring/VueMirroring'
import CvSynchronizer         from 'crudvuel-tools/src/CvSynchronizer'
import CvRowServiceCaller     from 'crudvuel-tools/src/network/CvRowServiceCaller'
import CvRowsServiceCaller    from 'crudvuel-tools/src/network/CvRowsServiceCaller'
import {get}                  from 'lodash'
let cvSynchronizer = new CvSynchronizer()

export default {
  mixins: [
    new VueMirroring().fixProperties({
      '[P]staGenAction'         : null,
      '[P]dinGenActionParams'   : null,
      '[P]dinGenExcludeActions' : [],
      '[P]dinGenDisableFields'  : null,
      '[P]dinGenActionMode'     : 'route'
    })
  ],

  computed: {
    cDisableFields () {
      if (this.cpDinGenDisableFields != null)
        return this.cpDinGenDisableFields

      return (this.cpStaGenAction && this.cpStaGenAction.disableFields) || false
    },

    cResource () {
      return (this.cpStaGenAction && this.cpStaGenAction.resource) ? this.cpStaGenAction.resource : null
    },

    cKeyName () {
      if (this.cResource == null || this.cResource.keyName == null)
        return 'id'

      return this.cResource.keyName
    },

    cpActionGetService () {
      return this.cpStaGenAction.getService || function () {
        new Promise((resolve, reject) => {
          console.log('No get service defined')
          reject(new Error('No get service defined'))
        })
      }
    },

    cpActionSetService () {
      return this.cpStaGenAction.setService || function () {
        new Promise((resolve, reject) => {
          console.log('No set service defined')
          reject(new Error('No set service defined'))
        })
      }
    },

    cHasActiveField () {
      if (
        this.cResource == null ||
        this.cResource.lang == null ||
        this.cResource.lang.fields == null ||
        this.cResource.lang.fields.active == null
      )
        return false

      return true
    },

    cResourceName () {
      return this.cResource != null ? this.cResource.name : null
    }
  },

  methods: {
    mAutoFill () {
      let fields = Object.keys(this.cResource.lang.fields)

      if (this.row == null)
        this.$set(this,'row',{})

      if (this.cResource.filler != null){
        this.mSetDisableActionReady(true)
        this.cResource.filler().then(row => {
          this.mSetRow({...row})
          this.mSetDisableActionReady(false)
        })
      }
      else{
        for (let i = 0; i < fields.length; i++)
          if (this.row[fields[i]] ==  null)
            this.$set(this.row,fields[i],1)
      }

      return this
    },

    mClearRow () {
      this.$set(this,'row',{})

      return this
    },

    mActionAccessing (action = null,resource = null) {
      let fixedResource = null

      if (action == null) {
        if (typeof this.cpStaGenAction !== 'undefined')
          return this.cpStaGenAction

        return null
      }

      if (typeof action === 'string') {
        let actionSegments = action.split('.')

        if(actionSegments.length === 2){
          fixedResource = actionSegments[0]
          action        = actionSegments[1]
        }

        fixedResource = fixedResource != null ?
          this.mResourceAccessing(fixedResource):
          this.mResourceAccessing(resource)

        if (
          fixedResource == null ||
          fixedResource.actions == null ||
          fixedResource.actions[action] == null
        )
          return null

        return fixedResource.actions[action]
      }

      return action
    },

    mResourceAccessing (resource = null) {
      if (resource == null){
        if (this.cResource != null)
          return this.cResource

        if (this.cpStaInsResource != null)
          return this.cpStaInsResource

        return null
      }

      if (typeof resource === 'string') {
        if (this.cResources != null && this.cResources[resource] != null)
          return this.cResources[resource]

        return null
      }

      return resource
    },

    mServicesAccessing (resource = null,action = null, serviceName = null) {
      if (resource == null || action == null)
        return null

      resource = this.mResourceAccessing(resource)

      if ( resource == null || resource.actions[action] == null)
        return null

      serviceName = serviceName ? serviceName : 'getService'

      return resource.actions[action][serviceName] == null ? null : resource.actions[action][serviceName]
    },

    mrLang (source,resource = null) {
      let lResource = this.mResourceAccessing(resource)

      return lResource ? this.$tc('crudvuel.resources.' + lResource.name + '.' + source) : null
    },

    mfLang (field,resource = null) {
      return this.mrLang('fields.' + field,resource)
    },

    mDepthLang (path = '') {
      let rootLang = this.cI18n.messages[this.cI18n.locale]

      return get(rootLang,path)
    },

    mResourceAction (action = null,resource = null) {
      return this.mActionAccessing(action,resource)
    },

    //bad identifier name, to be deprecated
    mResorceAction (action = null,resource = null) {
      return this.mActionAccessing(action,resource)
    },

    mActionType (action = null,resource = null) {
      return this.mResourceAction(action,resource).type || null
    },

    mActionPath (action,row,resource = null) {
      let fixedAction = this.mResourceAction(action,resource)

      if (!fixedAction)
        return ''

      return fixedAction.getFixedPath(row) || null
    },

    mFinish (status = 'completed',data = null) {
      return this
    },

    mFailInitializeNotification () {
      return new Promise((resolve, reject) => {
        console.log('action fail')
        this.$nextTick(() => {
          resolve()
        })
      })
    },

    mCancelAction () {
      let cancelMessage = this.cpStaGenAction.getSetCancelMessage()

      if (cancelMessage)
        this.mCancelNotification(cancelMessage + this.actionKeyMessage(this.cdRow))

      this.mFinish('canceled')
    },

    actionKeyMessage (gridRow = null) {
      if (gridRow == null || this.cKeyName == null || gridRow[this.cKeyName] == null)
        return ''

      if(gridRow['cv_search'] != null)
        return ` (${gridRow['cv_search']}) `

      return ` ${this.cKeyName} : ${gridRow[this.cKeyName]} `
    },

    mCompleteAction (data = null) {
      let successMessage = this.cpStaGenAction.getSetSuccessMessage()

      if (successMessage)
        this.mSuccessNotification(successMessage + this.actionKeyMessage(this.cdRow))

      return this.mFinish('completed',data)
    },

    mFailCompleteAction (response, customActionMessage = null) {
      let errorMessage = customActionMessage != null ? customActionMessage:this.cpStaGenAction.getSetErrorMessage()

      errorMessage = `${errorMessage} ${this.serverMessageTransform(this.mMessageErrorResponse(response) || '')}`

      if (errorMessage)
        this.mErrorNotification(errorMessage + this.actionKeyMessage(this.cdRow))

      return this
    },

    mFailCompleteActionThen (response, customActionMessage = null) {
      let errorMessage = customActionMessage != null ? customActionMessage:this.cpStaGenAction.getSetErrorMessage()

      errorMessage = `${errorMessage} ${this.serverMessageTransform(this.mMessageErrorResponse(response) || '')}`

      if (errorMessage)
        this.mErrorNotification(errorMessage + this.actionKeyMessage(this.cdRow))

      return response
    },

    serverMessageTransform (message = ''){
      let serverLang = this.$tc('crudvuel.labels.serverLang')

      if (!serverLang || serverLang === '')
        serverLang = 'Server'

      return message !== '' ? ` [${serverLang}] : ${message}` : message
    },

    mToSync (row,identifier){
      cvSynchronizer.toSync(row,this.cKeyName,identifier)

      return this
    },

    mSynchronized (row,identifier){
      cvSynchronizer.synchronized(row,this.cKeyName,identifier)
      this.emStaGenMsyncEmitter()

      return this
    },

    mIsSynchronizing (row,identifier){
      return cvSynchronizer.isSynchronizing(row,this.cKeyName,identifier)
    },

    mValidIdentifier (identifier){
      return cvSynchronizer.validIdentifier(identifier)
    },

    mSomeSyncInProgress (){
      return cvSynchronizer.someSyncInProgress()
    },

    mIndexResponse (response) {
      if  (response.data.count != null)
        return {rows:response.data.data,count:response.data.count}

      if  (response.count != null)
        return {rows:response.data,count:response.count}

      return {rows:[],count:0}
    },

    mShowResponse (response) {
      return response.data.data || response.data
    },

    mSolveAsIndexResponse(rows=[]) {
      if (rows == null)
        return {data:[],count:0}

      return {data:rows,count:rows.length}
    },

    mPropertyErrorResponse (response,property=null) {
      if (response == null)
        return null

      let data = null

      if (response.response != null && response.response.data != null)
        data = response.response.data
      else{
        if(response.data == null)
          return null

        data = response.data
      }

      if (property == null)
        return data

      if(data[property] == null)
        return null

      return data[property]
    },

    mErrorResponse (response) {
      let errors = this.mPropertyErrorResponse(response,'errors')

      if(errors == null)
        return {}

      return errors
    },

    mMessageErrorResponse (response) {
      return this.mPropertyErrorResponse(response,'message')
    },

    mActionResourceName (actionName = '') {
      if(!this.mActionAccessing(actionName))
        return ''

      return this.mActionAccessing(actionName).getResourceActionName()
    },

    mActionGetRowServiceBuilder () {
      let endPoint = this.cpStaGenAction.getService || function () {
        new Promise((resolve, reject) => {
          console.log('No get service defined')
          reject(new Error('No get service defined'))
        })
      }

      let cvRowServiceCaller =  new CvRowServiceCaller()

      if (this.cdDinGenKeyValue != null){
        cvRowServiceCaller.setId(this.cdDinGenKeyValue)
      }else{
        if (this.cdKeyValue != null)
          cvRowServiceCaller.setId(this.cdKeyValue)
      }

      return cvRowServiceCaller.setEndPoint(endPoint)
    },

    mActionSetRowServiceBuilder () {
      let endPoint = this.cpStaGenAction.setService || function () {
        new Promise((resolve, reject) => {
          console.log('No get service defined')
          reject(new Error('No get service defined'))
        })
      }

      let cvRowServiceCaller =  new CvRowServiceCaller()

      if (this.cdDinGenKeyValue != null)
        cvRowServiceCaller.setId(this.cdDinGenKeyValue)

      if (this.cdRow != null)
        cvRowServiceCaller.setParams(this.cdRow)

      return cvRowServiceCaller.setEndPoint(endPoint)
    },

    mActionGetRowsServiceBuilder () {
      let endPoint = this.cpStaGenAction.getService || function () {
        new Promise((resolve, reject) => {
          console.log('No get service defined')
          reject(new Error('No get service defined'))
        })
      }

      let cvRowsServiceCaller =  new CvRowsServiceCaller()

      if (this.mPaginator != null)
        cvRowsServiceCaller.setQString(this.mPaginator())

      return cvRowsServiceCaller.setEndPoint(endPoint)
    },

    mActionSetRowsServiceBuilder () {
      let endPoint = this.cpStaGenAction.getService || function () {
        new Promise((resolve, reject) => {
          console.log('No get service defined')
          reject(new Error('No get service defined'))
        })
      }

      let cvRowsServiceCaller =  new CvRowsServiceCaller()

      if (this.mPaginator != null)
        cvRowsServiceCaller.setQString(this.mPaginator())

      if (this.cdRows != null)
        cvRowsServiceCaller.setParams(this.cdRows)

      return cvRowsServiceCaller.setEndPoint(endPoint)
    }

  }
}
