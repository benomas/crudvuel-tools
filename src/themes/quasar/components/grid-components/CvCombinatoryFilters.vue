<template>
  <div class="filters-container w-100">
    <q-field
    >
      <q-input
      :helper="cHelper"
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
        @clear="mSearchCleared"
        @keyup.13="mSearchGoToFind()"
        @keyup="mSearchKeyUp"
        @focus="mSearchFocused"
        @blur="mSearchBlured"
        clear-icon='fas fa-times-circle'
        class="w-100"
      />
        <template v-slot:prepend>
          <q-icon :name="cSearchIcon" :color="cSearchIconColor" />
        </template>
      </q-input>
    </q-field>
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
