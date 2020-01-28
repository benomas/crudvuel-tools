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
      'Search'               : {mode: 'D|P|M',init: ''},
      'SearchInputContainer' : {mode: 'D|M',init: true},
      'DisableList'          : {mode: 'D|M',init: false},
      'Interruption'         : {mode: 'D|M',init: null},
      'Loading'              : {mode: 'P',init: false},
      'DisableFields'        : {mode: 'P',init: false},
      'Label'                : {mode: 'P',init: ''},
      'LabelColor'           : {mode: 'P',init: ''},
      'Message'              : {mode: 'P',init: ''},
      'Icon'                 : {mode: 'P',init: 'fas fa-search'},
      'IconColor'            : {mode: 'P',init: 'info'},
      'KeyInterruption'      : {mode: 'P',init: false},
      'KeyInterruptionLimit' : {mode: 'P',init: 500},
      'Hint'                 : {mode: 'P',init: ''},
      'ClearIcon'            : {mode: 'P',init: null},
      'Color'                : {mode: 'P',init: 'primary'},
      'BgColor'              : {mode: 'P',init: 'white'},
      'ActiveFilter'         : {mode: 'P'},
      'Input'                : {mode: 'EM'},
      'Cleared'              : {mode: 'EM'},
      'GoToFind'             : {mode: 'EM'},
      'KeyUp'                : {mode: 'EM'},
      'Inyected'             : {mode: 'EM'},
      'Focused'              : {mode: 'EM'},
      'Blured'               : {mode: 'EM'},
      'Start'                : {mode: 'EM'},
    },'simpleFilter')
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
