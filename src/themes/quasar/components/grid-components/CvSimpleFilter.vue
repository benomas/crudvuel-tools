<template>
  <div class="filters-container w-100">
    <q-input
      outlined
      dense
      autocomplete="off"
      ref="inputRef"
      clear-icon='fas fa-times-circle'
      class="w-100"
      :class="{'active-filter':cpDinInsActiveFilter}"
      :label="cpDinInsLabel"
      :label-color="cpDinInsLabelColor"
      :hint="cpDinInsHint"
      :clear-icon="cpDinInsClearIcon"
      :color="cpDinInsColor"
      :bg-color="cpDinInsBgColor"
      :clearable="!cpDinInsDisableFields"
      :disable="cpDinInsDisableFields"
      :readonly="cpDinInsDisableFields"
      :hide-underline="cpDinInsDisableFields"
      :loading="cpDinInsKeyLoading"
      :value="cpDinInsSearch"
      @clear="emDinInsClearedEmitter"
      @input="emDinInsSearchEmitter"
      @keyup="emDinInsKeyUpEmitter"
      @focus="emDinInsFocusedEmitter"
      @blur="emDinInsBluredEmitter"
    >
      <template v-slot:prepend>
        <q-icon :name="cpDinInsIcon" :color="cpDinInsIconColor" />
      </template>
    </q-input>
  </div>
</template>
<script>
import VueMirroring               from 'crudvuel-tools/src/mirroring/VueMirroring'
import CvSimpleFilter            from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import {QIcon,QField,QInput,QBtn} from 'quasar'
export default {
  extends    : CvSimpleFilter,
  components : {
    QBtn,
    QField,
    QIcon,
    QInput
  },
  methods: {
  },
  props: [
  ],
  computed: {
  },
  mounted: function () {
  }
}
</script>
