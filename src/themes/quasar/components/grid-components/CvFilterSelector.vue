<template>
  <div class="filter-selector-container w-100">
    <q-btn-toggle
      :value="cpDinInsCurrentFilter"
      @input="emDinInsCurrentFilterEmitter"
      toggle-color="secondary-l-57"
      color="tertiary"
      text-color="white"
      spread
      unelevated
      size="xs"
      :options="[
        {label:cpStaComSimpleFilterLabel, value: 'cv-simple-paginator', icon:cpStaComSimpleFilterIcon},
        {label:cpStaComCombinayoryFilterLabel, value: 'cv-combinatory-paginator', icon:cpStaComCombinayoryFilterIcon},
      ]"
    />
  </div>
</template>
<script>
import {QIcon,QField,QInput,QBtn,QBtnToggle} from 'quasar'
import CvFilterSelector         from 'crudvuel-tools/src/components/grid-components/CvFilterSelector'
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('FilterSelector')
export default {
  mixins: [
    CvFilterSelector,
    CvComponentSet,
    vueMirroring.fixProperties({
      '[P|EM]dinInsCurrentFilter'       : 'cv-simple-paginator',
      '[P]staComSimpleFilterLabel'      : '',
      '[P]staComSimpleFilterIcon'       : 'fas fa-search',
      '[P]staComCombinayoryFilterLabel' : '',
      '[P]staComCombinayoryFilterIcon'  : 'fas fa-search-plus'
    }),
  ],
  components : {
    QBtn,
    QField,
    QIcon,
    QInput,
    QBtnToggle
  }
}
</script>
