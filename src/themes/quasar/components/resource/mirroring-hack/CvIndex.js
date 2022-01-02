import CvActionContainer      from 'src/customs/crudvuel/themes/quasar/components/resource/CvActionContainer'
import CvAdaptiveGridIndex    from 'src/customs/crudvuel/themes/quasar/components/others/CvAdaptiveGridIndex'
import CvSimpleFilter         from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSimpleFilter'
import CvOrderIcons           from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvOrderIcons'
import CvComponentSet         from 'src/customs/crudvuel/themes/quasar/components/sets/CvComponentSet'
import CvActionComponentSet   from 'src/customs/crudvuel/themes/quasar/components/sets/CvActionComponentSet'
import CvMultiRowComponentSet from 'src/customs/crudvuel/themes/quasar/components/sets/CvMultiRowComponentSet'
import CvNotifyComponentSet   from 'src/customs/crudvuel/themes/quasar/components/sets/CvNotifyComponentSet'
import CvIndexComponentSet    from 'src/customs/crudvuel/themes/quasar/components/sets/CvIndexComponentSet'
import CvPaginateComponentSet from 'src/customs/crudvuel/themes/quasar/components/sets/CvPaginateComponentSet'
import CvDialogComponentSet   from 'src/customs/crudvuel/themes/quasar/components/sets/CvDialogComponentSet'
import CvSimpleFieldFilter    from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSimpleFieldFilter'
import CvActionDialog         from 'src/customs/crudvuel/themes/quasar/components/others/CvActionDialog'
import CvActionButtons        from 'src/customs/crudvuel/themes/quasar/components/others/CvActionButtons'
import cvPageOpt              from 'crudvuel-tools/src/directives/cvPageOpt'
import {camelCase}            from 'lodash'
import VueMirroring           from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Index').enableRoot()

import {
  Dialog,
  QIcon,
  QBtn,
  QCard,
  QItem,
  QItemLabel,
  QSeparator,
  QItemSection,
  QList,
  QTooltip,
  QChip,
  QAvatar,
  date,
  QExpansionItem,
  QBadge
} from 'quasar'

export default {
  mixins: [
    CvComponentSet,
    CvActionComponentSet,
    CvMultiRowComponentSet,
    CvNotifyComponentSet,
    CvIndexComponentSet,
    CvPaginateComponentSet,
    vueMirroring.fixProperties({
      '[EM]dinGenSort'   : true,
      '[D|M]selectables' : {},
      '[D|M]orderables'  : {},
      '[D|M]filterables' : {},
      '[P]staInsSearch'  : {}
    }),
    vueMirroring.assimilate(
      {CvSimpleFieldFilter},
      {CvOrderIcons},
      {CvAdaptiveGridIndex},
      {CvActionContainer},
      {CvActionButtons},
      {CvActionDialog,root: true}
    ),
    CvDialogComponentSet
  ],

  components: {
    CvActionContainer,
    CvAdaptiveGridIndex,
    CvOrderIcons,
    CvSimpleFieldFilter,
    CvSimpleFilter,
    Dialog,
    QBtn,
    QCard,
    QIcon,
    QItem,
    QItemLabel,
    QSeparator,
    QItemSection,
    QList,
    QTooltip,
    CvActionDialog,
    QChip,
    QAvatar,
    date,
    QExpansionItem,
    QBadge,
    CvActionButtons
  },

  directives: {
    cvPageOpt
  },

  data () {
    return {
      selectables : {},
      orderables  : {},
      filterables : {}
    }
  },

  computed: {
    cdStaInsIndexSearch () {
      if (this.cdIndexAdaptiveGridIndexGridFilterSelectorCurrentFilter === 'cv-simple-paginator') {
        if (this.cdIndexAdaptiveGridIndexGridSimpleFilterSearch == null)
          return ''

        return this.cdIndexAdaptiveGridIndexGridSimpleFilterSearch
      }

      if (this.cdIndexAdaptiveGridIndexGridCombinatoryFilterSearch == null)
        return ''

      return this.cdIndexAdaptiveGridIndexGridCombinatoryFilterSearch
    },

    cEnableSimpleFieldFilter () {
      return this.cdIndexAdaptiveGridIndexGridFilterSelectorCurrentFilter === 'cv-simple-paginator'
    },

    cdIndexActionContainerAddBottonMargin () {
      return false
    },

    cpDinInsPagSpecialFilterQuery () {
      return {}
    },

    cDefaultButtonBindings () {
      return {
        'cv-din-gen-show-next-button':false,
        'cv-din-gen-show-reset-button':false,
        'cv-din-gen-show-clear-button':false
      }
    }
  },

  methods: {
    mSimpleFieldFilter (fieldFilter = null) {
      return new Promise((resolve, reject) => {
        if (!fieldFilter || fieldFilter.field == null || fieldFilter.search == null)
          reject(fieldFilter)

        let filterQuery = {...this.cdPagFilterQuery}

        if (fieldFilter.search == null || fieldFilter.search === '')
          filterQuery[fieldFilter.field] = ''
        else
          filterQuery[fieldFilter.field] = {'lOp': 'and','eOp': 'like','value': fieldFilter.search}

        this.mSetPagFilterQuery(filterQuery)

        this.mSync().then(() => {
          resolve(fieldFilter)
        }).catch(() => {
          reject(fieldFilter)
        })
      })
    },

    emStaInsfIndexAdaptiveGridIndexGridSimpleFilterSearchProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mSetIndexAdaptiveGridIndexGridSimpleFilterSearch(emitted).mSetPagFilterQuery()
        this.mSetPagPage(1)

        this.mSync().then(response => {
          resolve(emitted)
        }).catch(response => {
          reject(emitted)
        })
      })
    },

    emStaInsfIndexAdaptiveGridIndexGridCombinatoryFilterSearchProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mSetIndexAdaptiveGridIndexGridCombinatoryFilterSearch(emitted).mSetPagFilterQuery()
        this.mSetPagPage(1)

        this.mSync().then(response => {
          resolve(emitted)
        }).catch(response => {
          reject(emitted)
        })
      })
    },

    emDinGenSortProccesor (rowField = null) {
      return new Promise((resolve, reject) => {
        if (this.cdAscending == null)
          this.mSetPagOrderBy(rowField).mSetPagAscending(1)
        else
          this.mSetPagOrderBy(rowField).mSetPagAscending(rowField !== this.cdOrderBy ? 1 : this.cdAscending ? 0 : 1)

        this.mSync().then(response => {
          resolve(rowField)
        }).catch(response => {
          reject(rowField)
        })
      })
    },

    mSync () {
      this.mSetUnReady()
        .mSetPagByColumn(0)
        .mSetPagSearchMode(this.cdIndexAdaptiveGridIndexGridFilterSelectorCurrentFilter)
        .mSetPagSearchObject(this.cdStaInsIndexSearch)

      return new Promise((resolve, reject) => {
        this.mSetUnReady().mActionGetRowsServiceBuilder().call().then(response => {
          let mIndexResponse  = this.mIndexResponse(response)

          this.mSetIndexAdaptiveGridIndexGridRows(mIndexResponse.rows)
            .mSetCvPaginateTotalQueryElements(mIndexResponse.count)
            .mSetCvPaginateTotalPageElements(mIndexResponse.rows.length)
            .mSetReady()

          resolve()
        }).catch(response => {
          this.mSetReady()
          reject(response)
        })
      })
    },

    mIsSelectable (field) {
      if (this.cdSelectables[field] == null)
        return false

      return this.cdSelectables[field]
    },

    mIsOrderable (field) {
      if (this.cdOrderables[field] == null)
        return false

      return this.cdOrderables[field]
    },

    mIsFilterable (field) {
      if (this.cdFilterables[field] == null)
        return false

      return this.cdFilterables[field]
    },

    emStaComfCvPaginateCurrentPageProccesor (page) {
      return new Promise((resolve, reject) => {
        this.mSetPagLimit(this.cdCvPaginateLimitSelected).mSetPagPage(page).mSync().then(response => {
          resolve(page)
        }).catch(response => {
          reject(page)
        })
      })
    },

    emStaInsfIndexSimpleFieldFilterSimpleFilterSearchProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mSimpleFieldFilter(emitted).then(processed => {
          resolve(processed)
        }).catch(processed => {
          reject(processed)
        })
      })
    },

    mLoadDefaultFilterables () {
      let filterQuery = {}

      for (const [field, active] of Object.entries(this.cdFilterables))
        if (active)
          if (field !== undefined &&  active !== undefined)
            filterQuery[field] = ''

      return filterQuery
    },

    mLoadDefaultSelectables () {
      let selectQuery = []

      for (const [field, active] of Object.entries(this.cdSelectables))
        if (active)
          selectQuery.push(field)

      return selectQuery
    },

    mComponentInitialize () {
      this.mSetPagPage(1).mSetPagOrderBy(this.cKeyName).mSetPagAscending(1)
      this.mSetPagFilterQuery().mSetPagSelectQuery().mSetPagLimit(8)
      this.mSetIndexAdaptiveGridIndexGridSimpleFilterSearch('')
      this.mSetIndexAdaptiveGridIndexGridCombinatoryFilterSearch('')
      this.mSetIndexAdaptiveGridIndexGridFilterSelectorCurrentFilter('cv-simple-paginator')

      return new Promise((resolve, reject) => {
        this.mSync().then(resolve).catch(reject)
      })
    },

    mSetPagSelectQuery (pagSelectQuery = null) {
      if (!pagSelectQuery)
        this.$set(this,'pagSelectQuery',this.mLoadDefaultSelectables())
      else
        this.$set(this,'pagSelectQuery',pagSelectQuery)

      return this
    },

    mSetPagPage (value = null) {
      this.$set(this,'pagPage',value)

      return this.mSetCvPaginateCurrentPage(value)
    },

    mSetPagLimit (value = null) {
      this.$set(this,'pagLimit',value)

      return this.mSetCvPaginateLimitSelected(value)
    },

    mSetPagOrderBy (value = null) {
      this.$set(this,'pagOrderBy',value)

      return this.mSetOrderBy(value)
    },

    mSetPagAscending (value = null) {
      this.$set(this,'pagAscending',value)

      return this.mSetAscending(value)
    },

    mSetPagFilterQuery (pagFilterQuery = null) {
      if (!pagFilterQuery)
        this.$set(this,'pagFilterQuery',this.mLoadDefaultFilterables())
      else
        this.$set(this,'pagFilterQuery',pagFilterQuery)

      return this
    },

    emStaGenMsyncProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSync()
        resolve()
      })
    },

    emStaGenLaunchActionProccesor (emitted = null) {
      this.mSetShowActionDialog(false)

      return new Promise((resolve, reject) => {
        if (emitted && emitted.action != null) {
          let callName = camelCase(`mLaunch ${emitted.action} Action`)

          if (this[callName] != null) {
            this.mDifuminate()
            this[callName](emitted)
          }
        }

        resolve(emitted)
      })
    },

    mLaunchShowAction (emitted = null) {
      this.mBaseLauchAction(emitted,'show')
    },

    mLaunchExportingsAction (emitted = null) {
      this.mSetUnReady()
      let mResourceAction = this.mResourceAction('exportings')

      this.$nextTick().then(() => {
        mResourceAction.getService(null,null,this.mPaginator(),date).then(response => {
          this.mOpacityRecovery().mSetReady()
        }).catch((response) => {
          this.mOpacityRecovery().mSetReady()
        })
      }).catch((response) => {
        this.mOpacityRecovery().mSetReady()
      })
    },

    mLaunchCreateAction (emitted = null) {
      if (this.cpDinGenChildActionMode === 'route')
        this.$router.push(this.mActionPath('create'))

      if (this.cpDinGenChildActionMode === 'dialog') {
        if (this.mSetShowActionDialog == null)
          return

        this.mSetDialogAction(this.cResource.actions.create).mSetShowActionDialog(true)
      }
    },

    mLaunchEditAction (emitted = null) {
      this.mBaseLauchAction(emitted,'edit')
    },

    mLaunchDeleteAction (emitted = null) {
      // TODO: decrese page if current row is last in current page
      let row = emitted.row != null ? emitted.row : null
      let mResourceAction = this.mResourceAction('delete')
      this.mToSync(row)

      this.$q.dialog({
        title   : mResourceAction.label + ' ' + this.cKeyName + ':' + row[this.cKeyName],
        message : mResourceAction.confirmLabel,
        ok      : mResourceAction.nextLabel,
        cancel  : mResourceAction.backLabel
      }).onOk(() => {
        mResourceAction.setService(row[this.cKeyName]).then((response) => {
          this.mSynchronized(row)
          this.mOpacityRecovery()
          this.mSuccessNotification(mResourceAction.getSetSuccessMessage() + this.actionKeyMessage(row))
        }).catch(response => false)
      }).onCancel(() => {
        this.mSynchronized(row)
        this.mOpacityRecovery()
        this.mCancelNotification(mResourceAction.getSetCancelMessage() + this.actionKeyMessage(row))
      })
    },

    mLaunchActivateAction (emitted = null) {
      let row = emitted.row != null ? emitted.row : null

      if (!this.mHasPermission('activate'))
        return this.mOpacityRecovery()

      if (this.mIsSynchronizing(row))
        return this.mOpacityRecovery()

      this.mToSync(row)
      let mResourceAction = this.mResourceAction('activate')

      mResourceAction.setService(row[this.cKeyName]).then((response) => {
        this.mSynchronized(row)
        this.mOpacityRecovery()
        this.mSuccessNotification(mResourceAction.getSetSuccessMessage() + this.actionKeyMessage(row))
      }).catch((response) => {
        this.mSynchronized(row)
        this.mOpacityRecovery()
        this.mErrorNotification(mResourceAction.getSetErrorMessage() + this.actionKeyMessage(row))
      })
    },

    mLaunchDeactivateAction: function (emitted = null) {
      let row = emitted.row != null ? emitted.row : null

      if (!this.mHasPermission('deactivate'))
        return this.mOpacityRecovery()

      if (this.mIsSynchronizing(row))
        return this.mOpacityRecovery()

      this.mToSync(row)
      let mResourceAction = this.mResourceAction('deactivate')

      mResourceAction.setService(row[this.cKeyName]).then((response) => {
        this.mSynchronized(row)
        this.mOpacityRecovery()
        this.mSuccessNotification(mResourceAction.getSetSuccessMessage() + this.actionKeyMessage(row))
      }).catch((response) => {
        this.mSynchronized(row)
        this.mOpacityRecovery()
        this.mErrorNotification(mResourceAction.getSetErrorMessage() + this.actionKeyMessage(row))
      })
    },

    emStaGenActionCanceledProccesor (emitted = null) {
      return new Promise((resolve,reject) => {
        this.mDelayer(200).then(() => {
          this.mOpacityRecovery()

          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)

          this.mSync()
          resolve(emitted)
        })
      })
    },

    emStaGenActionCompletedProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(200).then(() => {
          this.mOpacityRecovery()

          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)

          this.mSync()
          resolve(emitted)
        })
      })
    }
  },

  created () {
    this.mAddCustomBinding({
      'cv-din-gen-dialog-action' : 'cdDialogAction',
      'cv-din-gen-key-value'     : 'cdDialogKeyAction',
      'cv-din-gen-action-mode'   : 'cpDinGenActionMode'
    })
  }
}
