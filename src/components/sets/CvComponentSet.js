import {mySubString,myReplace,cvF,cvFixDotDepth}  from 'crudvuel-tools/src/cvHelper'
import VueMirroring                               from 'crudvuel-tools/src/mirroring/VueMirroring'
import {get}                                      from 'lodash'
export default {
  mixins: [
    new VueMirroring('ComponentSet').fixProperties({
      '[D]ready'                     : false,
      '[P]dinGenParentReady'         : true,
      '[D]isMounted'                 : false,
      '[P]staGenParentRef'           : null,
      '[P]dinComComponentLang'       : {},
      '[P]staInsComponentBindingTag' : '',
      '[D|M]localError'              : {}
    })
  ],

  data () {
    return {
      customBindins:[
        {
          'cv-sta-gen-parent-ref'   : 'cSelfRef',
          'cv-din-gen-parent-ready' : 'cdReady'
        }
      ],

      customOns:[
        {
        }
      ]
    }
  },

  computed: {
    cSelfRef () {
      return this
    },

    cdReady () {
      if (this.cpDinGenParentReady == null) {
        if (this.ready == null)
          return false
        return this.ready
      }

      if (this.cpDinGenParentReady === false)
        return false

      if (this.ready == null)
        return false

      return this.ready
    },

    cRootRef () {
      let rootRef = this

      while (rootRef.cpStaGenParentRef != null)
        rootRef = rootRef.cpStaGenParentRef

      return rootRef
    },

    cActionDepth () {
      let parent =  null
      let depth = 0
      parent = this
      do{
        parent = parent.$parent
        if (
          parent.$vnode != null &&
          parent.$vnode.componentOptions != null &&
          parent.$vnode.componentOptions.tag != null
        ){
          if(parent.cActionDepth != null)
            return parent.cActionDepth +1

          if(parent.$vnode.componentOptions.tag === 'action-container')
            depth ++
        }
      }while(parent.$parent != null)

      return depth
    },
  },

  methods: {
    mCustomBindins (index,localBindins = {}) {
      let collection = {}

      for (const customBinding of this.customBindins)
        for (const [prop, value] of Object.entries(customBinding))
          collection[prop]=this[value]

      collection['cv-sta-ins-component-binding-tag']=index
      let customBindins = {
        ...(this.mBinding != null) ? this.mBinding(index) : {},
        ...collection
      }

      for (const [key, value] of Object.entries(localBindins)) {
        if (customBindins[key] == null)
          customBindins[key] = value
      }

      return customBindins
    },

    mAddCustomBinding (customBinding = {}) {
      this.customBindins.push(customBinding)
    },

    mCustomOns (index,localOns = {}) {
      let events = {}

      for (const customOn of this.customOns)
        for (const [prop, value] of Object.entries(customOn))
          events[prop]=this[value]

      let customOns = {
        ...(this.mOns != null) ? this.mOns(index) : {},
        ...events
      }

      for (const [key, value] of Object.entries(localOns)) {
        if (customOns[key] == null)
          customOns[key] = value
      }

      return customOns
    },

    mAddCustomOn (customBinding = {}) {
      this.customOns.push(customBinding)
    },

    mComponentInitialize () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.mSetReady()
          resolve()
        })
      })
    },

    mFailInitializeNotification () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          console.log('action fail')
          resolve()
        })
      })
    },

    mSetParentReady () {
      if (this.cpStaGenParentRef)
        this.cpStaGenParentRef.mSetReady()

      return this
    },

    mSetParentUnReady () {
      if (this.cpStaGenParentRef)
        this.cpStaGenParentRef.mSetUnReady()

      return this
    },

    transformResponse (response) {
      return response.data.data || response.data
    },

    mFinish (status = null,data = null) {
      return this
    },

    mSetReady () {
      this.$set(this,'ready',true)

      return this
    },

    mSetUnReady () {
      this.$set(this,'ready',false)

      return this
    },

    mComLang: function (word,defWord = '') {
      if (this.cpDinComComponentLang)
        return get(this.cpDinComComponentLang,word) || defWord

      return defWord
    },

    mDelayer (delayFor = 1) {
      return new Promise((resolve, reject) => {
        this.$nextTick().then(()=>this.$nextTick().then(()=>{
          setTimeout(() => {
            resolve()
          }, delayFor)
        }))
      })
    },

    mComponentBootFlow () {
      this.mComponentInitialize().then((startData = null) => {
        this.mSetIsMounted(true)
      }).catch((exceptionData) => {
        this.mFailInitializeNotification().then(() => {
          this.mFinish('fail initialize')
        }).catch(() => {
          this.mFinish('fail notify')
        })
      })
    },

    mDifuminate () {
      this.$el.style.opacity = '40%'

      return this
    },

    mOpacityRecovery () {
      this.$el.style.opacity = '100%'

      return this
    },

    mCvGeneralResponse (response) {
      const nonstandardResponse = response =>
        [{rows: response,row:response,count:null}]

      if(response.data == null)
        return nonstandardResponse(response)

      let dataSource = null

      if(response.data.data != null)
        dataSource = response.data
      else
        dataSource = response

      if(dataSource.count != null)
        return {rows:dataSource.data,count:dataSource.count}

      if(Array.isArray(dataSource.data))
        return {rows:dataSource.data,count:dataSource.data.length}

      return {row:dataSource.data}
    },

    mySubString,
    myReplace,
    cvF,
    cvFixDotDepth
  },

  mounted () {
    this.mComponentBootFlow()
  }
}
