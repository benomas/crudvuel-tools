import VueMirroring     from 'crudvuel-tools/src/mirroring/VueMirroring'
import CvSynchronizer   from 'crudvuel-tools/src/CvSynchronizer'
let cvSynchronizer = new CvSynchronizer()

export default {
  mixins: [
    new VueMirroring().fixProperties({
      '[P]staGenAction'          : null,
      '[P]dinGenExcludeActions'  : [],
      '[P]dinGenDisableFields'   : null,
      '[P]dinGenActionMode'      : 'route'
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
    }
  },

  methods: {
    mAutoFill () {
      let fields = Object.keys(this.cResource.lang.fields)

      if (this.row == null)
        this.$set(this,'row',{})

      if (this.cResource.filler != null){
        this.cResource.filler().then(row => {
          this.mSetRow({...row})
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
      if (!action) {
        if (typeof this.cpStaGenAction !== 'undefined')
          return this.cpStaGenAction
        return null
      }

      if (typeof action === 'string') {
        if (typeof this.mResourceAccessing(resource).actions[action] !== 'undefined')
          return this.mResourceAccessing(resource).actions[action]
        return null
      }

      return action
    },

    mResourceAccessing (resource = null) {
      if (!resource)
        return this.cResource

      if (typeof resource === 'string') {
        if (this.resources != null && this.resources[resource] != null)
          return this.resources[resource]
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

    mResorceAction (action = null,resource = null) {
      return this.mActionAccessing(action,resource)
    },

    mActionType (action = null,resource = null) {
      return this.mResorceAction(action,resource).type || null
    },

    mActionPath (action,row,resource = null) {
      return this.mResorceAction(action,resource).getFixedPath(row) || null
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

      return ` ${this.cKeyName} : ${gridRow[this.cKeyName]} `
    },

    mCompleteAction (data = null) {
      let successMessage = this.cpStaGenAction.getSetSuccessMessage()

      if (successMessage)
        this.mSuccessNotification(successMessage + this.actionKeyMessage(this.cdRow))

      return this.mFinish('completed',data)
    },

    mFailCompleteAction (response) {
      let errorMessage = this.cpStaGenAction.getSetErrorMessage() + ' ' + this.serverMessageTransform(response.response.data.message || '')

      if (errorMessage)
        this.mErrorNotification(errorMessage + this.actionKeyMessage(this.cdRow))

      return this
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

    mErrorResponse (response) {
      if (
        response != null && response.response != null  &&
        response.response.data != null  &&
        response.response.data.errors != null
      )
        return response.response.data.errors

      return null
    }
  }
}
