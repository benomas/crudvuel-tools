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
      :disabled="cpDinInsDisableFields"
      :clearable="!cpDinInsDisableFields"
      @input="emDinInsSearchEmitter"
      @keyup.13="(()=>mSetPreventDebounce(true).emDinInsSearchEmitter(cpDinInsSearch))"
      @keyup="emDinInsKeyUpEmitter"
      @focus="emDinInsFocusedEmitter"
      @blur="emDinInsBluredEmitter"
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
      '[P]dinInsLabel'                : 'Busqueda simple',
      '[P]dinInsLabelColor'           : '',
      '[P]dinInsClearIcon'            : null,
      '[P]dinInsColor'                : 'primary',
      '[P]dinInsBgColor'              : 'white',
      '[P]dinInsDisableFields'        : false,
      '[P|EM]dinInsSearch'            : '',
      '[P]dinInsIcon'                 : 'fas fa-search',
      '[P]dinInsIconColor'            : 'info',
      '[P]dinInsKeyInterruptionLimit' : 500,
      '[P]dinInsKeyLoading'           : false,
      '[P]dinComHideBottomSpace'      : true,
      '[EM]dinInsBlured'              : '',
      '[EM]dinInsFocused'             : '',
      '[EM]dinInsKeyUp'               : '',
      '[EM]dinInsCleared'             : '',
      '[EM]dinInsGoToFind'            : '',
      '[D]lastEmission'               : null,
      '[D]preventDebounce'            : false
    })
  ],
  data () {
    return {
    }
  },
  props:[
  ],
  methods:{
    emDinInsSearchProccesor (emitted = null){
      this.mSetLastEmission(emitted)
      if (emitted == null || emitted === '')
        this.mSetPreventDebounce(true)
      return new Promise ((resolve, reject) => {
        if (this.cdPreventDebounce){
          console.log('direct')
          this.mSetPreventDebounce(false)
          resolve(emitted)
        }else{
          (debounce(() => {
              if (this.cdLastEmission === emitted){
                console.log('delayed')
                return resolve(emitted)
              }else{
                reject(emitted)
              }
            },
            this.cpDinInsKeyInterruptionLimit
          ))()
        }
      })
    },
    emDinInsKeyUpProccesor (keyup) {
      if ([13,27,46].includes(keyup.keyCode))
        this.mSetPreventDebounce(true).emDinInsSearchEmitter(keyup.keyCode === 13 ? this.cdLastEmission : '')

      return new Promise ((resolve, reject) => resolve())
    }
  },
  computed:{
  }
}
</script>

