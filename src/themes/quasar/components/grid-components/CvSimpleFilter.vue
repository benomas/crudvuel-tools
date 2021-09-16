<template>
  <div class="filters-container">
    <q-input
      dense
      autocomplete="off"
      ref="inputRef"
      class="w-100"
      :class="{'active-filter':cpDinInsActiveFilter}"
      :label="cpDinInsLabel"
      :label-color="cpDinInsLabelColor"
      :clear-icon="cpDinInsClearIcon"
      :color="cpDinInsColor"
      :bg-color="cpDinInsBgColor"
      :clearable="!cpDinInsDisableFields"
      :standout="!cpDinInsMaterializeMode"
      :readonly="cpDinInsDisableFields"
      :hide-bottom-space="true"
      :hide-underline="cpDinInsDisableFields"
      :outlined="!cpDinInsMaterializeMode && !cpDinInsDisableFields"
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
      <template v-slot:prepend v-if="cpDinInsShowIcon">
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
    CvSimpleFilter,
    CvComponentExtraSet
  ],

  components : {
    QBtn,
    QField,
    QIcon,
    QInput
  }
}
/*:borderless="!cpDinInsMaterializeMode" removed from q-input*/
</script>
