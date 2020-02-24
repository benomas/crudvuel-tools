<template>
  <div class="filters-container w-100">
    <q-input
      borderless
      standout
      dense
      autocomplete="off"
      ref="inputRef"
      clear-icon='fas fa-times-circle'
      class="w-100"
      :class="{'active-filter':cpDinInsActiveFilter}"
      :label="cpDinInsLabel"
      :label-color="cpDinInsLabelColor"
      :clear-icon="cpDinInsClearIcon"
      :color="cpDinInsColor"
      :bg-color="cpDinInsBgColor"
      :outlined="!cpDinInsDisableFields"
      :clearable="!cpDinInsDisableFields"
      :disable="cpDinInsDisableFields"
      :readonly="cpDinInsDisableFields"
      :hide-underline="cpDinInsDisableFields"
      :hide-bottom-space="true"
      :loading="cpDinInsKeyLoading"
      :value="cpDinInsSearch"
      @clear="emDinInsClearedEmitter"
      @input="emDinInsSearchEmitter"
      @keyup="emDinInsKeyUpEmitter"
      @focus="emDinInsFocusedEmitter"
      @blur="emDinInsBluredEmitter"
      @mouseover="emDinInsMouseOverEmitter"
      @mouseleave="emDinInsMouseLeaveEmitter"
    >
      <template v-slot:prepend>
        <div :class="cpDinInsIconClass" >
          <q-icon :name="cpDinInsIcon" :color="cpDinInsIconColor" />
        </div>
      </template>
    </q-input>
  </div>
</template>
<script>
import CvComponentExtraSet        from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvSimpleFilter             from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import VueMirroring               from 'crudvuel-tools/src/mirroring/VueMirroring'
import {QIcon,QField,QInput,QBtn} from 'quasar'

export default {
  mixins: [
    CvComponentExtraSet,
    CvSimpleFilter
  ],

  components : {
    QBtn,
    QField,
    QIcon,
    QInput
  }
}
</script>
