import CvCreate                     from 'crudvuel-tools/src/components/resource/CvCreate'
import CvActionContainer            from 'crudvuel-tools/src/themes/quasar/components/resource/CvActionContainer'
import CvActionComponentExtraSet    from 'crudvuel-tools/src/themes/quasar/components/sets/CvActionComponentExtraSet'
import CvSingleRowComponentExtraSet from 'crudvuel-tools/src/themes/quasar/components/sets/CvSingleRowComponentExtraSet'
import CvNotifyComponentExtraSet    from 'crudvuel-tools/src/themes/quasar/components/sets/CvNotifyComponentExtraSet'
import CvCreateComponentExtraSet    from 'crudvuel-tools/src/themes/quasar/components/sets/CvCreateComponentExtraSet'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvActionButtons              from 'crudvuel-tools/src/themes/quasar/components/others/CvActionButtons'
import VueMirroring                 from 'crudvuel/mirroring/VueMirroring'
import {
  QBtn
} from 'quasar'
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
    QBtn
  },

  methods: {
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
    }
  }
}