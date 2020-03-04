<template>
  <div class="cv-matcherizer-container w-100">
    <div
      class="list-items"
    >
      <div
        ref="filterReference"
      >
      <!--
        {{cdSearchFocus}}--
        {{cShowList}}--
        {{cdListOn}}--
        {{cdSearchContinue}}--
        {{cdSearchOn}}--
        {{cdCurrentItem}}---->
        <cv-simple-filter
          class="w-100"
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
              v-if="cShowList"
              @mouseover="(()=>emListOnEmitter(true))"
              @mouseleave="emListLeaveEmitter"
              class="list-group"
              :class="{'b-none':!cdSourceRows}"
              :style="{'width':cdListWidth}"
            >
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
                <span class="txt-negative-l-30">{{cNoDataLabel}}</span>
              </li>
            </ul>
          </div>
        </q-slide-transition >
    </div>
  </div>
</template>
<script>
import CvMatcherizer                from 'crudvuel-tools/src/components/matcherizer-components/CvMatcherizer'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvResourceComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentExtraSet'
import CvPaginateComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvPaginateComponentExtraSet'
import CvSimpleFilter               from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import VueMirroring                 from 'crudvuel/mirroring/VueMirroring'
import {QIcon,QSlideTransition,QSpinner,QSpinnerFacebook} from 'quasar'
let vueMirroring = new VueMirroring('Matcherizer')

export default {
  mixins: [
    CvMatcherizer,
    CvComponentExtraSet,
    CvResourceComponentExtraSet,
    CvPaginateComponentExtraSet,
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true}
    )
  ],

  components: {
    CvSimpleFilter,
    QSlideTransition,
    QIcon,
    QSpinner,
    QSpinnerFacebook
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
        this.mSetSearchFocus(true).mFixListWidth().emDinInsLoadingEmitter(true)
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
    }
  }
}
</script>
