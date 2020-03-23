<template>
  <div >
    <div v-if="cpDinGenActionMode==='route'">
      <q-page-sticky position="bottom-left" :offset="[0, 0]">
        <q-btn
          v-if="cpDinGenShowBackButton"
          :size="cdBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          :icon="cpStaGenBackIcon"
          :color="cpStaGenBackIconColor"
          @click="emStaGenBackEmitter">
          <q-tooltip  :disable="!cpDinGenShowBackButton && !cXs && !cSm">
            {{cBackLabel}}
          </q-tooltip>

          <span v-if="cGtsm && cpDinGenShowBackButton" class="q-px-sm">
            {{cBackLabel}}
          </span>
        </q-btn>
      </q-page-sticky>

      <q-page-sticky position="bottom-right" :offset="[0, 0]">
        <div class="float-right" >
          <q-btn
            v-if="cpDinGenShowNextButton"
            :size="cdBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-sm q-my-sm"
            :icon="cpStaGenNextIcon"
            :color="cpStaGenNextIconColor"
            @click="emStaGenNextEmitter"
            :disabled="!cdReady">
            <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
              {{cNextLabel}}
            </q-tooltip>

            <span v-if="cGtsm && cpDinGenShowNextButton" class="q-px-sm">
              {{cNextLabel}}
            </span>
          </q-btn>
        </div>

        <div v-if="cpStaInsAutoFillable === true || ( cpStaInsAutoFillable == null && cClereable)" class="float-right" >
          <q-btn
          :size="cdBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-sm q-my-sm"
            icon="fas fa-fill"
            color="warning"
            @click="emStaGenAutoResetEmitter"
            :disabled="!cdReady">
            <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
              {{cResetLabel}}
            </q-tooltip>

            <span v-if="cGtsm" class="q-px-sm">
              {{cResetLabel}}
            </span>
          </q-btn>
        </div>

        <div v-if="cpStaInsClereable === true || ( cpStaInsClereable == null && cClereable)" class="float-right" >
          <q-btn
          :size="cdBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-sm q-my-sm"
            icon="fas fa-fill"
            color="accent"
            @click="emStaGenAutoClearEmitter"
            :disabled="!cdReady">
            <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
              {{cClearLabel}}
            </q-tooltip>

            <span v-if="cGtsm" class="q-px-sm">
              {{cClearLabel}}
            </span>
          </q-btn>
        </div>

        <div v-if="cAutoFillable" class="float-right" >
          <q-btn
          :size="cdBtnSize"
            :class="{'q-ma-md':cGtmd}"
            class="q-mx-xs q-my-sm"
            icon="fas fa-fill"
            color="info"
            @click="emStaGenAutoFillEmitter"
            :disabled="!cdReady">
            <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
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
        v-if="cpDinGenShowBackButton"
        :size="cdBtnSize"
        :class="{'q-ma-md':cGtmd}"
        class="q-mx-sm q-my-sm"
        :icon="cpStaGenBackIcon"
        :color="cpStaGenBackIconColor"
        @click="emStaGenBackEmitter">
        <q-tooltip  :disable="!cpDinGenShowBackButton && !cXs && !cSm">
          {{cBackLabel}}
        </q-tooltip>

        <span v-if="cGtsm && cpDinGenShowBackButton" class="q-px-sm">
          {{cBackLabel}}
        </span>
      </q-btn>

      <div class="float-right" >
        <q-btn
          v-if="cpDinGenShowNextButton"
          :size="cdBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          :icon="cpStaGenNextIcon"
          :color="cpStaGenNextIconColor"
          @click="emStaGenNextEmitter"
          :disabled="!cdReady">
          <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
            {{cNextLabel}}
          </q-tooltip>

          <span v-if="cGtsm && cpDinGenShowNextButton" class="q-px-sm">
            {{cNextLabel}}
          </span>
        </q-btn>
      </div>

      <div v-if="cpStaInsAutoFillable === true || ( cpStaInsAutoFillable == null && cClereable)" class="float-right" >
        <q-btn
        :size="cdBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          icon="fas fa-fill"
          color="warning"
          @click="emStaGenAutoResetEmitter"
          :disabled="!cdReady">
          <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
            {{cResetLabel}}
          </q-tooltip>

          <span v-if="cGtsm" class="q-px-sm">
            {{cResetLabel}}
          </span>
        </q-btn>
      </div>

      <div v-if="cpStaInsClereable === true || ( cpStaInsClereable == null && cClereable)" class="float-right" >
        <q-btn
        :size="cdBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-sm q-my-sm"
          icon="fas fa-fill"
          color="accent"
          @click="emStaGenAutoClearEmitter"
          :disabled="!cdReady">
          <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
            {{cClearLabel}}
          </q-tooltip>

          <span v-if="cGtsm" class="q-px-sm">
            {{cClearLabel}}
          </span>
        </q-btn>
      </div>

      <div v-if="cAutoFillable" class="float-right" >
        <q-btn
        :size="cdBtnSize"
          :class="{'q-ma-md':cGtmd}"
          class="q-mx-xs q-my-sm"
          icon="fas fa-fill"
          color="info"
          @click="emStaGenAutoFillEmitter"
          :disabled="!cdReady">
          <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
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
      '[P]dinGenShowBackButton' : true,
      '[P]dinGenShowNextButton' : true,
      '[P]dinGenAction'         : null,
      '[P]staGenBackIcon'       : 'fas fa-backspace',
      '[P]staGenBackIconColor'  : 'negative',
      '[P]staGenNextIcon'       : 'fas fa-check',
      '[P]staGenNextIconColor'  : 'positive',
      '[EM]staGenBack'          : null,
      '[EM]staGenNext'          : null,
      '[EM]staGenAutoFill'      : null,
      '[EM]staGenAutoReset'     : null,
      '[EM]staGenAutoClear'     : null,
      '[P]staInsAutoFillable'   : null,
      '[P]staInsClereable'      : null,
      '[P]staInsAutoFillable'   : null,
      '[D]btnSize'              : 'md',
      '[P]dinGenActionMode'     : 'route'
    })
  ],

  components: {
    QBtn,
    QIcon,
    QPageSticky,
    QTooltip
  },

  computed: {
    cBtnSize: function () {/*
      if (this.cGtsm)
        return this.cdBtnSize*/
      return 'xs'
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

    cBackLabel () {
      let trans = this.mComLang('backLabel')
      if (trans !== '')
        return trans
      if (this.cpDinGenAction.backLabel !== undefined)
        return this.cpDinGenAction.backLabel
      return 'Cancelar'
    },

    cNextLabel () {
      let trans = this.mComLang('nextLabel')
      if (trans !== '')
        return trans
      if (this.cpDinGenAction.nextLabel !== undefined)
        return this.cpDinGenAction.nextLabel
      return 'Guardar'
    },

    cFillLabel () {
      let trans = this.mComLang('fill')
      if (trans !== '')
        return trans
      return 'Auto llenar'
    },

    cResetLabel () {
      let trans = this.mComLang('reset')
      if (trans !== '')
        return trans
      return 'Reiniciar'
    },

    cClearLabel () {
      let trans = this.mComLang('clear')
      if (trans !== '')
        return trans
      return 'Limipiar'
    }
  }
}
</script>
