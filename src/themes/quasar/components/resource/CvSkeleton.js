import CvComponentSet                                 from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import CvSingleRowComponentSet                        from 'crudvuel-tools/src/themes/quasar/components/sets/CvSingleRowComponentSet'
import CvResourceComponentSet                         from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentSet'
import CvNotifyComponentSet                           from 'crudvuel-tools/src/themes/quasar/components/sets/CvNotifyComponentSet'
import CvNotifyComponentExtraSet                      from 'crudvuel-tools/src/themes/quasar/components/sets/CvNotifyComponentExtraSet'
import cvError                                        from 'crudvuel-tools/src/directives/cvError'
import {camelCase,snakeCase,isFinite,toNumber,split}  from 'lodash'

import {
  QEditor,
  QItem,
  QInput,
  QItemLabel,
  QField,
  QToggle,
  QSlider,
  QBtnToggle,
  QBtn,
  QBanner
}  from 'quasar'

export default {
  mixins: [
    CvComponentSet,
    CvSingleRowComponentSet,
    CvResourceComponentSet,
    CvNotifyComponentSet,
    CvNotifyComponentExtraSet
  ],

  data () {
    return {
      fieldControllers: {}
    }
  },

  props: [
    'cvSegment',
    'cvRow',
    'cvErrors',
    'cvQuitFields',
    'cvReadOnlyFields'
  ],

  computed: {
    cSegment () {
      if (this.cvSegment == null) {
        if (this.cpStaInsResource && this.cpStaInsResource.singularName != null)
          return this.cpStaInsResource.singularName

        return 'row'
      }

      return this.cvSegment
    },

    cRow () {
      if (this.cvRow == null)
        return {}

      if (this.cSegment == null || this.cSegment === '*')
        return this.cvRow

      let segments = split(this.cSegment,'.')
      let row = this.cvRow

      for (const segment of segments) {
        if (row[segment] == null)
          return {}
        row = row[segment]
      }

      return row
    },

    cErrors () {
      if (this.cvErrors != null && this.cSegment !== '*')
        return this.cvErrors[this.cSegment] != null ? {...this.cvErrors[this.cSegment],...this.cdLocalError} : {}

      return {...this.cvErrors,...this.cdLocalError}
    },

    cMatcherizerConditional () {
      if (this.cRow == null)
        return false

      if (this.cdDinGenKeyValue == null)
        return true

      return this.cRow[this.cpDinGenKeyName] != null
    },

    cPreviusField () {
      return this.cvPreviusField
    },

    cNextField () {
      return this.cvNextField
    },

    cSkeletonName () {
      if (this.cpStaInsResource && this.cpStaInsResource.singularName != null)
        return this.cpStaInsResource.singularName

      return ''
    },

    cResourceName: function () {
      return this.cResource != null ? this.cResource.name : null
    },

    cTabSize () {
      if (this.cTabCount == null || this.cTabCount === 0)
        return 100

      return 100 / this.cTabCount
    },

    cActionName () {
      if (this.cpStaGenAction == null || this.cpStaGenAction.name == null)
        return null

      return this.cpStaGenAction.name
    }
  },

  components: {
    QItem,
    QInput,
    QItemLabel,
    QField,
    QToggle,
    QSlider,
    QBtnToggle,
    QBtn,
    QBanner,
    QEditor
  },

  directives: {
    cvError
  },

  methods: {
    mDirectInput (field,value) {
      let uid = this._uid

      this.emDinGenRowEmitter({row: {[field]: value},uid,inputSource: this.mInputSource(field)})
    },

    mArraySwitchData (field, value) {
      if (typeof this.cRow[field] !== 'object') return

      let data = []
      let found = false

      for (const val of this.cRow[field]) {
        if (val !==  value) {
          data.push(val)
        } else {
          found = true
        }
      }

      if (!found)
        data.push(value)

      this.mDirectInput(field, data)
    },

    mEditorBinding (field,resource = null) {
      let lResource = resource

      if (!lResource)
        lResource = this.cpStaInsResource

      let def =  {
        'value'         : this.cRow[field] != null ? this.cRow[field] : '',
        //'readonly'      : this.cDisableFields,
        //'disable'       : this.cDisableFields,
        'error'         : this.cvErr(this.cErrors,field,'boolean'),
        'error-message' : this.cvErr(this.cErrors,field),
        'ref'           : this.mInputReffer(field)
      }

      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon

      return def
    },

    mEditorOns (field) {
      let uid = this._uid

      return {
        'input': (value) => {
          this.emDinGenRowEmitter({row: {[field]: value},uid,inputSource: this.mInputSource(field)})
        }
      }
    },

    mInputBinding (field,resource = null,localBindins = {}) {
      let lResource = resource

      if (!lResource)
        lResource = this.cpStaInsResource

      let floatLabel = localBindins['float-label'] != null ? localBindins['float-label']
        : lResource ? this.mfLang(field,lResource) : null
      let label = localBindins['label'] != null ? localBindins['label']
        : lResource ? this.mfLang(field,lResource) : null

      let def =  {
        'dense'          : true,
        'value'          : this.cRow[field] != null ? this.cRow[field] : null,
        'outlined'       : true,
        'float-label'    : floatLabel,
        'label'          : label,
        'clearable'      : !this.cDisableFields,
        'readonly'       : this.cDisableFields,
        //'disable'        : this.cDisableFields,
        'hide-underline' : this.cDisableFields,
        'clear-icon'     : 'fas fa-times-circle',
        'class'          : 'w-100',
        'error'          : this.cvErr(this.cErrors,field,'boolean'),
        'error-message'  : this.cvErr(this.cErrors,field),
        'no-error-icon'  : true,
        'ref'            : this.mInputReffer(field)
      }

      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon

      return def
    },

    mInputOns (field,resource = null,localOns = {}) {
      let uid = this._uid
      return {
        ...{
          'input': (value) => {
            this.emDinGenRowEmitter({row: {[field]: value},uid,inputSource: this.mInputSource(field)})
          },
          ...localOns
        }
      }
    },

    mToogleTittleBinding (field,resource = null,localBindins = {},row = null) {
      let bgColor = 'bg-positive'
      row = row || this.cRow

      if (row[field] == null)
        bgColor = 'bg-grey'
      else
      if (!row[field])
        bgColor = 'bg-negative'

      return {
        ...{
          'class': {[bgColor]: true,'f-bold rounded-borders txt-white': true}
        },
        ...localBindins
      }
    },

    mToogleBinding (field,resource = null,localBindins = {}) {
      let lResource = resource

      if (!lResource)
        lResource = this.cpStaInsResource

      let floatLabel = localBindins['float-label'] != null ? localBindins['float-label']
        : lResource ? this.mfLang(field,lResource) : null
      let label = localBindins['label'] != null ? localBindins['label']
        : lResource ? this.mfLang(field,lResource) : null

      let def =  {
        'value'          : this.cRow[field] != null ? this.cRow[field] : null,
        'outlined'       : true,
        'float-label'    : floatLabel,
        'label'          : label,
        'clearable'      : 'clearable',
        'readonly'       : this.cDisableFields,
        'disable'        : this.cDisableFields,
        'hide-underline' : this.cDisableFields,
        'clear-icon'     : 'fas fa-times-circle',
        'class'          : 'm-auto',
        'error'          : this.cvErr(this.cErrors,field,'boolean'),
        'error-message'  : this.cvErr(this.cErrors,field),
        'no-error-icon'  : true,
        'ref'            : this.mInputReffer(field),
        'left-label'     : true,
        'true-value'     : 1,
        'false-value'    : 0,
        'color'          : 'white'
      }

      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon

      return {...def,...localBindins}
    },

    mToogleOns (field,localOns = {}) {
      let uid = this._uid

      return {
        ...{
          'input': (value) => {
            this.emDinGenRowEmitter({row: {[field]: value},uid,inputSource: this.mInputSource(field)})
          }
        },
        ...localOns
      }
    },

    mErrorBinding (field,resource = null) {
      let lResource = resource

      if (!lResource)
        lResource = this.cpStaInsResource

      let def =  {
        'error'         : this.cvErr(this.cErrors,field,'boolean'),
        'error-message' : this.cvErr(this.cErrors,field),
        'no-error-icon' : true,
        'borderless'    : true
      }

      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon

      return def
    },

    mMatcherizerBinding (field = null,config = null,localBindins = {},componentTag = null) {
      if (!field)
        return {}

      componentTag = componentTag || 'cv-matcherizer'
      let extraBindins  = {}
      let customBindins = {...this.mCustomBindins(componentTag)}

      if (config) {
        if (config.preselect != null)
          extraBindins['cv-sta-insf-matcherizer-simple-filter-search'] = this.cRow[config.preselect] != null ? this.cRow[config.preselect] : null

        if (config.forcedPreselect != null)
          extraBindins['cv-sta-insf-matcherizer-simple-filter-search'] = config.forcedPreselect
      }

      extraBindins['ref'] = this.mInputReffer(field)
      let localCvDinGenDisableFields = false

      if (localBindins['cv-din-gen-disable-fields'] != null && localBindins['cv-din-gen-disable-fields'])
        localCvDinGenDisableFields = true

      extraBindins['cv-din-gen-disable-fields'] = localCvDinGenDisableFields ? true : this.cDisableFields

      for (const [key, value] of Object.entries(localBindins)) {
        if (customBindins[key] == null)
          customBindins[key] = value
      }

      return {...customBindins,...extraBindins}
    },

    mMatcherizerOns (field = null,map = null,localOns = {},componentTag = null) {
      if (!field)
        return {}

      componentTag = componentTag || 'cv-matcherizer'
      let jumpTo = localOns['jump-to'] != null ? localOns['jump-to'] : null
      let moreOns = {}

      if (map) {
        moreOns['em-sta-ins-current-item-event'] = (data) => {
          let subData = {row: {}}
          subData['resource'] = data.resource != null ? data.resource : 'anonymous'

          for (const [from, to] of Object.entries(map)) {
            if (data.row[from] !== undefined)
              subData.row[to] = data.row[from]
            else
              subData.row[from] = to
          }

          subData['uid']         = this._uid
          subData['inputSource'] = this.mInputSource(field)
          this.emDinGenRowEmitter(subData)
          if (jumpTo)
            this.mDelayer(50).then(() => {
              this.mMatcherizerFocus(jumpTo)
            })
        }

        moreOns['em-din-gen-reset-event'] = () => {
          this.mResetCalBack({
            inputSource : this.mInputSource(field),
            uid         : this._uid,
            resource    : 'anonymous'
          },map)
        }
      }

      return {...this.mOns(componentTag),...moreOns}
    },

    mRelatedToFrom (fields = '') {
      const found = [...fields.matchAll(/(.+)?-to-(.+)$/gi)]

      if (!found || found[0] == null || found[0][1] == null || found[0][2] == null)
        return null

      return {from: found[0][1],to: found[0][2]}
    },

    mRelationatorBinding (field = null,componentTag = null,localBindins = {}) {
      if (!field)
        return {}

      let resources = this.mRelatedToFrom(field)

      if (!resources)
        return {}

      componentTag  = componentTag || 'cv-relationator'
      let extraBindins = {}
      let customBindins = this.mCustomBindins(componentTag)
      extraBindins['cv-din-gen-disable-fields'] = this.cDisableFields
      extraBindins['cv-din-ins-source-resource'] = (() => {
        if (customBindins['cv-din-ins-source-resource'] != null)
          return this.mResourceAccessing(customBindins['cv-din-ins-source-resource'])
        return this.mResourceAccessing(camelCase(resources.to))
      })()

      extraBindins['cv-din-ins-related-resource'] = (() => {
        if (customBindins['cv-din-ins-related-resource'] != null)
          return this.mResourceAccessing(customBindins['cv-din-ins-related-resource'])
        return this.mResourceAccessing(camelCase(resources.from))
      })()

      for (const [key, value] of Object.entries(localBindins)) {
        if (customBindins[key] == null)
          customBindins[key] = value
      }

      return {...customBindins,...extraBindins}
    },

    mRelationatorOns (field = null,componentTag = null,localOns = {}) {
      if (!field)
        return {}

      let resources = this.mRelatedToFrom(field)

      if (!resources)
        return {}

      componentTag = componentTag || 'cv-relationator'
      let moreOns      = {}
      let customOns    = this.mOns(componentTag)

      moreOns['em-din-ins-related-detach-attach-event'] = (data) => {
        this.emDinGenRowEmitter({
          row         : {[snakeCase(resources.to) + '_detach_attach']: data},
          uid         : this._uid,
          inputSource : this.mInputSource(snakeCase(resources.to) + '_detach_attach')
        })
        this.mDelayer().then(() => {
          customOns['em-din-ins-related-detach-attach-event'](data)
        })
      }

      for (const [key, value] of Object.entries(localOns))
        if (customOns[key] == null)
          customOns[key] = value

      return {...customOns,...moreOns}
    },

    mArrayOrObjectFixer (emitted) {
      return {
        segment     : this.cSegment,
        uid         : emitted.uid,
        inputSource : emitted.inputSource,
        row         : this.mCvConditionalDestructuring(this.cRow,emitted.row)
      }
    },

    emDinGenRowProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mInputCalBack(emitted).then((fixedEmmited) => {
          if (this._uid === fixedEmmited.uid) {
            resolve(this.mArrayOrObjectFixer(fixedEmmited))
          } else {
            if (fixedEmmited.segment == null)
              reject(fixedEmmited)

            if (fixedEmmited.segment === '*') {
              resolve(this.mArrayOrObjectFixer(fixedEmmited))
            } else {
              resolve({row: {...this.cRow,...{[fixedEmmited.segment]: fixedEmmited.row}},segment: this.cSegment,uid: fixedEmmited.uid,inputSource: fixedEmmited.inputSource})
            }
          }
        }).catch((fixedEmmited) => {
          reject(fixedEmmited)
        })
      })
    },

    mComponentInitialize () {
      let row = {}

      if (this.cHasActiveField)
        row = {active: 1}

      let uid = this._uid

      return new Promise((resolve, reject) => {
        this.emDinGenRowEmitter({row,uid})
        this.mDelayer(1).then(() => {
          this.mSetReady()
          resolve()
        })
      })
    },

    emStaGenRowProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        reject(emitted)
        this.emDinGenRowEmitter({row: emitted.row,segment: emitted.segment,uid: emitted.uid})
      })
    },

    mInputFocus: function (ref,internalRef = 'cInputRef') {
      if (this.$refs[ref] != null) {
        if (internalRef && this.$refs[ref][internalRef] != null) {
          if (typeof this.$refs[ref][internalRef].focus === 'function')
            this.$refs[ref][internalRef].focus()
          else {
            if (typeof this.$refs[ref][internalRef].$el.focus === 'function')
              this.$refs[ref][internalRef].$el.focus()
          }
        } else {
          if (this.$refs[ref].focus != null)
            this.$refs[ref].focus()
          else
            this.$refs[ref].$el.focus()
        }
      }
    },

    emDinGenInputFocusProccesor (emitted) {
      return new Promise((resolve, reject) => {
        if (this.mFocuser(emitted))
          reject(emitted)
        else
          resolve(emitted)
      })
    },

    mInputCalBack (emitted) {
      let callName = this.mCaseFixer('camel',`m ${emitted.inputSource} callBack`)
      return new Promise((resolve, reject) => {
        if (this[callName] != null)
          this[callName](emitted).then((fixedEmmited) => {
            resolve(fixedEmmited)
          }).catch(() => {
            reject(emitted)
          })
        else
          resolve(emitted)
      })
    },

    mResetCalBack (emitted,map) {
      let callName = camelCase(`m ${emitted.inputSource} resetCallBack`)

      return new Promise((resolve, reject) => {
        if (this[callName] != null)
          this[callName](emitted).then(() => {
            resolve(emitted)
          }).catch(() => {
            reject(emitted)
          })
        else {
          let subData = {row: {},reset: true}
          subData['resource'] = emitted.resource != null ? emitted.resource : 'anonymous'

          // eslint-disable-next-line
          for (const [from, to] of Object.entries(map))
            subData.row[to] = null

          subData['uid']         = emitted._uid != null ? emitted._uid : this._uid
          subData['inputSource'] = emitted.inputSource != null ? emitted.inputSource : null
          resolve(subData)
          this.emDinGenRowEmitter(subData)
        }
      })
    },

    mInputSource (field = '') {
      return `${this.cSkeletonName}.${field}`
    },

    mInputReffer (field = '') {
      return `${this.cSkeletonName}.${field}.ref`
    },

    mInputController (field = '') {
      return `${this.cSkeletonName}.${field}.control`
    },

    mInputRefferInverse (fieldRef = '') {
      const found = [...fieldRef.matchAll(/^.*\.(.+)(\.ref)$/gi)]

      if (!found || found[0] == null || found[0][1] == null)
        return fieldRef

      return found[0][1]
    },

    mFocuser (fieldRef = '') {
      if (this.$refs[fieldRef] == null)
        return false

      this.mInputFocus(fieldRef)

      return true
    },
    //matcherizer callbackHelpers
    mMatcherizerConditional (fieldController = null) {
      if (!this.cActionReady)
        return false

      if (this.cRow == null || this.cvDinGenSkeletonTouched)
        return false

      if (fieldController && this.fieldControllers[fieldController] != null && !this.fieldControllers[fieldController])
        return false

      if (this.cdReady && this.cdDinGenKeyValue == null)
        return true

      return this.cRow[this.cpDinGenKeyName] != null || Object.keys(this.cRow).length === 0
    },

    mMatcherizerFocus (field) {
      return new Promise((resolve, reject) => {
        this.mDelayer().then(() => {
          this.mFocuser(`${field}.ref`)
          resolve(field)
        })
      })
    },

    mIsNumber (value = null) {
      return isFinite(toNumber(value))
    },

    mIsPositiveNumber (value = null) {
      if (!this.mIsNumber(value))
        return false

      if (toNumber(value) < 0)
        return false

      return true
    },

    mToNumber (value = null) {
      return toNumber(value)
    },

    mRefElement (localField = '') {
      let fieldRef = this.mInputReffer(localField)

      if (this.$refs[fieldRef] == null)
        return null

      return this.$refs[fieldRef]
    },

    mMatcherizerResetByLocalField (field = null) {
      if (field)
        this.mRefElement(field).mResetMe()

      return this
    }
  }
}
