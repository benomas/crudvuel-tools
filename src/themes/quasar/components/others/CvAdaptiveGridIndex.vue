<template>
  <div>
    <div class="row action-inner-container w-100">
      <cv-grid
        v-bind="mCustomBindins('cv-grid')"
        v-on="mCustomOns('cv-grid')"
        cv-grid-tag="div"
        :cv-min-height="'300px'">
        <div slot="cv-grid-predata-slot" class="w-100">
          <slot name="predata-slot">
          </slot>
        </div>

        <table class="q-table bordered horizontal-separator striped-even loose w-100" slot="cv-grid-data" :class="cpDinInsTableClass">
          <thead v-show="cShowTableMode">
            <tr slot="cv-ths-slot" >
              <slot name="headers-slot" >
              </slot>

              <th class="t-center t-middle mnw-170px" v-if="cpDinInsShowTableActions">
                <div v-if="cpDinInsShowTopActionLang" class="q-mr-sm fs-8 q-my-xs">{{ $tc('crudvuel.actions') }}</div>

                <q-btn
                  class="q-ma-xs bg-info-l-90 txt-info-l-66"
                  icon="fas fa-sync"
                  @click="(()=>emDinGenMsyncEmitter())"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-secondary-l-90 txt-secondary-l-66 f-rem-2">
                    {{mComLang('refresh','Recargar')}}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  v-if="!mExcludeAction('exportings')"
                  v-cv-can-access="'action:exportings'"
                  class="q-ma-xs bg-positive-l-90 txt-positive-l-45"
                  icon="far fa-file-excel"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'exportings'}))"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-positive-l-90 txt-positive-l-45 f-rem-2">
                    {{mResourceAction('exportings').label}}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  v-if="cHasImportAction"
                  v-cv-can-access="'action:import'"
                  class="q-ma-xs bg-positive-l-90 txt-positive-l-45"
                  icon="fas fa-file-import"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'import'}))"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-positive-l-90 txt-positive-l-45 f-rem-2">
                    {{mResourceAction('import').label}}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  v-if="!mExcludeAction('create')"
                  v-cv-can-access="'action:create'"
                  class="q-ma-xs bg-secondary-l-90 txt-secondary-l-66"
                  icon="fas fa-plus"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'create'}))"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-secondary-l-90 txt-secondary-l-66 f-rem-2">
                    {{mResourceAction('create').label}}
                  </q-tooltip>
                </q-btn>

                <slot name="extra-actions-header-slot" v-if="cpDinInsShowTableActions">
                </slot>
              </th>
            </tr>
          </thead>

          <thead v-show="cShowTableMode" class="sub-header" >
            <slot name="sub-headers-slot" >
            </slot>
          </thead>

          <transition-group
            v-show="cShowTableMode"
            tag="tbody"
            :enter-active-class="cdPageAnimation"
            :duration="{ enter: 500, leave: 0 }">
            <tr v-for="(gridRow, position) in cvDinInsfAdaptiveGridIndexGridRows" :key="position + '|' +gridRow[cpDinGenKeyName]">
              <slot name="table-properties-slot" :slot-row="gridRow" >
              </slot>

              <td  v-if="cpDinInsShowActiveTableActions && gridRow.active != null" class="t-center t-middle">
                <div
                  v-if="!mExcludeAction('deactivate') && gridRow.active"
                  @click="(()=>{
                    temp = 'deactivateRow'
                    emDinGenLaunchActionEmitter({action:'deactivate',row:gridRow})
                  })"
                >
                  <q-icon
                    class="active-icon f-bold"
                    name="icon-check"
                    color="positive"
                  />
                  <q-tooltip content-class="bg-negative-l-90 txt-negative-l-45 f-rem-2">
                    {{mResourceAction('deactivate').label}}
                  </q-tooltip>
                </div>

                <div
                  v-if="!mExcludeAction('deactivate') && !gridRow.active"
                  @click="(()=>{
                    temp = 'activateRow'
                    emDinGenLaunchActionEmitter({action:'activate',row:gridRow})
                  })"
                >
                  <q-icon
                    class="active-icon f-bold"
                    name="icon-cerrar"
                    color="negative"
                  />
                  <q-tooltip content-class="bg-positive-l-90 txt-positive-l-45 f-rem-2">
                    {{mResourceAction('activate').label}}
                  </q-tooltip>
                </div>
              </td>

              <td class="t-center t-middle" v-if="cpDinInsShowTableActions">
                <q-btn
                  v-if="!mExcludeAction('show') && (mExcludeAction('edit') || !mHasActionPermission('edit'))"
                  v-cv-can-access="'action:show'"
                  icon="icon-ver"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'show',row:gridRow}))"
                  class="q-ma-xs bg-info-l-90 txt-info-l-45"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-info-l-90 txt-info-l-45 f-rem-2">
                    {{mDepthLang('crudvuel.labels.showPrefix')}} {{mResourceAction('show').label}}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  v-if="!mExcludeAction('edit')"
                  v-cv-can-access="'action:edit'"
                  icon="icon-editar"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'edit',row:gridRow}))"
                  class="bg-positive-l-90 txt-positive-l-45 q-ma-xs"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-positive-l-90 txt-positive-l-45 f-rem-2">
                    {{mResourceAction('edit').label}}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  v-if="!mExcludeAction('delete')"
                  v-cv-can-access="'action:delete'"
                  icon="icon-borrar"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'delete',row:gridRow}))"
                  class="bg-negative-l-90 txt-negative-l-45 q-ma-xs"
                  round
                  size="sm"
                >
                  <q-tooltip content-class="bg-negative-l-90 txt-negative-l-45 f-rem-2">
                    {{mResourceAction('delete').label}}
                  </q-tooltip>
                </q-btn>

                <slot name="table-extra-actions-slot" :slot-row="gridRow">
                </slot>
              </td>
            </tr>
          </transition-group>

          <div class="q-ma-sm" v-show="cShowGridMode" >
            <div class="row w-100 q-mb-md" v-if="cpDinInsShowTableActions">
              <slot  name="flexi-grind-header-create-slot">
                <div class="w-100 t-right">
                  <q-btn
                    class="q-ma-xs bg-info-l-90 txt-info-l-66"
                    icon="fas fa-sync"
                    @click="(()=>emDinGenMsyncEmitter())"
                    round
                    size="sm"
                  >
                    <q-tooltip content-class="bg-secondary-l-90 txt-secondary-l-45 f-rem-2">
                    {{mComLang('refresh','Recargar')}}
                    </q-tooltip>
                  </q-btn>

                  <q-btn
                    v-if="!mExcludeAction('exportings')"
                    v-cv-can-access="'action:exportings'"
                    class="q-ma-xs bg-positive-l-90 txt-positive-l-45"
                    icon="fas fa-file-excel"
                    @click="(()=>emDinGenLaunchActionEmitter({action:'exportings'}))"
                    round
                    size="sm"
                  >
                    <q-tooltip content-class="bg-positive-l-90 txt-positive-l-45 f-rem-2">
                      {{mResourceAction('exportings').label}}
                    </q-tooltip>
                  </q-btn>

                  <q-btn
                    v-if="!mExcludeAction('create')"
                    v-cv-can-access="'action:create'"
                    class="q-ma-xs bg-secondary-l-90 txt-secondary-l-66"
                    icon="fas fa-plus"
                    @click="(()=>emDinGenLaunchActionEmitter({action:'create'}))"
                    round
                    size="sm"
                  >
                    <q-tooltip content-class="bg-secondary-l-90 txt-secondary-l-45 f-rem-2">
                      {{mResourceAction('create').label}}
                    </q-tooltip>
                  </q-btn>
                </div>
              </slot>
            </div>

            <div class="q-card row w-100 round-borders q-pa-sm" v-if="cpDinInsShowGridFilterAndOrders">
              <div class="row w-100">
                <q-expansion-item
                  class="w-100"
                  :header-class="'w-100 txt-secondary'"
                  icon="fas fa-filter"
                  :label="mComLang('filter','Filtros')"
                >
                  <div class="q-pa-sm">
                    <slot  name="flexi-grind-headers-slot">
                    </slot>
                  </div>
                </q-expansion-item>
              </div>
            </div>
          </div>

          <transition-group
            v-show="cShowGridMode"
            tag="div"
            class="row"
            :enter-active-class="cdPageAnimation"
            :duration="{ enter: 500, leave: 0 }">
            <div :class="cpDinInsCardContainerClass" v-for="(gridRow, position) in cvDinInsfAdaptiveGridIndexGridRows" :key="position + '|' +gridRow[cpDinGenKeyName]">
              <div class="row col-xs-12 q-pa-sm">
                <q-card :class="cpDinInsCardClass">
                  <div class="w-100 h-50px q-pa-xs" v-if="cpDinInsShowGridKey">
                    <q-chip class="f-right bg-secondary-l-87 txt-white t-right">
                      <span class="f-left txt-red q-mr-lg f-bold">{{ mfLang(cKeyName) }}</span>
                      <q-avatar
                        class="bg-secondary txt-white"
                        style="margin-right: -12px;"
                        >
                        {{gridRow[cKeyName]}}
                      </q-avatar>
                    </q-chip>
                  </div>

                  <div :class="cpDinInsCardContentClass" class="mxh-300px of-y-auto">
                    <slot name="flexi-properties-slot" :slot-row="gridRow">
                    </slot>
                  </div>

                  <div class="absolute-bottom"  v-if="cpDinInsShowGridActions">
                    <q-card-section :class="cpDinInsActionCardTitleClass">
                      {{ $tc('crudvuel.actions') }}
                    </q-card-section>
                    <q-card-actions :class="cpDinInsActionCardClass" >
                      <q-btn
                        v-if="!mExcludeAction('show') && (mExcludeAction('edit') || !mHasActionPermission('edit'))"
                        v-cv-can-access="'action:show'"
                        icon="icon-ver"
                        @click="(()=>emDinGenLaunchActionEmitter({action:'show',row:gridRow}))"
                        class="bg-info-l-90 txt-info-l-45"
                        round
                        size="sm"
                      >
                        <q-tooltip content-class="bg-info-l-90 txt-info-l-45 f-rem-2">
                          {{mDepthLang('crudvuel.labels.showPrefix')}} {{mResourceAction('show').label}}
                        </q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="!mExcludeAction('edit')"
                        v-cv-can-access="'action:edit'"
                        icon="icon-editar"
                        @click="(()=>emDinGenLaunchActionEmitter({action:'edit',row:gridRow}))"
                        class="bg-positive-l-90 txt-positive-l-45"
                        round
                        size="sm"
                      >
                        <q-tooltip content-class="bg-positive-l-90 txt-positive-l-45 f-rem-2">
                          {{mResourceAction('edit').label}}
                        </q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="!mExcludeAction('delete')"
                        v-cv-can-access="'action:delete'"
                        icon="fas icon-borrar"
                        @click="(()=>emDinGenLaunchActionEmitter({action:'delete',row:gridRow}))"
                        class="bg-negative-l-90 txt-negative-l-45"
                        round
                        size="sm"
                      >
                        <q-tooltip content-class="bg-negative-l-90 txt-negative-l-45 f-rem-2">
                          {{mResourceAction('delete').label}}
                        </q-tooltip>
                      </q-btn>

                      <slot name="flexi-extra-actions-slot" :slot-row="gridRow">
                      </slot>
                    </q-card-actions>
                  </div>
                </q-card>
              </div>
            </div>
          </transition-group>
        </table>
      </cv-grid>
    </div>
  </div>
</template>
<script>
import {
  QItemLabel,
  QItemSection,
  QSeparator,
  QCardSection,
  QBtn,
  QIcon,
  QCard,
  QCardActions,
  QAvatar,
  QChip,
  QExpansionItem,
  QTooltip
} from 'quasar'
import VueMirroring             from 'crudvuel/mirroring/VueMirroring'
import CvComponentSet           from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import CvActionComponentSet     from 'crudvuel-tools/src/themes/quasar/components/sets/CvActionComponentSet'
import CvMultiRowComponentSet   from 'crudvuel-tools/src/themes/quasar/components/sets/CvMultiRowComponentSet'
import CvGrid                   from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvGrid'

let vueMirroring = new VueMirroring('AdaptiveGridIndex')

export default {
  mixins     : [
    CvComponentSet,
    CvMultiRowComponentSet,
    CvActionComponentSet,
    vueMirroring.fixProperties({
      '[D|M]pageAnimation'               : 'animated fadeIn',
      '[P]dinGenExcludeActions'          : [],
      '[P]dinInsShowTableMode'           : true,
      '[P]dinInsShowGridMode'            : true,
      '[P]dinInsShowTableActions'        : true,
      '[P]dinInsShowActiveTableActions'  : true,
      '[P]dinInsShowGridActions'         : true,
      '[P]dinInsShowGridFilterAndOrders' : true,
      '[P]dinInsShowTopActionLang'       : true,
      '[P]dinInsShowGridKey'             : true,
      '[P]dinInsCardContainerClass'      : 'row col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2',
      '[P]dinInsCardClass'               : 'q-card w-100 round-borders mnh-400px',
      '[P]dinInsCardContentClass'        : '',
      '[P]dinInsActionCardTitleClass'    : 'bg-white bb-1px border-secondary-l-90',
      '[P]dinInsActionCardClass'         : 'row justify-start bg-secondary-l-96',
      '[P]dinInsActionCardContentClass'  : '',
      '[P]dinInsTableClass'              : '',
      '[EM]dinGenLaunchAction'           : null
    }),
    vueMirroring.assimilate(
      {CvGrid}
    )
  ],

  components : {
    QItemLabel,
    QItemSection,
    QSeparator,
    QCardSection,
    CvGrid,
    QBtn,
    QIcon,
    QCard,
    QCardActions,
    QAvatar,
    QChip,
    QExpansionItem,
    QTooltip
  },

  computed: {
    cShowTableMode () {
      if (this.cpDinInsShowGridMode === false)
        return true
      return this.cpDinInsShowTableMode && this.cGtsm
    },

    cShowGridMode () {
      if (this.cpDinInsShowTableMode === false)
        return true
      return this.cpDinInsShowGridMode && this.cLtmd
    },

    cHasImportAction () {
      if (this.cResource == null || this.cResource.actions == null || this.cResource.actions.import == null)
        return false

      return true
    }
  },

  methods: {
    emStaComfCvPaginatePageNavDownProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetPageAnimation('animated slideInDown')
        resolve(emitted)
      })
    },

    emStaComfCvPaginatePageNavUpProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetPageAnimation('animated slideInUp')
        resolve(emitted)
      })
    },

    emStaComfCvPaginatePageNavNeutralProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        this.mSetPageAnimation('animated fadeIn')
        resolve(emitted)
      })
    },

    emDinGenLaunchActionProccesor (emitted) {
      return new Promise((resolve, reject) => {
        resolve(emitted)
      })
    },

    mComponentInitialize () {
      return new Promise((resolve, reject) => {
        this.emDinInsfAdaptiveGridIndexGridFilterSelectorCurrentFilterEmitter('cv-simple-paginator')
        this.$nextTick(() => {
          this.mSetReady()
          resolve()
        })
      })
    },

    mExcludeAction (action) {
      return this.cpDinGenExcludeActions.find(element => element === action)
    }
  }
}
</script>
