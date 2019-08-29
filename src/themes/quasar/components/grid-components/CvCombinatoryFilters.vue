<template>
  <div class="filters-container w-100">
    <q-field
      :icon="cSearchIcon"
      :helper="cHelper"
      :icon-color="cSearchIconColor"
    >
      <q-input
        ref="searchInputRef"
        suffix=""
        v-model="search"
        autocomplete="off"
        :class="{'active-filter':cSearchActiveFilter}"
        :float-label="cSearchLabel"
        :readonly="cDisableFields"
        :clearable="!cDisableFields"
        :loading="cFilterLoading"
        :hide-underline="cDisableFields"
        @clear="mSearchCleared"
        @keyup.13="mSearchGoToFind()"
        @keyup="mSearchKeyUp"
        @focus="mSearchFocused"
        @blur="mSearchBlured"
      />
    </q-field>
  </div>
</template>
<script>
import CvCustomExtender           from 'src/crudvuel/customs/components/grid-components/CvCombinatoryFilters'
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
        return this.cSearchLabel
      return null
    }
  }
}
</script>
