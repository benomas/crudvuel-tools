import {mySubString,myReplace,cvF,cvFixDotDepth} from 'crudvuel-tools/src/cvHelper'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring('ComponentSet').fixProperties({
      '[D]ready'                     : false,
      '[P]dinGenParentReady'         : true,
      '[D]isMounted'                 : false,
      '[P]staGenParentRef'           : null,
      '[P]dinComComponentLang'       : {},
      '[P]staInsComponentBindingTag' : ''
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
    }
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
          setTimeout(() => {
            this.mSetReady()
            resolve()
          }, 5)
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

    mFinish () {
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
      if (this.cpDinComComponentLang && this.cpDinComComponentLang[word])
        return this.cpDinComComponentLang[word]
      return defWord
    },

    mDelayer () {
      return new Promise((resolve, reject) => {
        this.$nextTick().then(()=>this.$nextTick().then(()=>this.$nextTick().then(()=>{
          setTimeout(() => {
            resolve()
          }, 1)
        })))
      })
    },
    mySubString,
    myReplace,
    cvF,
    cvFixDotDepth
  },

  mounted () {
    this.mSetIsMounted(true)
    this.mComponentInitialize().then((startData = null) => {
    }).catch((exceptionData) => {
      this.mFailInitializeNotification().then(() => {
        this.mFinish()
      }).catch(() => {
        this.mFinish()
      })
    })
  }
}
