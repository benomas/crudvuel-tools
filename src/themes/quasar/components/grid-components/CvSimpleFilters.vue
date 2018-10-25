<template>
  <div class="simple-filters-container w-100">
    <q-field
      :icon="cSimpleSearchIcon"
      :helper="cHelper"
      :icon-color="cSimpleSearchIconColor"
    >
      <q-input
        ref="simpleSearchInputRef"
        suffix=""
        v-model="simpleSearch"
        autocomplete="off"
        :class="{'active-filter':cSimpleSearchActiveFilter}"
        :float-label="cSimpleSearchLabel"
        :readonly="cDisableFields"
        :clearable="!cDisableFields"
        :loading="cSimpleFilterLoading"
        :hide-underline="cDisableFields"
        @clear="mSimpleSearchCleared"
        @keyup.13="mSimpleSearchGoToFind()"
        @keyup="mSimpleSearchKeyUp"
        @focus="mSimpleSearchFocused"
        @blur="mSimpleSearchBlured"
      />
    </q-field>
  </div>
</template>
<script>
import CvCustomExtender           from 'src/crudvuel/customs/components/grid-components/CvSimpleFilters'
import {QIcon,QField,QInput,QBtn} from 'quasar'
export default {
  extends    : CvCustomExtender,
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
    }
  },
  props: [
    'cvHelper'
  ],
  computed: {
    cHelper: function () {
      return null
      // eslint-disable-next-line
      return this.lodash.toString(this.cvHelper) || "";
    },
    cLocalSearchLabel: function () {
      if (this.cGtsm)
        return this.cSimpleSearchLabel
      return null
    }
  }
}
</script>
