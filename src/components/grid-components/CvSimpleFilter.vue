<template>
  <div class="simple-filters-container">
    <label for="search">{{cpSimpleFilterLabel}}</label>
    <input
      class="simple-filters-input form-control"
      type="text"
      name="simpleFilter"
      autocomplete="off"
      v-model="simpleFilter"
      ref="searchInputRef"
      :title="cpSimpleFilterMessage"
      :disabled="cpSimpleFilterDisableFields"
      :clearable="!cpSimpleFilterDisableFields"
      @keyup.13="mSimpleFilterGoToFind()"
      @keyup="mSimpleFilterKeyUp"
      @focus="mSimpleFilterFocused"
      @blur="mSimpleFilterBlured"
    >
  </div>
</template>
<script>
import CvLocalSimpleFilterTrait from '../grid-components/CvLocalSimpleFilterTrait'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
export default {
  mixins: [
    CvComponentSet,
    CvLocalSimpleFilterTrait,
    new VueMirroring().fixProperties({
      '[P]dinInsActiveFilter'  : null,
      '[P]dinInsLabel'         : 'Busqueda simple',
      '[P]dinInsLabelColor'    : '',
      '[P]dinInsHint'          : '',
      '[P]dinInsClearIcon'     : null,
      '[P]dinInsColor'         : 'primary',
      '[P]dinInsBgColor'       : 'white',
      '[P]dinInsDisableFields' : false,
      'Search'                 : {mode: 'D|P|M',init: ''},
      'SearchInputContainer'   : {mode: 'D|M',init: true},
      'DisableList'            : {mode: 'D|M',init: false},
      'Interruption'           : {mode: 'D|M',init: null},
      'Loading'                : {mode: 'P',init: false},
      'DisableFields'          : {mode: 'P',init: false},
      'Message'                : {mode: 'P',init: ''},
      'Icon'                   : {mode: 'P',init: 'fas fa-search'},
      'IconColor'              : {mode: 'P',init: 'info'},
      'KeyInterruption'        : {mode: 'P',init: false},
      'KeyInterruptionLimit'   : {mode: 'P',init: 500},
      'Hint'                   : {mode: 'P',init: ''},
      'ClearIcon'              : {mode: 'P',init: null},
      'Input'                  : {mode: 'EM'},
      'GoToFind'               : {mode: 'EM'},
      'KeyUp'                  : {mode: 'EM'},
      'Inyected'               : {mode: 'EM'},
      'Focused'                : {mode: 'EM'},
      'Blured'                 : {mode: 'EM'},
      'Start'                  : {mode: 'EM'},
      '[EM]dinInsInput'        : '',
      '[EM]dinInsCleared'      : '',
      '[D]loading'             : false,
    })
  ],
  data () {
    return {
    }
  },
  props:[
  ],
  methods:{
  },
  computed:{
  }
}
</script>

