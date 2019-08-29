<template>
  <div class="filter-selector-container">
    <q-btn-toggle
      v-model="currentFilter"
      @input="selected"
      toggle-color="primary"
      :options="[
        {label: 'Busqueda simple', value: 'simple-filters'},
        {label: 'Busqueda combinada', value: 'combinatory-filters'},
      ]"
    />
  </div>
</template>
<script>
import CvCustomExtender           from 'src/crudvuel/customs/components/grid-components/CvFilterSelector'
import {QIcon,QField,QInput,QBtn,QBtnToggle} from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    QBtn,
    QField,
    QIcon,
    QInput,
    QBtnToggle
  },
  methods: {
  },
  props: [
  ],
  computed: {
  }
}
</script>
