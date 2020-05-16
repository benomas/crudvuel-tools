<template>
  <div >
  <!--
    TODO:no dependencies template need to be defined
  -->
  </div>
</template>
<script>
import CvComponentSet         from 'crudvuel-tools/src/components/sets/CvComponentSet'
import CvResourceComponentSet from 'crudvuel-tools/src/components/sets/CvResourceComponentSet'
import CvDialogComponentSet   from 'crudvuel-tools/src/themes/quasar/components/sets/CvDialogComponentSet'
import CvPaginateComponentSet from 'crudvuel-tools/src/components/sets/CvPaginateComponentSet'
import CvSimpleFilter         from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import CvPermission           from 'crudvuel-tools/src//components/CvPermissionComponent'
import VueMirroring           from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Matcherizer')

export default {
  mixins: [
    CvComponentSet,
    CvResourceComponentSet,
    CvDialogComponentSet,
    CvPaginateComponentSet,
    CvPermission,
    vueMirroring.fixProperties({
      '[P|NN]staInsPagSelectQuery'       : ['id','cv_search'],
      '[P|NN]staInsPagFilterQuery'       : {'cv_search': ''},
      '[P|NN]staInsPagOrderBy'           : 'cv_search',
      '[P|NN]staInsPagLimit'             : 50,
      '[P|M]dinInsCurrentValue'          : null,
      '[P]dinInsCurrentLabel'            : '',
      '[P]dinInsListOfItemsLimit'        : 20,
      '[P]dinInsValueCallBack'           : null,
      '[P]dinInsLabelCallBack'           : null,
      '[P|NN]staInsPaglastFilterQuery'   : null,
      '[P|EM]staInsCurrentItem'          : null,
      '[P]dinGenDisableFields'           : null,
      '[D|M]sourceRows'                  : [],
      '[D|M]sourceCount'                 : null,
      '[D|M]sourcePageCount'             : null,
      '[D|M]listWidth'                   : '200px',
      '[D|M]listTop'                     : '200px',
      '[D|M]lastSearch'                  : null,
      '[D|M]scrollTopFix'                : 0,
      '[EM]dinGenReset'                  : null,
      '[P|EM]dinInsLoading'              : false,
      '[P]staInsBottomMarginTolerance'   : 0,
      '[P]staInsSyncTime'                : 30,
      '[P]staInsEnableAutoSelectCreated' : true,
      '[P]staInsEnableCreateButton'      : true,
      //-----------
      '[D|EM]searchFocus'                : false,
      '[D|EM]searchContinue'             : false,
      '[D|EM]searchOn'                   : false,
      '[D|EM]listOn'                     : false,
      '[D|EM]listLeave'                  : false,
      //unconfirmed
      '[P]dinInsSourceService'           : null,
      '[P]staInsLocalData'               : null,
      '[P]dinInsKeyLoading'              : false
    }),
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true}
    )
  ],

  watch: {
    cpStaInsPagFilterQuery: function (newValue, oldValue) {
      if(JSON.stringify(newValue) !== JSON.stringify(oldValue)){
        this.mResetMe()
        this.mSetPagFilterQuery(newValue)
      }
    }
  },

  components: {
    CvSimpleFilter
  },

  computed: {
    cRequireNewRemoteSearch: function () {
      //when matcherizer has receiving static localData, then is not necesary to make a remote data call
      if (this.cdDinInsLocalData)
        return false

      if (this.cdLastSearch == null || this.cdPaglastFilterQuery == null)
        return true

      if (this.cdPaglastFilterQuery !== this.cdPagFilterQuery)
        return true

      /*
      this.absolueRemoteData = false
      if (lastSearch === '' && this.sourcePageCount !== null && this.sourcePageCount < this.cdLimit)
        this.absolueRemoteData = true

      for (let i = 0; i < staticPropertys.length; i++) {
        let property = staticPropertys[i]
        if (typeof this.sourceParametrizer['get' + property] !== 'function' || JSON.stringify(this.sourceParametrizer['get' + property]())  !== JSON.stringify(this['c' + property])) {
          this.absolueRemoteData = false
          return true
        }
      }

      if (lastSearch === this.cdPagSearchObject)
        return false

      //When the page is full, that means that there is more remote data compatible with the current searsh, other wise, no is necesary to make another remote data call
      if (this.sourcePageCount === this.cdLimit)
        return true

      if (this.mySubString(this.cdPagSearchObject,lastSearch))
        return false

      if (this.absolueRemoteData)
        return false
      */
      return true
    },

    cSourceRows () {
      let limitedSourceRows = []
      for (let i = 0; i < this.cpDinInsListOfItemsLimit; i++) {
        if (i >= this.cdSourceRows.length)
          return limitedSourceRows
        limitedSourceRows.push(this.cdSourceRows[i])
      }
      return limitedSourceRows
    },

    cSourceRowsCount () {
      return this.cSourceRows.length
    },

    cpDinInsSourceService () {
      if (this.cvDinInsSourceService != null)
        return this.cvDinInsSourceService

      if (
        this.cpStaInsResource != null &&
        this.cpStaInsResource.actions != null &&
        this.cpStaInsResource.actions.index != null &&
        this.cpStaInsResource.actions.index.getService != null
      )
        return this.cpStaInsResource.actions.index.getService

      console.log('asasas')
      return this.mLocalService()
    },

    cMoreDataLabel () {
      let trans = this.mComLang('moreDat')
      if (trans !== '')
        return trans
      return '*Mas resultados disponibles mediante busqueda'
    },

    cNoDataLabel () {
      let trans = this.mComLang('noData')
      if (trans !== '')
        return trans
      return '*Sin resultados disponibles'
    },

    cLoadingLabel () {
      let trans = this.mComLang('loadingLabel')
      if (trans !== '')
        return trans
      return 'Cargando'
    },

    cShowList () {
      return this.cdSearchContinue
    },

    cCurrentSelectedItemMark: function () {
      return '<i class="f-right fa fa-check text-positive"></i>'
    },

    cInputRef () {
      return this.$refs['simpleFilteRef'].cInputRef
    },

    cMatcherizerChild () {
      return this.cvMatcherizerChild
    },
    /*
    cSimpleFilterWidthClass () {
      let noButtonClass  = 'col-xs-12'
      let hasButtonClass = 'col-xs-9 col-sm-10'

      if(!this.cShowCreateButton)
        return noButtonClass

      return hasButtonClass
    },

    cCreateButtonWidthClass () {
      let hasButtonClass = 'col-xs-3 col-sm-2'
      return hasButtonClass
    }*/

    cFilterReferenceNode () {
      let node = this.$refs.filterReference

      //fix matcherizer integration inside dialogs
      if (node.parentElement && node.offsetParent) {
        do {
          if(node.scrollTop > 0)
            break
        } while (node = node.parentElement)
      }

      return node
    }
  },

  methods: {
    mLocalService () {
      //TODO: complement this implementation
      return new Promise((resolve, reject) => {
        if (this.cdDinInsLocalData != null)
          resolve(this.cdDinInsLocalData)
        else
          resolve([])
      })
    },

    emStaInsfMatcherizerSimpleFilterSearchProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        if ((emitted == null || emitted === '') && this.cdStaInsfMatcherizerSimpleFilterSearch != null && this.cdStaInsfMatcherizerSimpleFilterSearch !== '')
          this.emDinGenResetEmitter()
        this.mSetMatcherizerSimpleFilterSearch(emitted).mSetPagSearchObject(emitted).mRefreshSource()
        resolve(emitted)
      })
    },

    emStaInsfMatcherizerSimpleFilterClearedProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.emDinGenResetEmitter()
        reject(emitted)
      })
    },

    mComponentInitialize () {
      if (this.cvStaInsfMatcherizerSimpleFilterLabel != null && this.cvStaInsfMatcherizerSimpleFilterLabel !== undefined)
        this.mSetMatcherizerSimpleFilterLabel(this.cvStaInsfMatcherizerSimpleFilterLabel)
      else
        this.mSetMatcherizerSimpleFilterLabel(this.cpStaInsResource != null ? this.cpStaInsResource.rowLabel : null)
      if (this.cvStaInsfMatcherizerSimpleFilterIcon != null && this.cvStaInsfMatcherizerSimpleFilterIcon !== undefined)
        this.mSetMatcherizerSimpleFilterLabel(this.cvStaInsfMatcherizerSimpleFilterIcon)
      else
        this.mSetMatcherizerSimpleFilterIcon(this.cpStaInsResource != null ? this.cpStaInsResource.icon : null)
      return new Promise((resolve, reject) => {
        this.mDelayer().then(() => {
          this.mSetReady()
          this.mSetMatcherizerSimpleFilterSearch(this.cpStaInsfMatcherizerSimpleFilterSearch)
          resolve()
        })
      })
    },

    mRefreshSource () {
      if (this.cRequireNewRemoteSearch){
        return this.cpDinInsSourceService(null,null,this.cPaginator)
          .then(response => {
            this.emDinInsDataLoadedEmitter(response)
            this.emDinInsLoadingEmitter(false)
            this.mDelayer().then(()=>{
              this.mDirectionFix()
            })
          })
          .catch(response => {
            this.emDinInsDataLoadedFailEmitter(response)
            this.emDinInsLoadingEmitter(false)
            this.mDelayer().then(()=>{
              this.mDirectionFix()
            })
          })
      }else{
        this.mDelayer().then(()=>{
          this.mDirectionFix()
        })
      }
    },

    emDinInsDataLoadedProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        let transformedResponse = this.mTransformResponse(emitted)
        this.mSetSourceRows(transformedResponse.rows)
        this.mSetSourceCount(transformedResponse.count)
        this.mSetSourcePageCount(transformedResponse.pageCount)
        this.mSetPaglastFilterQuery({...this.cdPagFilterQuery})
        this.mSetLastSearch(this.cdPagSearchObject)
        resolve(this.mTransformResponse(emitted))
      })
    },

    mTransformResponse (response) {
      if  (response.data.count != null)
        return {rows: response.data.data,count: response.data.count, pageCount: response.data.data.length}
      if  (response.count != null)
        return {rows: response.data,count: response.count, pageCount: response.data.length}
      return {rows: [],count: 0, pageCount: 0}
    },

    mValueCallBack (rows,row) {
      if (row == null)
        return ''

      if (this.cpDinInsValueCallBack == null)
        return row.id || ''

      return typeof this.cpDinInsValueCallBack === 'function'
        ? this.cpDinInsValueCallBack(rows,row) : this.cpDinInsValueCallBack
    },

    mLabelCallBack (rows,row) {
      if (row == null)
        return ''

      if (this.cpDinInsLabelCallBack == null)
        return row.cv_search || ''

      return typeof this.cpDinInsLabelCallBack === 'function'
        ? this.cpDinInsLabelCallBack(rows,row) : this.cpDinInsLabelCallBack
    },

    mShowPatter (label,isCurrent) {
      let located = this.myReplace(label,this.cdPagSearchObject,'<span class="matcherizer-item">$1</span>')

      if (isCurrent)
        located += this.cCurrentSelectedItemMark()

      return located
    },

    mSelect (rowKey,row) {
      this.mSetMatcherizerSimpleFilterSearch(this.mLabelCallBack(this.cSourceRows,row))
      this.emStaInsCurrentItemEmitter(row)

      this.mDelayer().then(() => {
        this.emSearchContinueEmitter(false)
      })
    },

    emStaInsCurrentItemProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        let fixedEmitted = {row: emitted}
        if (this.cpStaInsResource != null && this.cpStaInsResource.singularName != null)
          fixedEmitted['resource'] = this.cpStaInsResource.singularName
        else {
          fixedEmitted['resource'] = 'anonymous'
        }
        resolve(fixedEmitted)
      })
    },

    // event navigation control
    emStaInsfMatcherizerSimpleFilterFocusedProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetSearchFocus(true).mFixListStyle().emDinInsLoadingEmitter(true)
        this.emSearchContinueEmitter(true)
        resolve(emitted)
      })
    },

    emStaInsfMatcherizerSimpleFilterBluredProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetSearchFocus(false)
        if (!this.cdListOn)
          this.emSearchContinueEmitter(false)
        resolve(emitted)
      })
    },

    emSearchContinueProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetSearchContinue(emitted)
        resolve(emitted)
      })
    },

    emStaInsfMatcherizerSimpleFilterMouseOverProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.emSearchOnEmitter(true)
        resolve(emitted)
      })
    },

    emStaInsfMatcherizerSimpleFilterMouseLeaveProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.emSearchOnEmitter(false)
        resolve(emitted)
      })
    },

    emListLeaveProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetListOn(false)
        this.mDelayer().then(() => {
          if (!this.cdSearchFocus && !this.cdSearchOn)
            this.emSearchContinueEmitter(false)
          resolve()
        })
        resolve(emitted)
      })
    },

    emDinGenResetProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        resolve(emitted)
      })
    },

    mInvokeActionDialog () {
      console.log('lauch creation')
    },

    mFixListStyle () {
      node = this.cFilterReferenceNode

      if (node && this.$refs.filterReference.offsetParent.classList.contains('q-dialog__inner'))
        this.mSetScrollTopFix(node.scrollTop)
      else
        this.mSetScrollTopFix(0)

      if (this.$refs.filterReference != null && this.$refs.filterReference.offsetWidth != null) {
        this.mSetListWidth(`${this.$refs.filterReference.offsetWidth}px`)
        let topMargin  = this.$refs.filterReference.clientHeight + this.$refs.filterReference.offsetTop - this.cdScrollTopFix
        this.mSetListTop(`${topMargin}px`)
      }
      else
        this.mSetListWidth('200px')

      this.mDirectionFix()

      return this
    },

    mDirectionFix() {
      this.mDelayer(this.cpStaInsSyncTime).then(()=>{
        let node = this.cFilterReferenceNode

        if (node && this.$refs.filterReference.offsetParent.classList.contains('q-dialog__inner'))
          this.mSetScrollTopFix(node.scrollTop)
        else
          this.mSetScrollTopFix(0)

        let topMargin  = this.$refs.filterReference.clientHeight + this.$refs.filterReference.offsetTop - this.cdScrollTopFix
        //console.log(topMargin)
        if (topMargin + this.$refs.listContainerReference.offsetHeight - this.cpStaInsBottomMarginTolerance > this.cWindowsHeight)
          topMargin = topMargin - this.$refs.listContainerReference.offsetHeight - this.$refs.filterReference.clientHeight
        else
          topMargin  = this.$refs.filterReference.clientHeight + this.$refs.filterReference.offsetTop - this.cdScrollTopFix
        this.mSetListTop(`${topMargin}px`)
      })
    },

    mResetMe () {
      this.emStaInsfMatcherizerSimpleFilterSearchEmitter('')
      this.emDinGenResetEmitter()
    }
  }
}
</script>
