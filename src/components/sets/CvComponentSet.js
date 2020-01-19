import {mySubString,myReplace,cvF,cvFixDotDepth} from '../../cvHelper'
import VueMirroring from 'crudvuel-tools/src/VueMirroring'
let vueMirroring = new VueMirroring()
export default {
  mixins: [
    vueMirroring.fixProperties({
      'selfReady'     : {init: false,mode: 'D|CD|M'},
      'parentRef'     : {init: null,mode: 'P|CP'},
      'childrenReady' : {init: true,mode: 'D|CD'},
      'isMounted'     : {init: false,mode: 'D|CD|M'}
    })
  ],
  computed: {
    cSelfRef: function () {
      return this
    },
    cReady: function () {
      return this.cdSelfReady && this.cdChildrenReady
    }
  },
  methods: {
    mActionInitialize: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      })
    },
    mFailInitializeNotification: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          console.log('action fail')
          resolve()
        })
      })
    },
    mSetParentReady: function () {
      if (this.cpParentRef)
        this.cpParentRef.mSetReady()
      return this
    },
    mSetParentUnReady: function () {
      if (this.cpParentRef)
        this.cpParentRef.mSetUnReady()
      return this
    },
    transformResponse (response) {
      return response.data.data || response.data
    },
    mFinish: function () {
      return this
    },
    mSetSelfReady: function () {
      this.$set(this,'selfReady',true)
      return this
    },
    mSetSelfUnReady: function () {
      this.$set(this,'selfReady',false)
      return this
    },
    mySubString,
    myReplace,
    cvF,
    cvFixDotDepth
  },
  mounted: function () {
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
