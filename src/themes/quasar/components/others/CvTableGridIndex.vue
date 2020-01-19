<template>
  <cv-action-container class="cv-table-grid-index" v-if="cResource && cpAction" v-bind="defActionProps()">
  <!-- cv-grid-customization-->
    <div slot="cv-content-slot" class="row action-inner-container">
      <cv-grid
        cv-tag="div"
        :cv-service="cpAction.getService"
        :cv-top-paginate="true"
        :cv-bottom-paginate="true"
        :cv-pages-per-view="7"
        :cv-limit-values="[5,10,20,30,50,100,200]"
        :cv-limit="5"
        @initial-mutation="ready=false;"
        :ref="gridRef"
        :cv-min-height="'300px'"
        @page-nave-up="pageAnimation='animated slideInUp'"
        @page-nave-down="pageAnimation='animated slideInDown'"
        @page-nave-neutral="pageAnimation='animated fadeIn'"
      >
        <table class="q-table bordered horizontal-separator striped-even loose w-100" slot="cv-grid-data" >
          <cv-ths cv-tag="thead">
            <tr slot="cv-ths-slot" cv-role="cv-header-config">
              <slot name="headers-slot" :grid-data="mainGridData">
              </slot>
              <th  class="t-center t-middle">
                {{ $tc('crudvuel.actions') }}
                <q-btn
                  v-if="hasPermission('create')"
                  icon="add_circle_outline"
                  @click="$router.push(mActionPath('create'))"
                  color="f-color"
                  round
                  small
                  :title="mResorceAction('create').label"
                ></q-btn>
                <slot name="extra-actions-header-slot" :grid-data="mainGridData">
                </slot>
              </th>
            </tr>
          </cv-ths>
          <transition-group
            v-if="mainGridData"
            tag="tbody"
            :enter-active-class="pageAnimation"
            :duration="{ enter: 500, leave: 0 }"
          >
            <tr v-for="(gridRow, gridRowKey) in mainGridData.rows" :key="gridRow[rowKey]">
              <slot name="properties-slot" :slot-row="gridRow">
              </slot>
              <td  v-if="typeof gridRow.active!=='undefined' && cGtxs" class="t-left t-middle">
                <div
                    v-if="gridRow.active"
                    @click="temp = 'deactivateRow'; deactivateRow(gridRow)"
                >
                  <q-icon
                    class="active-icon"
                    name="fa-check"
                    color="positive"
                    :title="mResorceAction('deactivate').label"
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
                    name="fa-times-circle"
                    color="negative"
                    @click="temp = 'activateRow'; activateRow(gridRow)"
                    :title="mResorceAction('activate').label"
                    v-cv-in-progress="isSynchronizing(gridRow)"
                    :disabled="isSynchronizing(gridRow)"
                  />
                </div>
              </td>
              <td class="t-center t-middle">
                <q-btn
                  v-if="hasPermission('show')"
                  icon="visibility"
                  @click="$router.push(mActionPath('show',gridRow))"
                  color="info"
                  round
                  small
                  :title="mResorceAction('show').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                ></q-btn>
                <q-btn
                  v-if="hasPermission('edit')"
                  icon="edit"
                  @click="$router.push(mActionPath('edit',gridRow))"
                  color="positive"
                  round
                  small
                  :title="mResorceAction('edit').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                ></q-btn>
                <q-btn
                  v-if="hasPermission('delete')"
                  icon="delete"
                  @click="deleteRow(gridRow)"
                  color="negative"
                  round
                  small
                  :title="mResorceAction('delete').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                >
                </q-btn>
                <slot name="extra-actions-slot" :slot-row="gridRow">
                </slot>
              </td>
            </tr>
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
  QIcon
} from 'quasar'
import CvNotify from './CvNotify.js'
import CvIndex  from '../resource/CvIndex'
import CvGrid    from '../grid-components/CvGrid'
export default {
  extends    : CvIndex,
  components : {
    QIcon,
    QBtn,
    CvGrid
  },
  data () {
    return {
      temp          : null,
      pageAnimation : 'animated fadeIn'
    }
  },
  methods: {
    activateRow: function (gridRow) {
      if (!this.hasPermission('activate'))
        return false
      if (this.isSynchronizing(gridRow))
        return false
      this.toSync(gridRow)
      let mResorceAction = this.mResorceAction('activate')
      mResorceAction.setService(gridRow[this.cRowKey]).then((response) => {
        this.synchronized(gridRow)
        this.mainGridData.refresh()
        this.collectSuccessMessages(mResorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
      }).catch((response) => {
        this.synchronized(gridRow)
        this.collectErrorMessages(mResorceAction.getSetErrorMessage() + this.actionKeyMessage(gridRow))
      })
    },
    deactivateRow: function (gridRow) {
      if (!this.hasPermission('deactivate'))
        return false
      if (this.isSynchronizing(gridRow))
        return false
      this.toSync(gridRow)
      let mResorceAction = this.mResorceAction('deactivate')
      mResorceAction.setService(gridRow[this.cRowKey]).then((response) => {
        this.synchronized(gridRow)
        this.mainGridData.refresh()
        this.collectSuccessMessages(mResorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
      }).catch((response) => {
        this.synchronized(gridRow)
        this.collectErrorMessages(mResorceAction.getSetErrorMessage() + this.actionKeyMessage(gridRow))
      })
    },
    deleteRow (gridRow) {
      let mResorceAction = this.mResorceAction('delete')
      this.toSync(gridRow)
      this.$q.dialog({
        title   : mResorceAction.label + ' ' + this.cRowKey + ':' + gridRow[this.cRowKey],
        message : mResorceAction.confirmLabel,
        ok      : mResorceAction.nextLabel,
        cancel  : mResorceAction.backLabel
      }).then(() => {
        mResorceAction.setService(gridRow[this.cRowKey]).then((response) => {
          this.synchronized(gridRow)
          this.mainGridData.refresh()
          this.collectSuccessMessages(mResorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
        }).catch(response => false)
      }).catch(() => {
        this.synchronized(gridRow)
        this.collectCancelMessages(mResorceAction.getSetCancelMessage() + this.actionKeyMessage(gridRow))
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
