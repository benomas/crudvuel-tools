import CvActionContainer        from 'crudvuel-tools/src/components/resource/CvActionContainer'
import CvActionComponentSet     from 'crudvuel-tools/src/components/sets/CvActionComponentSet'
import CvSingleRowComponentSet  from 'crudvuel-tools/src/components/sets/CvSingleRowComponentSet'
import CvNotifyComponentSet     from 'crudvuel-tools/src/components/sets/CvNotifyComponentSet'
import CvCreateComponentSet     from 'crudvuel-tools/src/components/sets/CvCreateComponentSet'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Create').enableRoot()
export default {
  mixins: [
    CvComponentSet,
    CvActionComponentSet,
    CvSingleRowComponentSet,
    CvNotifyComponentSet,
    CvCreateComponentSet,
    vueMirroring.assimilate(
      {CvActionContainer}
    )
  ],

  components: {
    CvActionContainer
  },

  methods: {
    mComponentInitialize () {
      if(this.row == null){
        if (this.cHasActiveField)
          this.mSetRow({active: 1})
        else
          this.mSetRow({})
      }

      if (this.cpDinGenActionParams != null && this.cpDinGenActionParams.mComponentInitialize != null)
        this.cpDinGenActionParams.mComponentInitialize(this)

      return new Promise((resolve, reject) => {
        this.mSetReady()
        resolve()
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
        this.cpActionSetService(this.cdRow).then(response => {
          resolve(response)
          this.mSetReady().mCompleteAction(response)
        }).catch(response => {
          this.mSetErrors(this.mErrorResponse(response)).mSetReady().mFailCompleteAction(response)
          reject(response)
        })
      })
    },

    mCompleteAction (data = null) {
      let successMessage = this.cpStaGenAction.getSetSuccessMessage()

      if (successMessage){
        this.mDelayer(200).then(()=>{
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
    },

    mCvFileChange(emitted) {
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
