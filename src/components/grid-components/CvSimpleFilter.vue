<template>
  <div class="simple-filters-container">
    <label for="search">{{cpDinInsLabel}}</label>
    <input
      class="simple-filters-input form-control"
      type="text"
      name="simpleFilter"
      autocomplete="off"
      :value="cpDinInsSearch"
      ref="inputRef"
      :title="cpDinInsHint"
      :disable="cpDinInsDisableFields"
      :clearable="!cpDinInsDisableFields"
      @input="emDinInsSearchEmitter"
      @keyup.13="(()=>mSetPreventDebounce(true).emDinInsSearchEmitter(cpDinInsSearch))"
      @keyup="emDinInsKeyUpEmitter"
      @focus="emDinInsFocusedEmitter"
      @blur="emDinInsBluredEmitter"
      @mouseover="emDinInsMouseOverEmitter"
      @mouseleave="emDinInsMouseLeaveEmitter"
    >
  </div>
</template>
<script>
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
import {debounce}               from 'lodash'

export default {
  mixins: [
    CvComponentSet,
    new VueMirroring('SimpleFilter').fixProperties({
      '[P]dinInsActiveFilter'         : null,
      '[P]dinInsLabel'                : 'Simple search',
      '[P]dinInsLabelColor'           : '',
      '[P]dinInsClearIcon'            : 'fas fa-times-circle',
      '[P]dinInsColor'                : 'primary',
      '[P]dinInsBgColor'              : 'white',
      '[P]dinInsMaterializeMode'      : false,
      '[P]dinInsDisableFields'        : false,
      '[P|EM]dinInsSearch'            : '',
      '[P]dinInsShowIcon'             : true,
      '[P]dinInsIcon'                 : 'fas fa-search',
      '[P]dinInsIconColor'            : 'info',
      '[P]dinInsIconClass'            : '',
      '[P]dinInsKeyInterruptionLimit' : 500,
      '[P]dinInsKeyLoading'           : false,
      '[P]dinComHideBottomSpace'      : true,
      '[EM]dinInsBlured'              : null,
      '[EM]dinInsFocused'             : null,
      '[EM]dinInsKeyUp'               : null,
      '[EM]dinInsMouseOver'           : null,
      '[EM]dinInsMouseLeave'          : null,
      '[EM]dinInsCleared'             : null,
      '[D]lastEmission'               : null,
      '[D]preventDebounce'            : false,
      '[P]dinInsHint'                 : ''
    })
  ],

  props:[
    'cvReactToFocus'
  ],

  methods: {
    emDinInsSearchProccesor (emitted = null) {
      let fixedEmitted = emitted != null ? emitted : ''
      this.mSetLastEmission(fixedEmitted)

      if (fixedEmitted == null || fixedEmitted === '')
        this.mSetPreventDebounce(true)

      return new Promise((resolve, reject) => {
        if (this.cdPreventDebounce) {
          this.mSetPreventDebounce(false)
          resolve(fixedEmitted)
        } else {
          (debounce(() => {
            if (this.cdLastEmission === fixedEmitted) {
              return resolve(fixedEmitted)
            } else {
              reject(fixedEmitted)
            }
          },
          this.cpDinInsKeyInterruptionLimit
          ))()
        }
      })
    },

    emDinInsFocusedProccesor (emitted = null) {
      return new Promise((resolve, reject) => {
        resolve(emitted)

        if (this.cReactToFocus)
          this.emDinInsSearchEmitter(this.cpDinInsSearch)
      })
    },

    emDinInsKeyUpProccesor (keyup) {
      if ([13,27,46].includes(keyup.keyCode))
        this.mSetPreventDebounce(true).emDinInsSearchEmitter(keyup.keyCode === 13 ? this.cdLastEmission : '')

      return new Promise((resolve, reject) => resolve())
    }
  },

  computed: {
    cInputRef () {
      return this.$refs['inputRef']
    },

    cReactToFocus () {
      if (this.cvReactToFocus == null)
        return false

      return this.cvReactToFocus
    }
  }
}
</script>
