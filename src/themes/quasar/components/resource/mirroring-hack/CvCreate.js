import CvCreate                       from 'crudvuel-tools/src/themes/quasar/components/resource/CvCreate'
import CvActionContainer              from 'src/customs/crudvuel/themes/quasar/components/resource/CvActionContainer'
import CvActionComponentExtraSet      from 'src/customs/crudvuel/themes/quasar/components/sets/CvActionComponentExtraSet'
import CvSingleRowComponentExtraSet   from 'src/customs/crudvuel/themes/quasar/components/sets/CvSingleRowComponentExtraSet'
import CvNotifyComponentExtraSet      from 'src/customs/crudvuel/themes/quasar/components/sets/CvNotifyComponentExtraSet'
import CvCreateComponentExtraSet      from 'src/customs/crudvuel/themes/quasar/components/sets/CvCreateComponentExtraSet'
import CvComponentExtraSet            from 'src/customs/crudvuel/themes/quasar/components/sets/CvComponentExtraSet'
import CvActionButtons                from 'src/customs/crudvuel/themes/quasar/components/others/CvActionButtons'
import CvSkeletonLoading              from 'src/customs/crudvuel/themes/quasar/components/others/CvSkeletonLoading'
import {QChip}                        from 'quasar'
import VueMirroring                   from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Create').enableRoot()

export default {
  mixins: [
    CvCreate,
    CvComponentExtraSet,
    CvActionComponentExtraSet,
    CvSingleRowComponentExtraSet,
    CvNotifyComponentExtraSet,
    CvCreateComponentExtraSet,
    vueMirroring.assimilate(
      {CvActionContainer},
      {CvActionButtons}
    )
  ],

  components: {
    CvActionContainer,
    CvActionButtons,
    QChip,
    CvSkeletonLoading
  },

  computed: {
    cClassFix () {
      if(this.cpDinGenActionMode == null)
        return {}

      if(this.cpDinGenActionMode === 'route')
        return {}

      if(this.cpDinGenActionMode === 'dialog')
        return {'q-pa-sm':this.cGtxs,'':this.cLtsm}
    },

    cFinalKeyValue() {
      return null
    }
  },

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
    }
  }
}
