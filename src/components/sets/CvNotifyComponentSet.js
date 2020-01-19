//import VueMirroring from 'crudvuel-tools/src/VueMirroring'
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
    mSuccessNotification: function (message) {
      alert(message)
      return this
    },
    mErrorNotification: function (message) {
      alert(message)
      return this
    },
    mCancelNotification: function (message) {
      alert(message)
      return this
    },
    mInfoNotification: function (message) {
      alert(message)
      return this
    }
  }
}
