//Edit this file to add logic in the heritage stairs
import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring('ComponentSet').fixProperties({
      '[P]dinGenActionMode'     : 'dialog',
      '[D|M]dialogAction'       : null,
      '[D|M]dialogKeyAction'    : null,
      '[D|M]dialogActionParams' : {}
    })
  ],

  methods: {
    emStaGenActionCanceledProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(200).then(() => {
          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)
          resolve(emitted)
        })
      })
    },

    emStaGenActionCompletedProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(200).then(() => {
          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)
          resolve(emitted)
        })
      })
    },

    mInvokeActionDialog (key = null,action = null) {
      if (this.mSetShowActionDialog != null){
        if(key)
          this.mSetDialogKeyAction(key)

        if(action)
          this.mSetDialogAction(action)

        this.mSetShowActionDialog(true)
      }
    },

    mBaseLauchAction (emitted = null,action = null) {
      if (!emitted || !action)
        return

      let row = emitted.row != null ? emitted.row : null

      if (this.cpDinGenActionMode === 'route')
        this.$router.push(this.mActionPath(action,row))

      if (this.cpDinGenActionMode === 'dialog') {
        if (this.cpDinGenKeyName == null || row[this.cpDinGenKeyName] == null)
          return

        if (this.mSetShowActionDialog == null)
          return

        this.mSetDialogAction(this.cResource.actions[action])
          .mSetDialogKeyAction(row[this.cpDinGenKeyName])
          .mSetShowActionDialog(true)
      }
    }
  }
}
