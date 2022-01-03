//Edit this file to add logic in the heritage stairs
import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring('ComponentSet').fixProperties({
      '[P]dinGenChildActionMode' : 'dialog',
      '[D|M]dialogAction'        : null,
      '[D|M]dialogKeyAction'     : null,
      '[D|M]dialogActionParams'  : {}
    })
  ],

  computed:{
    cChildActionMode(){
      if(!['dialog','route'].includes(this.cpDinGenChildActionMode))
        return 'dialog'

      return this.cpDinGenChildActionMode
    }
  },

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

      if (this.cChildActionMode === 'route')
        this.$router.push(this.mActionPath(action,row))

      if (this.cChildActionMode === 'dialog') {
        if (this.cpDinGenKeyName == null || row[this.cpDinGenKeyName] == null)
          return

        if (this.mSetShowActionDialog == null)
          return

        this.mSetDialogAction(this.cResource.actions[action])
          .mSetDialogKeyAction(row[this.cpDinGenKeyName])
          .mSetDialogActionParams({row})
          .mSetShowActionDialog(true)
      }
    },

    mAdvancedLauchAction () {
      const compReference = this
      const builder = function () {
        const selfRef     = this
        this.action       = null
        this.keyAction    = null
        this.actionParams = null

        this.build        = function (){
          if (!selfRef.getAction())
            return

          if (compReference.cChildActionMode === 'route')
            compReference.$router.push(selfRef.getAction().getFixedPath(selfRef.getActionParams()))

          if (compReference.cChildActionMode === 'dialog') {
            if (compReference.mSetShowActionDialog == null)
              return

            if(selfRef.getKeyAction() != null)
              compReference.mSetKeyValue(selfRef.getKeyAction())

            compReference.mSetDialogAction(selfRef.getAction())
              .mSetDialogActionParams(selfRef.getActionParams())
              .mSetShowActionDialog(true)
          }
        }

        this.getAction    = function (){
          return selfRef.action
        }

        this.getKeyAction    = function (){
          return selfRef.keyAction
        }

        this.getActionParams    = function (){
          return selfRef.actionParams
        }

        this.setAction    = function (action){
          selfRef.action = action

          return this
        }

        this.setKeyAction   = function (keyAction){
          selfRef.keyAction = keyAction

          return this
        }

        this.setActionParams    = function (actionParams){
          selfRef.actionParams = actionParams

          return this
        }
      }

      return new builder()
    }
  }
}
