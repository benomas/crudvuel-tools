<template>
  <div >
    <div v-if="cpDinGenActionMode==='route'">
      <q-page-sticky position="bottom-left" :offset="cGtmd?[35, 15]:cGtsm?[40, 20]:[0,0]">
        <q-btn
          v-if="cShowBackButton"
          :size="cBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          :icon="cBackIcon"
          :color="cBackIconColor"
          @click="emStaGenBackEmitter"
          :disabled="cDisableBack">
          <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
            {{cBackLabel}}
          </q-tooltip>

          <span v-if="cGtsm && cShowBackButton" class="q-px-sm">
            {{cBackLabel}}
          </span>
        </q-btn>
      </q-page-sticky>

      <q-page-sticky position="bottom-right" :offset="cGtmd?[35, 15]:cGtsm?[40, 20]:[0,0]">
        <div class="float-right" >
          <q-btn
            v-if="cShowNextButton"
            :size="cBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-sm q-my-sm"
            :icon="cNextIcon"
            :color="cNextIconColor"
            @click="emStaGenNextEmitter"
            :disabled="cDisableNext">
            <q-tooltip  :disable="!cShowNextButton && !cXs && !cSm">
              {{cNextLabel}}
            </q-tooltip>

            <span v-if="cGtsm && cShowNextButton" class="q-px-sm">
              {{cNextLabel}}
            </span>
          </q-btn>
        </div>

        <div v-if="cShowResetButton" class="float-right" >
          <q-btn
            :size="cBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-sm q-my-sm"
            icon="icon-info"
            color="warning"
            @click="emStaGenAutoResetEmitter"
            :disabled="cDisableReset">
            <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
              {{cResetLabel}}
            </q-tooltip>

            <span v-if="cGtsm" class="q-px-sm">
              {{cResetLabel}}
            </span>
          </q-btn>
        </div>

        <div v-if="cShowClearButton" class="float-right" >
          <q-btn
          :size="cBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-sm q-my-sm"
            icon="icon-borrar"
            color="accent"
            @click="emStaGenAutoClearEmitter"
            :disabled="cDisableClear">
            <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
              {{cClearLabel}}
            </q-tooltip>

            <span v-if="cGtsm" class="q-px-sm">
              {{cClearLabel}}
            </span>
          </q-btn>
        </div>

        <div v-if="cShowAutoFillButton" class="float-right" >
          <q-btn
          :size="cBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-xs q-my-sm"
            icon="icon-rellenar"
            color="info"
            @click="emStaGenAutoFillEmitter"
            :disabled="cDisableFill">
            <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
              {{cFillLabel}}
            </q-tooltip>

            <span v-if="cGtsm" class="q-px-sm">
              {{cFillLabel}}
            </span>
          </q-btn>
        </div>
      </q-page-sticky>
    </div>

    <div v-if="cpDinGenActionMode==='dialog'">
      <q-btn
        v-if="cShowBackButton"
        :size="cBtnSize"
        :class="{'q-ma-md':cGtmd}"
        class="q-mx-sm q-my-sm"
        :icon="cBackIcon"
        :color="cBackIconColor"
        @click="emStaGenBackEmitter"
        :disabled="cDisableBack">
        <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
          {{cBackLabel}}
        </q-tooltip>

        <span v-if="cGtsm && cShowBackButton" class="q-px-sm">
          {{cBackLabel}}
        </span>
      </q-btn>

      <div class="float-right" >
        <q-btn
          v-if="cShowNextButton"
          :size="cBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          :icon="cNextIcon"
          :color="cNextIconColor"
          @click="emStaGenNextEmitter"
          :disabled="cDisableNext">
          <q-tooltip  :disable="!cShowNextButton && !cXs && !cSm">
            {{cNextLabel}}
          </q-tooltip>

          <span v-if="cGtsm && cShowNextButton" class="q-px-sm">
            {{cNextLabel}}
          </span>
        </q-btn>
      </div>

      <div v-if="cShowResetButton" class="float-right" >
        <q-btn
          :size="cBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          icon="icon-info"
          color="warning"
          @click="emStaGenAutoResetEmitter"
          :disabled="cDisableReset">
          <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
            {{cResetLabel}}
          </q-tooltip>

          <span v-if="cGtsm" class="q-px-sm">
            {{cResetLabel}}
          </span>
        </q-btn>
      </div>

      <div v-if="cShowClearButton" class="float-right" >
        <q-btn
          :size="cBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          icon="icon-borrar"
          color="accent"
          @click="emStaGenAutoClearEmitter"
          :disabled="cDisableClear">
          <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
            {{cClearLabel}}
          </q-tooltip>

          <span v-if="cGtsm" class="q-px-sm">
            {{cClearLabel}}
          </span>
        </q-btn>
      </div>

      <div v-if="cShowAutoFillButton" class="float-right" >
        <q-btn
          :size="cBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-xs q-my-sm"
          icon="icon-rellenar"
          color="info"
          @click="emStaGenAutoFillEmitter"
          :disabled="cDisableFill">
          <q-tooltip  :disable="!cShowBackButton && !cXs && !cSm">
            {{cFillLabel}}
          </q-tooltip>

          <span v-if="cGtsm" class="q-px-sm">
            {{cFillLabel}}
          </span>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import CvComponentSet         from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import CvResourceComponentSet from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentSet'
import VueMirroring           from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('ActionButtons')
import {
  QBtn,
  QIcon,
  QPageSticky,
  QTooltip
} from 'quasar'

export default {
  mixins: [
    CvComponentSet,
    CvResourceComponentSet,
    vueMirroring.fixProperties({
      '[P]dinGenShowBackButton'     : true,
      '[P]dinGenShowNextButton'     : true,
      '[P]dinGenShowResetButton'    : true,
      '[P]dinGenShowClearButton'    : true,
      '[P]dinGenShowAutoFillButton' : true,
      '[P]dinGenAction'             : null,
      '[P]dinGenBackLabel'          : null,
      '[P]dinGenNextLabel'          : null,
      '[P]dinGenFillLabel'          : null,
      '[P]dinGenResetLabel'         : null,
      '[P]dinGenClearLabel'         : null,
      '[P]dinGenBackIcon'           : 'icon-retroceso',
      '[P]dinGenBackIconColor'      : 'negative',
      '[P]dinGenNextIcon'           : 'icon-check',
      '[P]dinGenNextIconColor'      : 'positive',
      '[P]staGenBackIcon'           : 'icon-retroceso',
      '[P]staGenBackIconColor'      : 'negative',
      '[P]staGenNextIcon'           : 'icon-check',
      '[P]staGenNextIconColor'      : 'positive',
      '[P]dinGenDisableBack'        : false,
      '[P]dinGenDisableNext'        : false,
      '[P]dinGenDisableFill'        : false,
      '[P]dinGenDisableReset'       : false,
      '[P]dinGenDisableClear'       : false,
      '[EM]staGenBack'              : null,
      '[EM]staGenNext'              : null,
      '[EM]staGenAutoFill'          : null,
      '[EM]staGenAutoReset'         : null,
      '[EM]staGenAutoClear'         : null,
      '[P]staInsAutoFillable'       : null,
      '[P]staInsClereable'          : null,
      '[P]staInsAutoFillable'       : null,
      '[D]btnSize'                  : 'md',
      '[P]dinGenActionMode'         : 'route'
    })
  ],

  components: {
    QBtn,
    QIcon,
    QPageSticky,
    QTooltip
  },

  computed: {
    cBtnSize: function () {
      if (this.cGtsm)
        return this.cdBtnSize

      return 'sm'
    },

    cpDinGenShowBackButton () {
      if (this.cvDinGenShowBackButton != null && this.cvDinGenShowBackButton === false)
        return false

      return this.cBackLabel != null && this.cBackLabel !== ''
    },

    cpDinGenShowNextButton () {
      if (this.cvDinGenShowNextButton != null && this.cvDinGenShowNextButton === false)
        return false

      return this.cNextLabel != null && this.cNextLabel !== ''
    },

    cpDinGenShowResetButton () {
      if (this.cvDinGenShowResetButton != null && this.cvDinGenShowResetButton === false)
        return false

      return true
    },

    cpDinGenShowClearButton () {
      if (this.cvDinGenShowClearButton != null && this.cvDinGenShowClearButton === false)
        return false

      return true
    },

    cpDinGenShowAutoFillButton () {
      if (this.cvDinGenShowAutoFillButton != null && this.cvDinGenShowAutoFillButton === false)
        return false

      return true
    },

    cBackLabel () {
      if(this.cpDinGenBackLabel != null)
        return this.cpDinGenBackLabel

      let trans = this.mComLang('backLabel')

      if (trans !== '')
        return trans

      if (this.cpDinGenAction.backLabel !== undefined)
        return this.cpDinGenAction.backLabel

      return 'Cancelar'
    },

    cNextLabel () {
      if(this.cpDinGenNextLabel != null)
        return this.cpDinGenNextLabel

      let trans = this.mComLang('nextLabel')

      if (trans !== '')
        return trans

      if (this.cpDinGenAction.nextLabel !== undefined)
        return this.cpDinGenAction.nextLabel

      return 'Guardar'
    },

    cFillLabel () {
      if(this.cpDinGenFillLabel != null)
        return this.cpDinGenFillLabel

      let trans = this.mComLang('fill')

      if (trans !== '')
        return trans

      return 'Auto llenar'
    },

    cResetLabel () {
      if(this.cpDinGenResetLabel != null)
        return this.cpDinGenResetLabel

      let trans = this.mComLang('reset')

      if (trans !== '')
        return trans

      return 'Reiniciar'
    },

    cClearLabel () {
      if(this.cpDinGenClearLabel != null)
        return this.cpDinGenClearLabel

      let trans = this.mComLang('clear')

      if (trans !== '')
        return trans

      return 'Limipiar'
    },

    cShowNextButton() {
      return this.cpDinGenShowNextButton
    },

    cShowBackButton() {
      return this.cpDinGenShowBackButton
    },

    cShowResetButton() {
      if (!this.cpDinGenShowResetButton)
        return false

      return this.cpStaInsAutoFillable === true ||
        (this.cpStaInsAutoFillable == null && this.cClereable)
    },

    cShowClearButton() {
      if(!this.cpDinGenShowClearButton)
        return false

      return this.cpStaInsClereable === true ||
        (this.cpStaInsClereable == null && this.cClereable)
    },

    cShowAutoFillButton() {
      if(!this.cpDinGenShowAutoFillButton)
        return false

      return this.cAutoFillable
    },

    cBackIcon () {
      if (this.cpDinGenBackIcon != null)
        return this.cpDinGenBackIcon

      if (this.cpStaGenBackIcon != null)
        return this.cpStaGenBackIcon

      return null
    },

    cBackIconColor () {
      if (this.cpDinGenBackIconColor != null)
        return this.cpDinGenBackIconColor

      if (this.cpStaGenBackIconColor != null)
        return this.cpStaGenBackIconColor

      return null
    },

    cNextIcon () {
      if (this.cpDinGenNextIcon != null)
        return this.cpDinGenNextIcon

      if (this.cpStaGenNextIcon != null)
        return this.cpStaGenNextIcon

      return null
    },

    cNextIconColor () {
      if (this.cpDinGenNextIconColor != null)
        return this.cpDinGenNextIconColor

      if (this.cpStaGenNextIconColor != null)
        return this.cpStaGenNextIconColor

      return null
    },

    cDisableBack () {
      if(!this.cdReady)
        return false

      return this.cpDinGenDisableBack
    },

    cDisableNext () {
      if(!this.cdReady)
        return false

      return this.cpDinGenDisableNext
    },

    cDisableFill () {
      if(!this.cdReady)
        return false

      return this.cpDinGenDisableFill
    },

    cDisableReset () {
      if(!this.cdReady)
        return false

      return this.cpDinGenDisableReset
    },

    cDisableClear () {
      if(!this.cdReady)
        return false

      return this.cpDinGenDisableClear
    }
  }
}
</script>
