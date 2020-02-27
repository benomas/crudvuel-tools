<template>
  <div>
    <div class="float-left" :offset="[18, 30]">
      <q-btn
        v-if="cpDinGenShowBackButton"
        small
        class="q-ma-md"
        :icon="cpStaGenBackIcon"
        :color="cpStaGenBackIconColor"
        @click="emStaGenBackEmitter">
        <q-tooltip  :disable="!cpDinGenShowBackButton && !cXs && !cSm">
          {{cBackLabel}}
        </q-tooltip>
        <span v-if="!cXs && cpDinGenShowBackButton" class="q-px-md">
          {{cBackLabel}}
        </span>
      </q-btn>
    </div>
    <div class="float-right" :offset="[18, 30]">
      <q-btn
        v-if="cpDinGenShowNextButton"
        small
        class="q-ma-md"
        :icon="cpStaGenNextIcon"
        :color="cpStaGenNextIconColor"
        @click="emStaGenNextEmitter"
        :disabled="!cdReady">
        <q-tooltip  :disable="!cpDinGenShowNextButton && !cXs && !cSm">
          {{cNextLabel}}
        </q-tooltip>
        <span v-if="!cXs && cpDinGenShowNextButton" class="q-px-md">
          {{cNextLabel}}
        </span>
      </q-btn>
    </div>
    <div v-if="cAutoFillable" class="" :offset="[18, 30]">
      <q-btn
        small
        class="q-ma-md"
        icon="fas fa-fill"
        color="info"
        @click="emStaGenAutoFillEmitter"
        :disabled="!cdReady">
        <span v-if="!cXs" class="q-px-md">
          re-fill
        </span>
      </q-btn>
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
      '[EM]staGenAutoFill'      : null
    })
  ],
  components: {
    QBtn,
    QIcon,
    QPageSticky,
    QTooltip
  },
  props: [
  ],
  computed: {
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
    }
  }
}
</script>
