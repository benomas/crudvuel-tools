//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
export default{
  data () {
    return {}
  },
  props: [
  ],
  computed: {
  },
  methods: {
    mActionInitialize: function () {
      return new Promise((resolve, reject) => {
        //reject(new Error('testing'))
        if (this.cpActionGetService) {
          this.cpActionGetService(this.cKeyValue).then(response => {
            this.row = this.transformResponse(response)
            resolve()
          }).catch(error => {
            console.log(error)
            resolve()
          })
        } else
          resolve()
      })
    },
    mCompleteAction () {
      this.mSetSelfUnReady()
      this.cpActionSetService(this.cKeyValue,this.cdRow).then(response => {
        this.mSetRow(this.transformResponse(response))
          .mSetSelfReady()
          .mSuccessNotification(this.cpStaGenAction.getSetSuccessMessage() + this.actionKeyMessage(this.cdRow))
          .mFinish()
      }).catch(this.setError)
    },
    mFailInitializeNotification: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.mErrorNotification('fail')
          console.log('action aaaa')
          resolve()
        })
      })
    }
  },
  created: function () {
  }
}
