import CvActionComponentSet from 'crudvuel-tools/src/components/sets/CvActionComponentSet'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    CvActionComponentSet,
    vueMirroring.fixProperties({
      'row': {init: {},mode: 'D|CD|M'}
    })
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cKeyName: function () {
      return this.cvKeyName || 'id'
    },
    cKeyValue: function () {
      if (
        this.$route == null ||
        this.$route.params == null ||
        this.$route.params[this.cKeyName] == null
      )
        return null
      return this.$route.params[this.cKeyName]
    }
  },
  methods: {
    mFinish: function () {
      if (this.cpAction.name !== 'index' && typeof this.cResource.actions.index !== 'undefined') {
        let baseRoute = this.$route.path.split(this.mActionPath('index'))
        this.$router.push(baseRoute[0] + this.mActionPath('index'))
      }
    },
    mFailSetNotification () {
      let errorMessage = this.cpAction.getSetRrrorMessage()
      if (errorMessage)
        this.mCancelNotification(errorMessage + this.actionKeyMessage(this.cdRow))
    },
    mCompleteAction () {
      this.mFinish()
    }
  },
  created: function () {
  }
}
