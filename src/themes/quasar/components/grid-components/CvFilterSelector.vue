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
import CvFilterSelector from 'crudvuel-tools/src/components/grid-components/CvFilterSelector'
import CvComponentSet   from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import {QIcon,QField,QInput,QBtn,QBtnToggle} from 'quasar'
export default {
  mixins: [
    CvFilterSelector,
    CvComponentSet
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
