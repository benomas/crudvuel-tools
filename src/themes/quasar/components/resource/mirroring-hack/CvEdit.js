export default {
  methods: {
    emStaGenAutoFillProccesor (emitted = null) {
      return new Promise((resolve,reject) => {
        this.mSetUnReady().mSetSkeletonTouched(true)
          .mAutoFill().mComponentInitialize().then(() => {
            this.mDelayer().then(() => {
              this.mSetSkeletonTouched(false)
              resolve(emitted)
            })
          })
      })
    },

    emStaGenAutoResetProccesor (emitted = null) {
      return new Promise((resolve,reject) => {
        this.mSetUnReady().mSetSkeletonTouched(true)
          .mClearRow().mComponentInitialize().then(() => {
            this.mDelayer().then(() => {
              this.mSetSkeletonTouched(false)
              resolve(emitted)
            })
          })
      })
    },

    emStaGenAutoClearProccesor (emitted = null) {
      return new Promise((resolve,reject) => {
        this.mSetUnReady().mSetSkeletonTouched(true).mClearRow().mDelayer().then(() => {
          this.mDelayer().then(() => {
            this.mSetSkeletonTouched(false).mSetReady()
            resolve(emitted)
          })
        })
      })
    },

    mComponentInitialize () {
      this.mSetDisableActionReady(true).mSetUnReady()

      return new Promise((resolve, reject) => {
        this.mActionGetRowServiceBuilder().call().then(response => {
          this.mSetRow(this.mShowResponse(response))
          this.mSetDisableActionReady(false)
          resolve(response)
          this.mSetReady()
        }).catch(response => {
          reject(response)
          this.mSetReady()
        })
      })
    },

    emStaGenBackProccesor (emitted) {
      return new Promise((resolve, reject) => {
        resolve(emitted)
        this.mCancelAction()
      })
    },

    emStaGenNextProccesor (emitted) {
      this.mSetUnReady()
      return new Promise((resolve, reject) => {
        this.mActionSetRowServiceBuilder().call().then(response => {
          resolve(response)
          this.mSetReady().mCompleteAction(response)
        }).catch(response => {
          let errors = {}

          if (
            response != null && response.response != null  &&
            response.response.data != null  &&
            response.response.data.errors != null
          )
            errors = response.response.data.errors

          this.mSetErrors(errors).mSetReady().mFailCompleteAction(response)
          reject(response)
        })
      })
    },

    mCompleteAction (data = null) {
      console.log(' bvcbvcbcbv')
      let successMessage = this.cpStaGenAction.getSetSuccessMessage()

      if (successMessage) {
        this.mDelayer(200).then(() => {
          this.mSuccessNotification(successMessage + this.actionKeyMessage(this.cdRow))
        })
      }

      return this.mFinish('completed',data)
    },

    mFinish (status = 'completed',data = null) {
      if (this.cpDinGenActionMode === 'route') {
        let baseRoute = this.$route.path.split(this.mActionPath('index'))
        this.$router.push(baseRoute[0] + this.mActionPath('index'))
      }

      if (this.cpDinGenActionMode === 'dialog') {
        if (status === 'completed')
          this.$emit('action-completed', this.mShowResponse(data))

        if (status === 'canceled')
          this.$emit('action-canceled', null)
      }
    }
  },

  created () {
    this.mAddCustomBinding({
      'cv-din-gen-action'      : 'cdAction',
      'cv-row'                 : 'cdRow',
      'cv-errors'              : 'cFixedErrors',
      'cv-din-gen-action-mode' : 'cpDinGenActionMode'
    })
  }
}
