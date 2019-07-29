<template>
  <cv-action-container class="cv-adaptative-grid-index" v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-title-slot" class="row action-label">
      <div class="col-xs-10 col-sm-9 col-md-8  q-pb-md">
        <label>
          <span class="q-headline txt-secondary">
            {{action.label}}
          </span>
        </label>
      </div>
      <div class="col-xs-2 col-sm-3 col-md-4 lt-md">
        <slot :offset="[18, 30]" name="flexi-extra-actions-header-slot">
          <div class="f-right">
            <q-btn
              v-if="hasPermission('create')"
              icon="fas fa-plus-circle"
              @click="$router.push(actionPath('create'))"
              color="secondary"
              round
              size="sm"
              :title="resorceAction('create').label"
            ></q-btn>
          </div>
        </slot>
      </div>
    </div>
  <!-- cv-grid-customization-->
    <div slot="cv-content-slot" class="row action-inner-container w-100">
      <cv-grid
        cv-tag="div"
        :cv-service="action.getService"
        :cv-top-paginate="true"
        :cv-bottom-paginate="true"
        :cv-pages-per-view="5"
        :cv-limit-values="[8,10,20,30,50,100,200]"
        :cv-limit="8"
        @initial-mutation="ready=false;"
        :ref="gridRef"
        :cv-min-height="'300px'"
        @page-nave-up="pageAnimation='animated slideInUp'"
        @page-nave-down="pageAnimation='animated slideInDown'"
        @page-nave-neutral="pageAnimation='animated fadeIn'"
        :cv-search-icon="cLtmd?'fas fa-search':''"
        :cv-search-label="cGtsm?$tc('crudvuel.labels.crudvuelGrid.searchLabel'):''">
        <table class="q-table bordered horizontal-separator striped-even loose w-100" slot="cv-grid-data" >
          <cv-ths cv-tag="thead" class="gt-sm" v-show="!cDisableGrid">
            <tr slot="cv-ths-slot" cv-role="cv-header-config">
              <slot name="headers-slot" :grid-data="mainGridData" :slot-component-ref="cSelfRef">
              </slot>
              <th  class="t-center t-middle">
                {{ $tc('crudvuel.actions') }}
                <q-btn
                  v-if="hasPermission('create')"
                  icon="fas fa-plus-circle"
                  @click="$router.push(actionPath('create'))"
                  color="secondary"
                  round
                  size="sm"
                  :title="resorceAction('create').label"
                ></q-btn>
                <slot name="extra-actions-header-slot" :grid-data="mainGridData" :slot-component-ref="cSelfRef">
                </slot>
              </th>
            </tr>
          </cv-ths>
          <transition-group
            v-if="mainGridData && !cDisableGrid"
            v-show="cvForceGrid || cGtmd"
            tag="tbody"
            :enter-active-class="pageAnimation"
            :duration="{ enter: 500, leave: 0 }">
            <tr v-for="(gridRow, position) in mainGridData.rows" :key="position + '|' +gridRow[rowKey]">
              <slot name="table-properties-slot" :slot-row="gridRow" :grid-data="mainGridData" :slot-component-ref="cSelfRef">
              </slot>
              <td  v-if="typeof gridRow.active!=='undefined' && cGtxs" class="t-center t-middle">
                <div
                    v-if="gridRow.active"
                    @click="temp = 'deactivateRow'; deactivateRow(gridRow)"
                >
                  <q-icon
                    class="active-icon"
                    name="fas fa-check"
                    color="positive"
                    :title="resorceAction('deactivate').label"
                    v-cv-in-progress="isSynchronizing(gridRow)"
                    :disabled="isSynchronizing(gridRow)"
                  />
                </div>
                <div
                    v-if="!gridRow.active"
                    @click="temp = 'activateRow'; activateRow(gridRow)"
                >
                  <q-icon
                    v-if="!gridRow.active"
                    class="active-icon"
                    name="fas fa-times-circle"
                    color="negative"
                    @click="temp = 'activateRow'; activateRow(gridRow)"
                    :title="resorceAction('activate').label"
                    v-cv-in-progress="isSynchronizing(gridRow)"
                    :disabled="isSynchronizing(gridRow)"
                  />
                </div>
              </td>
              <td class="t-center t-middle">
                <q-btn
                  v-if="hasPermission('show')"
                  icon="fas fa-eye"
                  @click="$router.push(actionPath('show',gridRow))"
                  color="info"
                  round
                  size="sm"
                  :title="resorceAction('show').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                ></q-btn>
                <q-btn
                  v-if="hasPermission('edit')"
                  icon="fas fa-pencil-alt"
                  @click="$router.push(actionPath('edit',gridRow))"
                  color="positive"
                  round
                  size="sm"
                  :title="resorceAction('edit').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                ></q-btn>
                <q-btn
                  v-if="hasPermission('delete')"
                  icon="fas fa-trash-alt"
                  @click="deleteRow(gridRow)"
                  color="negative"
                  round
                  size="sm"
                  :title="resorceAction('delete').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                >
                </q-btn>
                <slot name="table-extra-actions-slot" :slot-row="gridRow"  :grid-data="mainGridData" :slot-component-ref="cSelfRef">
                </slot>
              </td>
            </tr>
          </transition-group>
          <transition-group
            v-if="mainGridData && !cvDisableCards"
            v-show="cvForceCards || cLtlg"
            tag="div"
            class="row"
            :enter-active-class="pageAnimation"
            :duration="{ enter: 500, leave: 0 }">
            <div :class="cCardContainerClass" v-for="gridRow in mainGridData.rows" :key="gridRow[rowKey]">
              <div class="row col-xs-12 q-pa-sm">
                <q-card dense :class="cCardClass">
                  <slot name="flexi-properties-slot" :slot-row="gridRow"  :grid-data="mainGridData" :slot-component-ref="cSelfRef">
                  </slot>
                  <q-card-section :class="cActionCardTitleClass">
                    {{ $tc('crudvuel.actions') }}
                  </q-card-section>
                  <q-card-actions :class="cActionCardClass" >
                    <q-btn
                      v-if="hasPermission('show')"
                      icon="fas fa-eye"
                      @click="$router.push(actionPath('show',gridRow))"
                      color="info"
                      round
                      size="sm"
                      :title="resorceAction('show').label"
                      v-cv-in-progress="isSynchronizing(gridRow)"
                      :disabled="isSynchronizing(gridRow)"
                    ></q-btn>
                    <q-btn
                      v-if="hasPermission('edit')"
                      icon="fas fa-pencil-alt"
                      @click="$router.push(actionPath('edit',gridRow))"
                      color="positive"
                      round
                      size="sm"
                      :title="resorceAction('edit').label"
                      v-cv-in-progress="isSynchronizing(gridRow)"
                      :disabled="isSynchronizing(gridRow)"
                    ></q-btn>
                    <q-btn
                      v-if="hasPermission('delete')"
                      icon="fas fa-trash-alt"
                      @click="deleteRow(gridRow)"
                      color="negative"
                      round
                      size="sm"
                      :title="resorceAction('delete').label"
                      v-cv-in-progress="isSynchronizing(gridRow)"
                      :disabled="isSynchronizing(gridRow)"
                    >
                    </q-btn>
                    <slot name="flexi-extra-actions-slot" :slot-row="gridRow"  :grid-data="mainGridData" :slot-component-ref="cSelfRef">
                    </slot>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </transition-group>
        </table>
      </cv-grid>
    </div>
  </cv-action-container>
</template>
<script>
import {
  Dialog,
  QBtn,
  QIcon,
  QCard,
  QList,
  QItem,
  QItemLabel,
  QItemSection,
  QSeparator,
  QCardSection
} from 'quasar'
import CvNotify from './CvNotify.js'
import CvIndex  from '../resource/CvIndex'
import CvGrid    from '../grid-components/CvGrid'
export default {
  extends    : CvIndex,
  components : {
    Dialog,
    QIcon,
    QBtn,
    CvGrid,
    QCard,
    QList,
    QItem,
    QItemLabel,
    QItemSection,
    QSeparator,
    QCardSection
  },
  data () {
    return {
      temp          : null,
      pageAnimation : 'animated fadeIn'
    }
  },
  props:[
    'cvForceCards',
    'cvForceGrid',
    'cvDisableCards',
    'cvDisableGrid',
    'cvCardClass',
    'cvActionCardClass',
    'cvCardContainerClass',
    'cvActionCardTitleClass'
  ],
  computed:{
    cForceCards: function () {
      return this.cvForceCards
    },
    cForceGrid: function () {
      return this.cvForceGrid
    },
    cDisableCards: function () {
      return this.cvDisableCards
    },
    cDisableGrid: function () {
      return this.cvDisableGrid
    },
    cCardClass: function () {
      return this.cvCardClass || {'w-100 round-borders':'true'}
    },
    cActionCardClass: function () {
      return this.cvActionCardClass || {'bg-tertiary-l-90':'true'}
    },
    cCardContainerClass: function () {
      return this.cvCardContainerClass || {'row col-md-12 col-sm-6 col-xs-12 q-pa-sm':true}
    },
    cActionCardTitleClass: function () {
      return this.cvActionCardTitleClass || {'':true}
    }
  },
  methods: {
    activateRow: function (gridRow) {
      if (!this.hasPermission('activate'))
        return false
      if (this.isSynchronizing(gridRow))
        return false
      this.toSync(gridRow)
      let resorceAction = this.resorceAction('activate')
      resorceAction.setService(gridRow[this.cRowKey]).then((response) => {
        this.synchronized(gridRow)
        this.mainGridData.refresh()
        this.collectSuccessMessages(resorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
      }).catch((response) => {
        this.synchronized(gridRow)
        this.collectErrorMessages(resorceAction.getSetErrorMessage() + this.actionKeyMessage(gridRow))
      })
    },
    deactivateRow: function (gridRow) {
      if (!this.hasPermission('deactivate'))
        return false
      if (this.isSynchronizing(gridRow))
        return false
      this.toSync(gridRow)
      let resorceAction = this.resorceAction('deactivate')
      resorceAction.setService(gridRow[this.cRowKey]).then((response) => {
        this.synchronized(gridRow)
        this.mainGridData.refresh()
        this.collectSuccessMessages(resorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
      }).catch((response) => {
        this.synchronized(gridRow)
        this.collectErrorMessages(resorceAction.getSetErrorMessage() + this.actionKeyMessage(gridRow))
      })
    },
    deleteRow (gridRow) {
      let resorceAction = this.resorceAction('delete')
      this.toSync(gridRow)
      this.$q.dialog({
        title   : resorceAction.label + ' ' + this.cRowKey + ':' + gridRow[this.cRowKey],
        message : resorceAction.confirmLabel,
        ok      : resorceAction.nextLabel,
        cancel  : resorceAction.backLabel
      }).onOk(() => {
        resorceAction.setService(gridRow[this.cRowKey]).then((response) => {
          this.synchronized(gridRow)
          this.mainGridData.refresh()
          this.collectSuccessMessages(resorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
        }).catch(response => false)
      }).onCancel(() => {
        this.synchronized(gridRow)
        this.collectCancelMessages(resorceAction.getSetCancelMessage() + this.actionKeyMessage(gridRow))
      })
    },
    successNotification: function () {
      if (this.successNotificationMessages) {
        CvNotify.createPositive(this.successNotificationMessages)
        this.successNotificationMessages = null
      }
    },
    errorNotification: function () {
      if (this.errorNotificationMessages) {
        CvNotify.createNegative(this.errorNotificationMessages)
        this.errorNotificationMessages = null
      }
    },
    cancelNotification: function () {
      if (this.cancelNotificationMessages) {
        CvNotify.createWarning(this.cancelNotificationMessages)
        this.cancelNotificationMessages = null
      }
    }
  },
  created: function () {
    // console.log("Is mobile " + this.isMobile)
  }
}
</script>
