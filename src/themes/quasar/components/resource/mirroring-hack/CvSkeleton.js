import CvSkeleton                                     from 'crudvuel-tools/src/themes/quasar/components/resource/CvSkeleton'
import CvComponentSet                                 from 'src/customs/crudvuel/themes/quasar/components/sets/CvComponentSet'
import CvSingleRowComponentSet                        from 'src/customs/crudvuel/themes/quasar/components/sets/CvSingleRowComponentSet'
import CvResourceComponentSet                         from 'src/customs/crudvuel/themes/quasar/components/sets/CvResourceComponentSet'
import CvNotifyComponentSet                           from 'src/customs/crudvuel/themes/quasar/components/sets/CvNotifyComponentSet'
import CvNotifyComponentExtraSet                      from 'src/customs/crudvuel/themes/quasar/components/sets/CvNotifyComponentExtraSet'
import VueMirroring                                   from 'crudvuel-tools/src/mirroring/VueMirroring'
import {cvEditorToolbarConfig,cvEditorFontsConfig}    from 'src/customs/crudvuel/themes/quasar/components/others/CvEditorOptions'
import CvSeparator                                    from 'src/customs/crudvuel/themes/quasar/components/others/CvSeparator'
import CvQueryStringComponentSet                      from 'src/customs/crudvuel/themes/quasar/components/sets/CvQueryStringComponentSet'

let vueMirroring = new VueMirroring('Skeleton')

export default {
  mixins: [
    CvSkeleton,
    CvComponentSet,
    CvSingleRowComponentSet,
    CvResourceComponentSet,
    CvNotifyComponentSet,
    CvNotifyComponentExtraSet,
    //vueMirroring.restoreBindins(CvSkeleton).assimilate(),
    vueMirroring.fixProperties({
      '[P]dinGenSkeletonTouched' : false,
      '[P]staGenAction'          : null,
      '[EM]dinGenRow'            : null,
      '[EM]dinGenInputFocus'     : null
    }),
    CvQueryStringComponentSet
  ],

  computed: {
    cEditorToolbarConfig () {
      return cvEditorToolbarConfig(this.$q)
    },

    cEditorFontsConfig () {
      return cvEditorFontsConfig
    }
  },

  methods: {
    emDinGenRowProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mInputCalBack(emitted).then((fixedEmmited) => {
          if (this._uid === fixedEmmited.uid) {
            resolve(this.mArrayOrObjectFixer(fixedEmmited))
          } else {
            if (fixedEmmited.segment == null)
              reject(fixedEmmited)

            if (fixedEmmited.segment === '*') {
              resolve(this.mArrayOrObjectFixer(fixedEmmited))
            } else {
              resolve({row: {...this.cRow,...{[fixedEmmited.segment]: fixedEmmited.row}},segment: this.cSegment,uid: fixedEmmited.uid,inputSource: fixedEmmited.inputSource})
            }
          }
        }).catch((fixedEmmited) => {
          reject(fixedEmmited)
        })
      })
    }
  },

  components: {
    CvSeparator
  },

  created () {
    this.mAddCustomBinding({
      'cv-row'    : 'cRow',
      'cv-errors' : 'cErrors'
      //'cv-quit-fields'      : 'cQuitFields',
      //TODO: agregate mechanims for disable fields
      //'cv-read-only-fields' : 'cReadOnlyFields'
      //TODO: agregate mechanims for disable fields
    })
  }
}
