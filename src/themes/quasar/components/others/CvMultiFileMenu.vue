<template>
  <q-btn
    class="m-auto"
    target="_blank"
    :icon="cMoreIcon"
    :color="cMoreColor"
    small>
    <q-chip floating :color="cChipColor">
      {{cChipValue}}
    </q-chip>
    <q-menu class="bg-primary">
      <q-list inset-separator class="q-mt-md dark-example" dark >
        <transition-group
          enter-active-class="animated zoomInUp"
          leave-active-class="animated zoomOutDown"
          :duration="{ enter: 800, leave: 800 }"
        >
          <q-item v-for="(file, filePos) in cFiles" :key="file.id">
            <q-item-label :label="itemTitle(file, filePos)">
              <q-tooltip >
                {{file.cat_file.name}} {{filePos+1}}
              </q-tooltip>
            </q-item-label>
            <q-item-section right>
              <q-btn
                class="q-ma-xs"
                size="sm"
                :icon="cDeleteIcon"
                :color="cDeleteColor"
                round
                :disabled="cDisabled"
                :loading="getDeleteAsyc(file.id)"
                @click="(()=>{setDeleteAsyc(file.id); cDeleteFile(file,filePos).then(unSetDeleteAsyc).catch(unSetDeleteAsyc) })">
                <q-tooltip :disable="getDeleteAsyc(file.id)">
                  {{cDeleteLang}}
                </q-tooltip>
                <q-spinner-facebook slot="loading"/>
              </q-btn>
              <q-btn
                class="q-ma-xs"
                size="sm"
                target="_blank"
                :icon="cDownloadIcon"
                round
                :color="cDownloadColor"
                :disabled="getDeleteAsyc(file.id)"
                @click="(()=>{openFile(file.absolute_path)})">
                <q-tooltip :disable="getDeleteAsyc(file.id)">
                  {{cDownloadLang}}
                </q-tooltip>
              </q-btn>
            </q-item-section >
          </q-item>
        </transition-group>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import {
  QBtn,
  QIcon,
  QChip,
  QMenu,
  QList,
  QItem,
  QItemLabel,
  QTooltip,
  QItemSection,
  QSpinner,
  QSpinnerFacebook
} from 'quasar'
export default {
  data: function () {
    return {
      asyns: {}
    }
  },
  components: {
    QBtn,
    QIcon,
    QChip,
    QMenu,
    QList,
    QItem,
    QItemLabel,
    QTooltip,
    QItemSection,
    QSpinner,
    QSpinnerFacebook
  },
  props: [
    'cvDisabled',
    'cvMoreIcon',
    'cvMoreColor',
    'cvChipColor',
    'cvChipValue',
    'cvFiles',
    'cvItemLabel',
    'cvItemTitle',
    'cvDeleteIcon',
    'cvDownloadIcon',
    'cvDeleteColor',
    'cvDownloadColor',
    'cvDeleteLang',
    'cvDownloadLang',
    'cvDeleteFile'
  ],
  computed: {
    cDisabled: function () {
      return this.cvDisabled || false
    },
    cMoreIcon: function () {
      return this.cvMoreIcon || 'more_vert'
    },
    cMoreColor: function () {
      return this.cvMoreColor || 'primary'
    },
    cChipColor: function () {
      return this.cvChipColor || this.cCount ? 'positive' : 'negative'
    },
    cChipValue: function () {
      return this.cvChipValue || this.cCount
    },
    cFiles: function () {
      return this.cvFiles || []
    },
    cCount: function () {
      return this.cFiles.length || 0
    },
    cItemLabel: function () {
      return this.cvItemLabel || 'Archivo'
    },
    cItemTitle: function () {
      return this.cvItemTitle
    },
    cDeleteIcon: function () {
      return this.cvDeleteIcon || 'fas fa-trash'
    },
    cDownloadIcon: function () {
      return this.cvDownloadIcon || 'fas fa-download'
    },
    cDeleteColor: function () {
      return this.cvDeleteColor || 'negative'
    },
    cDownloadColor: function () {
      return this.cvDownloadColor || 'positive'
    },
    cDeleteLang: function () {
      return this.cvDeleteLang || 'Remover'
    },
    cDownloadLang: function () {
      return this.cvDownloadLang || 'Descargar'
    },
    cDeleteFile: function () {
      return this.cvDeleteFile || function (file,filePos) { console.log('fake delete') }
    }
  },
  methods: {
    itemTitle: function (file,position) {
      if (this.cItemTitle)
        return this.cItemTitle
      return this.cItemLabel + ' ' + (position + 1)
    },
    openFile: function (path) {
      window.open(path)
    },
    getAsyc: function (type,pos) {
      if (typeof this.asyns[type] === 'undefined' || typeof this.asyns[type][pos] === 'undefined')
        return false
      return true
    },
    setAsyc: function (type,pos) {
      if (typeof this.asyns[type] === 'undefined')
        this.$set(this.asyns,type,{})
      this.$set(this.asyns[type],pos,true)
    },
    unSetAsyc: function (type,pos) {
      if (typeof this.asyns[type] !== 'undefined' && typeof this.asyns[type][pos] !== 'undefined')
        this.$delete(this.asyns[type],pos)
    },
    getDeleteAsyc: function (pos) {
      return this.getAsyc('delete',pos)
    },
    setDeleteAsyc: function (pos) {
      this.setAsyc('delete',pos)
    },
    unSetDeleteAsyc: function (pos) {
      this.unSetAsyc('delete',pos)
    }
  },
  mount: function () {
    this.asyns = {}
  }
}
</script>
