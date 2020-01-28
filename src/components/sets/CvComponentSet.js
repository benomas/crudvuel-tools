import {mySubString,myReplace,cvF,cvFixDotDepth} from 'crudvuel-tools/src/cvHelper'
import {map} from 'lodash'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('ComponentSet')
export default {
  mixins: [
    vueMirroring.fixProperties({
      '[D]selfReady'       : false,
      '[D]childrenReady'   : true,
      '[D]isMounted'       : false,
      '[P]staGenParentRef' : null
    })
  ],
  data () {
    return {
      customBindings:[
        {
          'cv-sta-gen-parent-ref':'cSelfRef'
        }
      ]
    }
  },
  computed: {
    cSelfRef () {
      return this
    },
    cReady () {
      return this.cdSelfReady && this.cdChildrenReady
    }
  },
  methods: {
    mCustomBingins (index) {
      return {
        ...(this.mBinding != null) ? this.mBinding(index) : {},
        ...Object.assign({}, ...map(this.customBindings,  collection  =>  {
          for (const [prop, value] of Object.entries(collection))
            collection[prop] = this[value]
          return collection
        }))
      }
    },
    mActionInitialize () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          setTimeout(() => {
            resolve()
          }, 2000)
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
    mSetSelfReady () {
      this.$set(this,'selfReady',true)
      return this
    },
    mSetSelfUnReady () {
      this.$set(this,'selfReady',false)
      return this
    },
    mySubString,
    myReplace,
    cvF,
    cvFixDotDepth
  },
  mounted () {
    this.mSetIsMounted(true)
    this.mActionInitialize().then((startData = null) => {
      this.mSetSelfReady()
    }).catch((exceptionData) => {
      this.mFailInitializeNotification().then(() => {
        this.mFinish()
      }).catch(() => {
        this.mFinish()
      })
    })
  }
}
