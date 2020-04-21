<template>
  <div>
    <div class="row action-inner-container w-100">
      <cv-grid
        v-bind="mCustomBindins('cv-grid')"
        v-on="mCustomOns('cv-grid')"
        cv-grid-tag="div"
        :cv-min-height="'300px'">
        <table class="q-table bordered horizontal-separator striped-even loose w-100" slot="cv-grid-data" >
          <thead class="gt-sm" v-show="cShowTableMode">
            <tr slot="cv-ths-slot" >
              <slot name="headers-slot" >
              </slot>

              <th class="t-center t-middle" v-if="cpDinInsShowActions">
                {{ $tc('crudvuel.actions') }}
                <q-btn
                  v-cv-can-access="'action:create'"
                  icon="fas fa-plus-circle"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'create'}))"
                  color="secondary"
                  round
                  size="sm"
                  :title="mResorceAction('create').label"
                ></q-btn>

                <slot name="extra-actions-header-slot" v-if="cpDinInsShowActions">
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

              <td  v-if="cpDinInsShowActions && gridRow.active != null && cGtxs" class="t-center t-middle">
                <div
                  v-if="gridRow.active"
                  @click="(()=>{
                    temp = 'deactivateRow'
                    emDinGenLaunchActionEmitter({action:'deactivate',row:gridRow})
                  })"
                >
                  <q-icon
                    class="active-icon"
                    name="fas fa-check"
                    color="positive"
                    :title="mResorceAction('deactivate').label"
                  />
                </div>

                <div
                  v-else
                  @click="(()=>{
                    temp = 'activateRow'
                    emDinGenLaunchActionEmitter({action:'activate',row:gridRow})
                  })"
                >
                  <q-icon
                    class="active-icon"
                    name="fas fa-times-circle"
                    color="negative"
                    :title="mResorceAction('activate').label"
                  />
                </div>
              </td>

              <td class="t-center t-middle" v-if="cpDinInsShowActions">
                <q-btn
                  v-cv-can-access="'action:show'"
                  icon="fas fa-eye"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'show',row:gridRow}))"
                  color="info"
                  round
                  size="sm"
                  :title="mResorceAction('show').label"
                ></q-btn>
                <q-btn
                  v-cv-can-access="'action:edit'"
                  icon="fas fa-pencil-alt"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'edit',row:gridRow}))"
                  color="positive"
                  round
                  size="sm"
                  :title="mResorceAction('edit').label"
                ></q-btn>
                <q-btn
                  v-cv-can-access="'action:delete'"
                  icon="fas fa-trash-alt"
                  @click="(()=>emDinGenLaunchActionEmitter({action:'delete',row:gridRow}))"
                  color="negative"
                  round
                  size="sm"
                  :title="mResorceAction('delete').label"
                >
                </q-btn>
                <slot name="table-extra-actions-slot" :slot-row="gridRow">
                </slot>
              </td>
            </tr>
          </transition-group>

          <div class="q-ma-sm" v-show="cShowGridMode" >
            <div class="row w-100 q-mb-md" v-if="cpDinInsShowActions">
              <slot  name="flexi-grind-header-create-slot">
                <div class="w-100 t-right">
                  <q-btn
                    v-cv-can-access="'action:create'"
                    icon="fas fa-plus-circle"
                    @click="(()=>emDinGenLaunchActionEmitter({action:'create'}))"
                    color="secondary"
                    round
                    size="sm"
                    :title="mResorceAction('create').label"
                  >
                  </q-btn>
                </div>
              </slot>
            </div>

            <div class="q-card row w-100 round-borders q-pa-sm">
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
                <q-card :class="cpDinInsCardClass" class="mnh-400px">
                  <div class="w-100 h-50px">
                    <q-chip square class="f-right bg-secondary txt-white q-ma-none no-border-radius f-bold text-subtitle1">
                      {{ mfLang(cKeyName) }} : {{gridRow[cKeyName]}}
                    </q-chip>
                  </div>

                  <div class="mxh-300px of-y-auto">
                    <slot name="flexi-properties-slot" :slot-row="gridRow">
                    </slot>
                  </div>

                  <div class="absolute-bottom"  v-if="cpDinInsShowActions">
                    <q-card-section :class="cpDinInsActionCardTitleClass">
                      {{ $tc('crudvuel.actions') }}
                    </q-card-section>
                    <q-card-actions :class="cpDinInsActionCardClass" >
                      <q-btn
                        v-cv-can-access="'action:show'"
                        icon="fas fa-eye"
                        @click="(()=>emDinGenLaunchActionEmitter({action:'show',row:gridRow}))"
                        color="info"
                        round
                        size="sm"
                        :title="mResorceAction('show').label"
                      ></q-btn>

                      <q-btn
                        v-cv-can-access="'action:edit'"
                        icon="fas fa-pencil-alt"
                        @click="(()=>emDinGenLaunchActionEmitter({action:'edit',row:gridRow}))"
                        color="positive"
                        round
                        size="sm"
                        :title="mResorceAction('edit').label"
                      ></q-btn>

                      <q-btn
                        v-cv-can-access="'action:delete'"
                        icon="fas fa-trash-alt"
                        @click="(()=>emDinGenLaunchActionEmitter({action:'delete',row:gridRow}))"
                        color="negative"
                        round
                        size="sm"
                        :title="mResorceAction('delete').label"
                      >
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
  QExpansionItem
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
      '[D|M]pageAnimation'            : 'animated fadeIn',
      '[P]dinGenExcludeActions'       : [],
      '[P]dinInsShowTableMode'        : true,
      '[P]dinInsShowGridMode'         : true,
      '[P]dinInsShowActions'          : true,
      '[P]dinInsCardContainerClass'   : 'row col-xs-12 col-sm-6 col-md-12',
      '[P]dinInsCardClass'            : 'q-card w-100 round-borders',
      '[P]dinInsActionCardTitleClass' : 'bg-white',
      '[P]dinInsActionCardClass'      : 'row justify-start bg-secondary',
      '[EM]dinGenLaunchAction'        : null
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
    QExpansionItem
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
        this.emDinInsfAdaptiveGridIndexGridFilterSelectorCurrentFilterEmitter('cv-combinatory-paginator')
        this.$nextTick(() => {
          this.mSetReady()
          resolve()
        })
      })
    }
  }
}
</script>
