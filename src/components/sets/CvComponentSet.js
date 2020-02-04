import {mySubString,myReplace,cvF,cvFixDotDepth} from 'crudvuel-tools/src/cvHelper'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('ComponentSet')
export default {
  mixins: [
    vueMirroring.fixProperties({
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
      customBindings:[
        {
          'cv-sta-gen-parent-ref'   : 'cSelfRef',
          'cv-din-gen-parent-ready' : 'cdReady'
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
    mCustomBingins (index) {
      let collection = {}
      for (const customBinding of this.customBindings)
        for (const [prop, value] of Object.entries(customBinding))
          collection[prop]=this[value]
      collection['cv-sta-ins-component-binding-tag']=index
      return {
        ...(this.mBinding != null) ? this.mBinding(index) : {},
        ...collection
      }
    },
    mAddCustomBinding (customBinding = {}) {
      this.customBindings.push(customBinding)
    },
    mActionInitialize () {
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
    indexResponse (response) {
      if  (response.data.count != null)
        return {rows:response.data.data,count:response.data.count}
      if  (response.count != null)
        return {rows:response.data,count:response.count}
      return {rows:[],count:0}
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
    mComLang: function (word,defWord) {
      if (this.cpDinComComponentLang && this.cpDinComComponentLang[word])
        return this.cpDinComComponentLang[word]
      return defWord || ''
    },
    mySubString,
    myReplace,
    cvF,
    cvFixDotDepth
  },
  mounted () {
    this.mSetIsMounted(true)
    this.mActionInitialize().then((startData = null) => {
    }).catch((exceptionData) => {
      this.mFailInitializeNotification().then(() => {
        this.mFinish()
      }).catch(() => {
        this.mFinish()
      })
    })
  }
}
