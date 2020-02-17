<template>
  <div>
    <div class="float-left" :offset="[18, 30]">
      <q-btn
        v-if="cBackLabel"
        ref="backLabelRef"
        :icon="cIconBack"
        :color="cColorBack"
        small
        class="q-ma-md"
        v-on:click="$emit('cv-back')">
        <q-tooltip  :disable="!cShowBackLabel && !cXs && !cSm" cPosition>
          {{cBackLabel}}
        </q-tooltip>
        <span v-if="!cXs && cShowBackLabel" class="q-px-md">
          {{cBackLabel}}
        </span>
      </q-btn>
    </div>
    <div class="float-right" :offset="[18, 30]">
      <q-btn
        v-if="cNextLabel"
        ref="nextLabelRef"
        :icon="cIconNext"
        :color="cColorNext"
        small
        class="q-ma-md"
        v-on:click="$emit('cv-next')"
        :disabled="!cReady">
        <q-tooltip  :disable="!cShowNextLabel && !cXs && !cSm" cPosition>
          {{cNextLabel}}
        </q-tooltip>
        <span v-if="!cXs && cShowNextLabel" class="q-px-md">
          {{cNextLabel}}
        </span>
      </q-btn>
    </div>
  </div>
</template>
<script>
import {
  QBtn,
  QIcon,
  QPageSticky,
  QTooltip
} from 'quasar'
export default {
  components: {
    QBtn,
    QIcon,
    QPageSticky,
    QTooltip
  },
  props: [
    'cvReady',
    'cvAction',
    'cvBackLabel',
    'cvNextLabel',
    'cvIconBack',
    'cvColorBack',
    'cvIconNext',
    'cvColorNext',
    'cvShowBackLabel',
    'cvShowNextLabel'
  ],
  computed: {
    cReady: function () {
      return this.cvReady || null
    },
    cpStaGenAction: function () {
      return this.cvAction || null
    },
    cBackLabel: function () {
      if (this.cvBackLabel)
        return this.cvBackLabel
      if (this.cpStaGenAction)
        return this.cpStaGenAction.backLabel || null
      return 'Cancelar'
    },
    cNextLabel: function () {
      if (this.cvNextLabel != null)
        return this.cvNextLabel
      if (this.cpStaGenAction)
        return this.cpStaGenAction.nextLabel || null
      return 'Guardar'
    },
    cBackLabelRef: function () {
      return this.$refs.backLabelRef || null
    },
    cNextLabelRef: function () {
      return this.$refs.nextLabelRef || null
    },
    cIconBack: function () {
      return this.cvIconBack || 'fas fa-backspace'
    },
    cColorBack: function () {
      return this.cvColorBack || 'negative'
    },
    cIconNext: function () {
      return this.cvIconNext || 'fas fa-check'
    },
    cColorNext: function () {
      return this.cvColorNext || 'positive'
    },
    cShowBackLabel: function () {
      if (typeof this.cvShowBackLabel !== 'undefined' && !this.cvShowBackLabel)
        return false
      return true
    },
    cShowNextLabel: function () {
      if (typeof this.cvShowNextLabel !== 'undefined'  && !this.cvShowNextLabel)
        return false
      return true
    }
  }
}
</script>
