<template>
  <div class="filters-container w-100">
    <q-input
      outlined
      dense
      autocomplete="off"
      v-model="simpleFilterSearch"
      ref="simpleFilterInputRef"
      clear-icon='fas fa-times-circle'
      class="w-100"
      :label="cpSimpleFilterLabel"
      :label-color="cpSimpleFilterLabelColor"
      :hint="cpSimpleFilterHint"
      :clear-icon="cpSimpleFilterClearIcon"
      :color="cpSimpleFilterColor"
      :bg-color="cpSimpleFilterBgColor"
      :class="{'active-filter':cpSimpleFilterActiveFilter}"
      :clearable="!cpSimpleFilterDisableFields"
      :disable="cpSimpleFilterDisableFields"
      :readonly="cpSimpleFilterDisableFields"
      :hide-underline="cpSimpleFilterDisableFields"
      :loading="cpSimpleFilterLoading"

      @clear="emSimpleFilterClearedEmitter"
      @input="emSimpleFilterInputEmitter"
      @keyup.13="emSimpleFilterGoToFindEmitter"
      @keyup="emSimpleFilterKeyUpEmitter"
      @focus="emSimpleFilterFocusedEmitter"
      @blur="emSimpleFilterBluredEmitter"
    >
    <template v-slot:prepend>
      <q-icon :name="cpSimpleFilterIcon" :color="cpSimpleFilterIconColor" />
    </template>
    </q-input>
  </div>
</template>
<script>
import VueMirroring               from 'crudvuel-tools/src/VueMirroring'
import CvSimpleFilter            from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import {QIcon,QField,QInput,QBtn} from 'quasar'
export default {
  extends    : CvSimpleFilter,
  components : {
    QBtn,
    QField,
    QIcon,
    QInput
  },
  methods: {
    clear: function () {
      if (this.cInputRef != null)
        this.cInputRef.clear()
    },
    emSimpleFilterInputProccesor: function(emitted = null) {
      return new Promise ((resolve, reject) => {
        if (this.cdSimpleFilterSearch === null || this.cdSimpleFilterSearch === '')
          this.emSimpleFilterClearedEmitter(this.cdSimpleFilterSearch)
        resolve(emitted)
      })
    },
    emSimpleFilterGoToFindProccesor: function(emitted = null) {
      return new Promise ((resolve, reject) => {
        if (this.cpSimpleFilterDisableFields)
          reject()
        else
          resolve({searchObject:this.cdSimpleFilterSearch, searchMode:'cv-simple-paginator'})
      })
    },
    emSimpleFilterKeyUpProccesor: function (emitted = null) {
      return new Promise ((resolve, reject) => {
        /*
        if (!this.cdSearchInputContainer)
          return resolve(emitted)
        */
        if(this.cpSimpleFilterDisableFields === true)
          return reject()
        this.emSimpleFilterStartEmitter(emitted)
        resolve()
      })
    },
    /**
     * auto launch get service after a limit time without press a new key
     *
     * @author Benomas benomas@gmail.com
     * @date   2017-07-02
     * @return void
     */
    emSimpleFilterStartProccesor: function(emitted = null) {
      return new Promise ((resolve, reject) => {
        this.$nextTick().then(() => {
          if(this.cpSimpleFilterKeyInterruptionLimit<=0)
            return reject()
          resolve()
          clearTimeout(this.simpleFilterInterruption)
          this.mSetSimpleFilterInterruption(
            setTimeout(()=>{
              clearTimeout(this.simpleFilterInterruption)
              this.emSimpleFilterGoToFindEmitter()
            }, this.cpSimpleFilterKeyInterruptionLimit)
          )
        }).catch(()=>reject())
      })
    },
    // trigger focused event through the parent tree
    emSimpleFilterFocusedProccesor: function (emitted = null) {
      return new Promise ((resolve, reject) => {
        if (!this.cdSearchInputContainer)
          return resolve()
        if(this.cpDisableFields)
          return reject()
        this.emSimpleFilterStartEmitter(this.cdSearch)
        resolve(emitted)
      })
    },
    emSimpleFilterBluredProccesor: function (emitted = null) {
      return new Promise ((resolve, reject) => {
        if(this.cpDisableFields)
          return reject()
        resolve(this.cdSearch)
      })
    },
    emSimpleFilterClearedProccesor: function (emitted = null) {
      return new Promise ((resolve, reject) => {
        if (!this.cdSearchInputContainer)
          return reject(emitted)

        this.emSimpleFilterStartEmitter(emitted)
        resolve(emitted)
      })
    }/*,
    mSearchClear: function () {
      if (this.cdSearchInputContainer){
        this.$set(this,'search','')
        return this.$emit('cv-search-cleared')
      }
      if(this.cSimpleFilterRef)
        this.cSimpleFilterRef.mSearchClear()
    },
    mDefMatcherizerProps: function (referenceName = 'cvSimpleFilterRef') {
      return {
        'cv-search-label'            : this.cpSearchLabel,
        'cv-search-icon'             : this.cpSearchIcon,
        'cv-search-icon-color'       : this.cSearchIconColor,
        'cv-event-filter-loading'    : this.cpFilterLoading,
        'cv-search-key-interruption' : this.cSearchKeyInterruption,
        'ref'                        : referenceName
      }
    },
    prepareToFindSource: function(search){
      this.processList()
      this.mSetDisableList(false)
      return false
    },
    // Inyect search to the input filter
    mSimpleFilterInyectSearch: function (search = null,reactive =  true) {
      return new Promise ((resolve, reject) => {
        this.mSetSearch(search)
        if (!this.cdSearchInputContainer){
          this.cSimpleFilterRef.mSimpleFilterInyectSearch(this.cdSearch)
          resolve()
        }
        // trigger inyected event through the parent tree
        this.emSimpleFilterInyectedEmitter(this.cdSearch)
        if (reactive)
          this.emSimpleFilterStartEmitter()
        resolve()
      })
    }*/
  },
  props: [
  ],
  computed: {
    /*
    cLocalSearchLabel: function () {
      if (this.cGtsm)
        return this.cpSearchLabel
      return null
    },
    cSimpleFilterRef: function () {
      return this.$refs.cvSimpleFilterRef || null
    },
    cInputRef: function() {
      return this.cSimpleFilterRef.cSearchInputRef || null
    },
    cSimpleFilterSearchInputRef: function() {
      return this.$refs.searchInputRef || null
    }*/
  },
  mounted: function () {
    this.mSetSimpleFilterSearch(this.cpSimpleFilterSearch || '')
    //console.log(this)
  }
}
</script>
