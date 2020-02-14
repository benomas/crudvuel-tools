import VueMirroring     from 'crudvuel-tools/src/mirroring/VueMirroring'
import CvSynchronizer   from 'crudvuel-tools/src/CvSynchronizer'
let cvSynchronizer = new CvSynchronizer()
let vueMirroring   = new VueMirroring()
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]staGenAction'         : null,
      '[P]dinGenExcludeActions' : [],
      '[P]dinGenDisableFields'  : null,
    })
  ],
  components : {
  },
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
      for (let i = 0; i < fields.length; i++)
        if (this.row[fields[i]] ==  null)
          this.$set(this.row,fields[i],1)
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
    rLang (source,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      return lResource ? this.$tc('crudvuel.resources.' + lResource.name + '.' + source) : null
    },
    fLang (field,resource = null) {
      return this.rLang('fields.' + field,resource)
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
    mFinish () {
    },
    mFailInitializeNotification () {
      return new Promise((resolve, reject) => {
        console.log('action fail')
        this.$nextTick(() => {
          resolve()
        })
      })
    },
    defInputProps (field,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      let def =  {
        'float-label'    : lResource ? this.fLang(field,lResource) : null,
        'label'          : lResource ? this.fLang(field,lResource) : null,
        'clearable'      : 'clearable',
        'readonly'       : this.cDisableFields,
        'disable'        : this.cDisableFields,
        'hide-underline' : this.cDisableFields,
        'clear-icon'     : 'fas fa-times-circle',
        'class'          : 'w-100',
        'error'          : this.cvErr(this.errors,field,'boolean'),
        'error-message'  : this.cvErr(this.errors,field),
        'no-error-icon'  : true,
        'ref'            : `row.${field}`
        //'loading'   : !this.cReady,
      }
      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon
      return def
    },
    defErrorInputProps (field,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      let def =  {
        'error'         : this.cvErr(this.errors,field,'boolean'),
        'error-message' : this.cvErr(this.errors,field),
        'no-error-icon' : true
      }
      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon
      return def
    },
    defMatcherizerProps (resource = null,snakeResource = null) {
      let lResource = this.mResourceAccessing(resource)
      return {
        'cv-source-service'      : lResource.crudServices.index || null,
        'cv-source-label'        : lResource.rowLabel || null,
        'cv-search-label'        : lResource.rowLabel || null,
        'cv-disable-fields'      : this.cDisableFields,
        'cv-search-icon'         : lResource.icon || null,
        'cv-parent-ref'          : this.cSelfRef || null,
        'clear-icon'             : 'fas fa-times-circle',
        'class'                  : 'w-100',
        'cv-filter-query'        : {'cv_search': ''},
        'cv-order-by'            : 'cv_search',
        'cv-label-call-back'     : (rows,row) => { return row['cv_search'] },
        'cv-list-of-items-limit' : '10',
        ...(snakeResource ? {
          'ref'              : `row.${snakeResource}_id`,
          'cv-select-query'  : {'id': `${snakeResource}_id`,'cv_search': `${snakeResource}_cv_search`},
          'cv-current-value' : this.row[`${snakeResource}_id`],
          'cv-current-label' : this.row[`${snakeResource}_cv_search`]
        } : {})
      }
    },
    validator () {
      return true
    },
    mCancelAction () {
      let cancelMessage = this.cpStaGenAction.getSetCancelMessage()
      if (cancelMessage)
        this.mCancelNotification(cancelMessage + this.actionKeyMessage(this.cdRow))
      this.mFinish()
    },
    actionKeyMessage (gridRow = null) {
      if (gridRow == null || this.cKeyName == null || gridRow[this.cKeyName] == null)
        return ''
      return ` ${this.cKeyName} : ${gridRow[this.cKeyName]} `
    },
    mCompleteAction () {
      let successMessage = this.cpStaGenAction.setSuccessMessage()
      if (successMessage)
        this.mSuccessNotification(successMessage + this.actionKeyMessage(this.cdRow))
      this.mFinish()
      return this
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
    }
  }
}
