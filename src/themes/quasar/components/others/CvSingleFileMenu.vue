<template>
  <q-btn
    class="m-auto"
    :href="cPath"
    target="_blank"
    :icon="cDownloadIcon"
    :color="cDownloadColor"
    size="md"
    :disable="!cPath"
    @click="openFile">
    <q-tooltip >
      {{cDownloadLang}}
    </q-tooltip>
    <span v-if="cLabel">{{cLabel}}</span>
  </q-btn>
</template>
<script>
import {
  QBtn,
  QTooltip,
  ClosePopup
} from 'quasar'
export default {
  components: {
    QBtn,
    QTooltip
  },
  directives: {
    ClosePopup
  },
  props: [
    'cvDisabled',
    'cvFiles',
    'cvDownloadIcon',
    'cvDownloadColor',
    'cvDownloadLang',
    'cvLabel'
  ],
  computed: {
    cLabel: function () {
      return this.cvLabel
    },
    cDisabled: function () {
      return this.cvDisabled || false
    },
    cFiles: function () {
      return this.cvFiles || []
    },
    cFile: function () {
      if (!this.cCount)
        return null

      return this.cFiles[this.cCount - 1]
    },
    cPath: function () {
      if (!this.cFile)
        return null
      return this.cFile.absolute_path
    },
    cCount: function () {
      return this.cFiles.length || 0
    },
    cDownloadIcon: function () {
      return this.cvDownloadIcon || 'fas fa-download'
    },
    cDownloadColor: function () {
      if (this.cvDownloadColor != null)
        return this.cvDownloadColor
      return !this.cPath ? 'negative' : 'positive'
    },
    cDownloadLang: function () {
      return this.cPath ? this.$tc('crudvuel.labels.download','files') : this.$tc('crudvuel.labels.noDownload','files')
      //return this.cvDownloadLang || 'Descargar'
    }
  },
  methods: {
    openFile: function () {
      window.open(this.cPath)
    }
  }
}
</script>
