<template>
  <div class="cv-matcherizer-container w-100">
    <div
      class="list-items">
      <div
        ref="filterReference">
        <!--
        {{cdSearchFocus}}--
        {{cShowList}}--
        {{cdListOn}}--
        {{cdSearchContinue}}--
        {{cdSearchOn}}--
        {{cdCurrentItem}}---->
        <cv-simple-filter
          class="row"
          v-bind="mCustomBindins('cv-simple-filter')"
          v-on="mCustomOns('cv-simple-filter')"
          ref="simpleFilteRef"
          :cv-din-ins-icon-class="'q-mb-xs q-mr-sm'"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <!--TODO fix animation-->
      <q-slide-transition appear>
        <div>
          <ul
            v-show="cShowList"
            ref="listContainerReference"
            @mouseover="(()=>emListOnEmitter(true))"
            @mouseleave="emListLeaveEmitter"
            class="list-group"
            :class="{'b-none':!cdSourceRows,'of-y-hidden':cSourceRowsCount === 0}"
            :style="{'width':cdListWidth,'top':cdListTop}">
            <li
              class="list-group-item"
              v-for="(row, rowKey) in cSourceRows"
              @click="mSelect(rowKey,row)"
              :class="{'single-selected':mValueCallBack(cSourceRows,row)===cpDinInsCurrentValue,'current-cursor-item':cdCurrentItem===rowKey}"
              :key="mValueCallBack(cSourceRows,row) + '|' + rowKey"
              v-html="mShowPatter(mLabelCallBack(cSourceRows,row),mValueCallBack(cSourceRows,row)===cpDinInsCurrentValue)"
            >
            </li>

            <li
              v-if="cpDinInsLoading"
              class="list-group-item more-data-message"
            >
              <q-spinner-facebook :size="18" class="q-mx-md txt-secondary-l-30"/>
              <span class="txt-secondary-l-30">{{cLoadingLabel}}...</span>
            </li>

            <li
              v-if="cdSourceCount && cdSourceCount > cpDinInsListOfItemsLimit"
              class="list-group-item more-data-message"
            >
              <span class="txt-secondary-l-30">{{cMoreDataLabel}}</span>
            </li>

            <li
              v-if="cSourceRowsCount === 0"
              class="list-group-item more-data-message"
            >
              <div class="row w-100 h-40px">
                <span class="col-xs-8 txt-negative-l-30 my-auto">{{cNoDataLabel}}</span>
                <span v-if="cpStaInsEnableCreateButton" class="col-xs-4 my-auto t-right">
                  <q-btn
                    v-cv-can-access="cCreateAction"
                    class="m-auto"
                    v-if="1"
                    icon="fas fa-plus-circle"
                    @click="(()=>mInvokeActionDialog())"
                    color="secondary"
                    round
                    size="xs"
                    :title="cCreateMessage"
                  ></q-btn>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </q-slide-transition >

      <cv-action-dialog
        v-bind="mCustomBindins('cv-action-dialog')"
        v-on="mCustomOns('cv-action-dialog')"
        :cv-din-gen-dialog-action="cCreateAction">
      </cv-action-dialog>
    </div>
  </div>
</template>
<script>
import CvMatcherizer                from 'crudvuel-tools/src/components/matcherizer-components/CvMatcherizer'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvResourceComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentExtraSet'
import CvDialogComponentExtraSet    from 'crudvuel-tools/src/themes/quasar/components/sets/CvDialogComponentExtraSet'
import CvPaginateComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvPaginateComponentExtraSet'
import CvSimpleFilter               from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import CvActionDialog               from 'crudvuel-tools/src/themes/quasar/components/others/CvActionDialog'

import VueMirroring                 from 'crudvuel/mirroring/VueMirroring'
import {QIcon,QSlideTransition,QSpinner,QSpinnerFacebook,QBtn} from 'quasar'
let vueMirroring = new VueMirroring('Matcherizer')

export default {
  mixins: [
    CvMatcherizer,
    CvComponentExtraSet,
    CvResourceComponentExtraSet,
    CvPaginateComponentExtraSet,
    CvDialogComponentExtraSet,
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true},
      {CvActionDialog,root: true}
    )
  ],

  components: {
    CvSimpleFilter,
    QSlideTransition,
    QIcon,
    QSpinner,
    QSpinnerFacebook,
    QBtn,
    CvActionDialog
  },

  methods: {
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

    emStaGenActionCanceledProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(200).then(()=>{
          if (this.mSetShowActionDialog != null)
            this.mSetShowActionDialog(false)
          resolve(emitted)
        })
      })
    },

    emStaGenActionCompletedProccesor (emitted) {
      return new Promise((resolve,reject) => {
        this.mDelayer(200).then(()=>{
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

    mFixListStyle () {
      let node                    = this.$refs.filterReference
      let scrollTopFix            = 0

      //fix matcherizer integration inside dialogs
      if (node.parentElement && node.offsetParent) {
        do {
          if(node.scrollTop > 0)
            break
          //lastParentNode = node.parentElement
        } while (node = node.parentElement)
      }

      if (node && this.$refs.filterReference.offsetParent.classList.contains('q-dialog__inner'))
        scrollTopFix = node.scrollTop

      if (this.$refs.filterReference != null && this.$refs.filterReference.offsetWidth != null) {
        this.mSetListWidth(`${this.$refs.filterReference.offsetWidth}px`)
        let topMargin  = this.$refs.filterReference.clientHeight + this.$refs.filterReference.offsetTop - scrollTopFix
        this.mSetListTop(`${topMargin}px`)
      }
      else
        this.mSetListWidth('200px')

      this.mDirectionFix()

      return this
    }
  }
}
</script>
