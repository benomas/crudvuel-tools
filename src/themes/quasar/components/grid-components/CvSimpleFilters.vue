<template>
  <div class="filters-container w-100">
    <q-input
      outlined
      dense
      :helper="cHelper"
      ref="searchInputRef"
      suffix=""
      v-model="search"
      autocomplete="off"
      :class="{'active-filter':cpSearchActiveFilter}"
      :label="cpSearchLabel"
      :readonly="cpDisableFields"
      :clearable="!cpDisableFields"
      :loading="cpFilterLoading"
      :hide-underline="cpDisableFields"
      @input="mInput"
      @keyup.13="mSearchGoToFind()"
      @keyup="mSearchKeyUp"
      @focus="mSearchFocused"
      @blur="mSearchBlured"
      clear-icon='fas fa-times-circle'
      class="w-100"
    >
    <template v-slot:prepend>
      <q-icon :name="cpSearchIcon" :color="cpSearchIconColor" />
    </template>
    </q-input>
  </div>
</template>
<script>
import CvSimpleFilters from '../../../../components/grid-components/CvSimpleFilters'
import {QIcon,QField,QInput,QBtn} from 'quasar'
export default {
  extends    : CvSimpleFilters,
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
      if (this.search === null || this.search === '')
        this.mSearchCleared()
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
        return this.cpSearchLabel
      return null
    }
  }
}
</script>
