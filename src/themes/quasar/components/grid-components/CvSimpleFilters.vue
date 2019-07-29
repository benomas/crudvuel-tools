<template>
  <div class="filters-container w-100">
    <q-field
      :helper="cHelper"
    >
      <template v-slot:prepend>
        <q-icon :name="cSearchIcon" :color="cSearchIconColor" />
      </template>
      <q-input
        ref="searchInputRef"
        suffix=""
        v-model="search"
        autocomplete="off"
        :class="{'active-filter':cSearchActiveFilter}"
        :label="cSearchLabel"
        :readonly="cDisableFields"
        :clearable="!cDisableFields"
        :loading="cFilterLoading"
        :hide-underline="cDisableFields"
        @input="mInput"
        @keyup.13="mSearchGoToFind()"
        @keyup="mSearchKeyUp"
        @focus="mSearchFocused"
        @blur="mSearchBlured"
        clear-icon='fas fa-times-circle'
        class="w-100"
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
        return this.cSearchLabel
      return null
    }
  }
}
</script>
