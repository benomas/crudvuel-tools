<template>
  <div class="filters-container w-100">
    <q-input
      outlined
      dense
      hide-bottom-space
      :helper="cHelper"
      ref="searchInputRef"
      suffix=""
      v-model="search"
      autocomplete="off"
      :class="{'active-filter':cpCombinatoryFiltersSearchActiveFilter}"
      :label="cpCombinatoryFiltersSearchLabel"
      :readonly="cpCombinatoryFiltersDisableFields"
      :clearable="!cpCombinatoryFiltersDisableFields"
      :loading="cpCombinatoryFiltersFilterLoading"
      :hide-underline="cpCombinatoryFiltersDisableFields"
      @input="mInput"
      @clear="mSearchCleared"
      @keyup.13="mSearchGoToFind()"
      @keyup="mSearchKeyUp"
      @focus="mSearchFocused"
      @blur="mSearchBlured"
      clear-icon='fas fa-times-circle'
      class="w-100"
    >
      <template v-slot:prepend>
        <q-icon :name="cpCombinatoryFiltersSearchIcon" :color="cpCombinatoryFiltersSearchIconColor" />
      </template>
    </q-input>
  </div>
</template>
<script>
import CvCombinatoryFilters from '../../../../components/grid-components/CvCombinatoryFilters'
import {QIcon,QField,QInput,QBtn} from 'quasar'
export default {
  extends    : CvCombinatoryFilters,
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
    mInput: function() {
      if (this.cdCombinatoryFiltersSearch === null || this.cdCombinatoryFiltersSearch === '')
        this.mSearchCleared()
    }
  },
  props: [
    'cvHelper'
  ],
  computed: {
    cHelper: function () {
      return null
      //return this.lodash.toString(this.cvHelper) || "";
    },
    cLocalSearchLabel: function () {
      if (this.cGtsm)
        return this.cpCombinatoryFiltersSearchLabel
      return null
    }
  }
}
</script>
