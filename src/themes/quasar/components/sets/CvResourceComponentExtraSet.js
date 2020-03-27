//Edit this file to add logic in the heritage stairs
import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring('ResourceComponentSet').fixProperties({
    })
  ],

  methods: {
    emStaGenActionCanceledProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(600).then(() => {
          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)
          resolve(emitted)
        })
      })
    },

    emStaGenActionCompletedProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(600).then(() => {
          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)
          resolve(emitted)
        })
      })
    },

    mInvokeActionDialog () {
      if (this.mSetShowActionDialog != null)
        this.mSetShowActionDialog(true)
    },
  }
}
