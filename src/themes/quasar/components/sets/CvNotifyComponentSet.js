//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvNotifyComponentSet from 'crudvuel-tools/src/components/sets/CvNotifyComponentSet'
import CvNotify             from 'crudvuel-tools/src/themes/quasar/components/others/CvNotify'

export default{
  mixins: [
    CvNotifyComponentSet
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {

  },
  methods: {
    mSuccessNotification (message) {
      CvNotify.createPositive(message)
      return this
    },
    mErrorNotification (message) {
      CvNotify.createNegative(message)
      return this
    },
    mCancelNotification (message) {
      CvNotify.createWarning(message)
      return this
    },
    mInfoNotification (message) {
      CvNotify.createInfo(message)
      return this
    }
  }
}
