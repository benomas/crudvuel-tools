import CvImport                     from 'crudvuel-tools/src/components/resource/CvImport'
import CvActionContainer            from 'crudvuel-tools/src/themes/quasar/components/resource/CvActionContainer'
import CvActionComponentExtraSet    from 'crudvuel-tools/src/themes/quasar/components/sets/CvActionComponentExtraSet'
import CvMultiRowComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvMultiRowComponentExtraSet'
import CvNotifyComponentExtraSet    from 'crudvuel-tools/src/themes/quasar/components/sets/CvNotifyComponentExtraSet'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvFileComponentExtraSet      from 'crudvuel-tools/ssrc/themes/quasar/components/sets/CvFileComponentExtraSet'
import CvActionButtons              from 'crudvuel-tools/src/themes/quasar/components/others/CvActionButtons'
import VueMirroring                 from 'crudvuel/mirroring/VueMirroring'
import {
  QBtn,
  QExpansionItem
} from 'quasar'
let vueMirroring = new VueMirroring('Create').enableRoot()

export default {
  mixins: [
    CvImport,
    CvComponentExtraSet,
    CvActionComponentExtraSet,
    CvMultiRowComponentExtraSet,
    CvNotifyComponentExtraSet,
    CvFileComponentExtraSet,
    vueMirroring.assimilate(
      {CvActionContainer},
      {CvActionButtons}
    )
  ],

  components: {
    CvActionContainer,
    CvActionButtons,
    QBtn,
    QExpansionItem
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
          this.mSetErrors(this.mErrorResponse(response)).mSetReady().mFailCompleteAction(response)
          reject(response)
        })
      })
    }
  }
}
