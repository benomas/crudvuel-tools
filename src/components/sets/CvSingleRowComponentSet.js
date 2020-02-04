import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]dinGenKeyName'  : 'id',
      '[P]dinGenKeyValue' : null
    })
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cdDinGenKeyValue () {
      if (this.cvDinGenKeyValue != null)
        return this.cvDinGenKeyValue

      if (
        this.$route == null ||
        this.$route.params == null ||
        this.$route.params[this.cpDinGenKeyName] == null
      )
        return null
      return this.$route.params[this.cpDinGenKeyName]
    }
  },
  methods: {/*
    mFinish () {
      if (this.cpStaGenAction.name !== 'index' && typeof this.cResource.actions.index !== 'undefined') {
        let baseRoute = this.$route.path.split(this.mActionPath('index'))
        this.$router.push(baseRoute[0] + this.mActionPath('index'))
      }
    },
    mFailSetNotification () {
      let errorMessage = this.cpStaGenAction.getSetRrrorMessage()
      if (errorMessage)
        this.mCancelNotification(errorMessage + this.actionKeyMessage(this.cdRow))
    },
    mCompleteAction () {
      this.mFinish()
    }*/
  }
}
