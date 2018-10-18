<template>
  <cv-action-container v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-title-slot" class="row action-label">
      <div class="col-xs-10 col-sm-9 col-md-8  q-pb-md">
        <label>
          <span class="q-headline txt-secondary">
            {{action.label}}
          </span>
        </label>
      </div>
      <div class="col-xs-2 col-sm-3 col-md-4 lt-lg">
        <slot :offset="[18, 30]" name="flexi-extra-actions-header-slot">
          <div class="f-right">
            <q-btn
              v-if="hasPermission('create')"
              icon="add_circle_outline"
              @click="$router.push(actionPath('create'))"
              color="secondary"
              round
              small
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
        :cv-simple-search-icon="cLtmd?'fas fa-search':''"
        :cv-simple-search-label="cGtsm?$tc('crudvuel.labels.crudvuelGrid.searchLabel'):''">
        <table class="q-table bordered horizontal-separator striped-even loose w-100" slot="cv-grid-data" >
          <cv-ths cv-tag="thead" class="gt-md">
            <tr slot="cv-ths-slot" cv-role="cv-header-config">
              <slot name="headers-slot" :grid-data="mainGridData">
              </slot>
              <th  class="t-center t-middle">
                {{ $tc('crudvuel.actions') }}
                <q-btn
                  v-if="hasPermission('create')"
                  icon="add_circle_outline"
                  @click="$router.push(actionPath('create'))"
                  color="secondary"
                  round
                  small
                  :title="resorceAction('create').label"
                ></q-btn>
                <slot name="extra-actions-header-slot" :grid-data="mainGridData">
                </slot>
              </th>
            </tr>
          </cv-ths>
          <transition-group
            v-if="mainGridData"
            v-show="cGtmd"
            tag="tbody"
            :enter-active-class="pageAnimation"
            :duration="{ enter: 500, leave: 0 }">
            <tr v-for="gridRow in mainGridData.rows" :key="gridRow[rowKey]">
              <slot name="table-properties-slot" :slot-row="gridRow">
              </slot>
              <td  v-if="typeof gridRow.active!=='undefined' && cGtxs" class="t-left t-middle">
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
                  icon="visibility"
                  @click="$router.push(actionPath('show',gridRow))"
                  color="info"
                  round
                  small
                  :title="resorceAction('show').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                ></q-btn>
                <q-btn
                  v-if="hasPermission('edit')"
                  icon="edit"
                  @click="$router.push(actionPath('edit',gridRow))"
                  color="positive"
                  round
                  small
                  :title="resorceAction('edit').label"
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
                  :title="resorceAction('delete').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                >
                </q-btn>
                <slot name="table-extra-actions-slot" :slot-row="gridRow">
                </slot>
              </td>
            </tr>
          </transition-group>
          <transition-group
            v-if="mainGridData"
            v-show="cLtlg"
            tag="div"
            class="row"
            :enter-active-class="pageAnimation"
            :duration="{ enter: 500, leave: 0 }">
            <div class="row col-md-3 col-sm-6 col-xs-12 q-pa-sm" v-for="gridRow in mainGridData.rows" :key="gridRow[rowKey]">
              <div class="row col-xs-12 q-pa-sm">
                <q-card class="w-100 round-borders" dense >
                  <slot name="flexi-properties-slot" :slot-row="gridRow">
                  </slot>
                  <q-card-title>
                    {{ $tc('crudvuel.actions') }}
                  </q-card-title>
                  <q-card-actions class="bg-tertiary-l-90">
                    <q-btn
                      v-if="hasPermission('show')"
                      icon="visibility"
                      @click="$router.push(actionPath('show',gridRow))"
                      color="info"
                      round
                      small
                      :title="resorceAction('show').label"
                      v-cv-in-progress="isSynchronizing(gridRow)"
                      :disabled="isSynchronizing(gridRow)"
                    ></q-btn>
                    <q-btn
                      v-if="hasPermission('edit')"
                      icon="edit"
                      @click="$router.push(actionPath('edit',gridRow))"
                      color="positive"
                      round
                      small
                      :title="resorceAction('edit').label"
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
                      :title="resorceAction('delete').label"
                      v-cv-in-progress="isSynchronizing(gridRow)"
                      :disabled="isSynchronizing(gridRow)"
                    >
                    </q-btn>
                    <slot name="flexi-extra-actions-slot" :slot-row="gridRow">
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
  QCardActions,
  QCardTitle,
  QList,
  QItem,
  QItemMain,
  QItemSide,
  QItemSeparator,
  QItemTile
} from 'quasar'
import CvNotify from './CvNotify.js'
import CvIndex  from 'src/crudvuel/customs/themes/quasar/components/resource/CvIndex'
import CvGrid    from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvGrid'
export default {
  extends    : CvIndex,
  components : {
    Dialog,
    QIcon,
    QBtn,
    CvGrid,
    QCard,
    QCardActions,
    QCardTitle,
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemSeparator,
    QItemTile
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
      }).then(() => {
        resorceAction.setService(gridRow[this.cRowKey]).then((response) => {
          this.synchronized(gridRow)
          this.mainGridData.refresh()
          this.collectSuccessMessages(resorceAction.getSetSuccessMessage() + this.actionKeyMessage(gridRow))
        }).catch(response => false)
      }).catch(() => {
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
<style lang="stylus" scoped>
  @import '~variables'
  .cv-grid-container
    width:100%
  .q-btn
    height : 2rem
    width  : 2rem
  .in-progress-cursor
    cursor: progress !important
    &:disabled
      cursor: progress !important
  tr
    border-bottom: 1px solid $grey
  td,th
    & button
      &.q-btn
        padding: 4px 14px !important
  .h5
    margin: 0 0 !important
  .border-all
    border:1px solid $grey
  .q-btn-round
    margin:1px
</style>
