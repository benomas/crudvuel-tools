//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
export default{
  mixins: [
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
      alert(message)
      return this
    },
    mErrorNotification (message) {
      alert(message)
      return this
    },
    mCancelNotification (message) {
      alert(message)
      return this
    },
    mInfoNotification (message) {
      alert(message)
      return this
    }
  }
}
