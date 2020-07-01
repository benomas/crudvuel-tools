<template>
  <div class="row cv-relator-container">
    <div :class="cpDinInsRelatedContainerClass">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cSourceLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive"
          class="txt-white"
          >
          {{cFilteredAvailableSource.length}} / {{cAvailableSource.length}} / {{cpDinInsSource.length}}
        </q-chip>
        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBindins('cv-simple-filter-source')"
          v-on="mCustomOns('cv-simple-filter-source')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <ul
        class="cv-drop-target cv-drop-source list-group"
        :class="['drop-target-uid-' + _uid]"
        :ref="'cv-drop-source-' + _uid"
        @dragenter="mOnDragEnter"
        @dragleave="mOnDragLeave"
        @dragover="mOnDragOver"
        @drop="mOnDrop">
        <li
          class="list-group-item cv-source-item-container"
          :class="['cv-item-' + row[cKeyName],'drop-target-uid-' + _uid]"
          v-for="(row, rowKey) in cFilteredAvailableSource"
          :key="mDinamicIndex(rowKey,row)"
          :draggable="cpDinInsDraggeable"
          :ref="'cv-source-item-' + row[cKeyName]"
          @dragstart="((e)=>mOnDragStart(e,row,'source',_uid))"
        >
          <q-icon v-if="!cDisableFields" name="fas fa-plus-square" class="f-right" @click="mAddRelated(row)"/>
          <slot name="cv-source-item" :slot-row="row">
            <span>{{cpDinInsLabelCallBack(row)}}</span>
          </slot>
        </li>
      </ul>
    </div>
    <div :class="cpDinInsRelatedSourceClass">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cRelatedLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive" class="txt-white">
          {{cFilteredAvailableRelated.length}} / {{cpDinInsRelated.length}} / {{cpDinInsSource.length}}
        </q-chip>
        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBindins('cv-simple-filter-related')"
          v-on="mCustomOns('cv-simple-filter-related')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <ul
        class="cv-drop-target cv-drop-related list-group"
        :class="['drop-target-uid-' + _uid]"
        :ref="'cv-drop-related-' + _uid"
        @dragenter="mOnDragEnter"
        @dragleave="mOnDragLeave"
        @dragover="mOnDragOver"
        @drop="mOnDrop">
        <li
          class="list-group-item cv-related-item-container q-px-xl"
          :class="['cv-item-' + row[cKeyName],'drop-target-uid-' + _uid]"
          v-for="(row, rowKey) in cFilteredAvailableRelated"
          :key="mDinamicIndex(rowKey,row)"
          :draggable="cpDinInsDraggeable"
          :ref="'cv-related-item-' + row[cKeyName]"
          @dragstart="((e)=>mOnDragStart(e,row,'related',_uid))"
        >
          <q-badge v-if="cpDinInsHasOrder" class="q-mr-sm q-mt-xs text-subtitle2" color="info" floating>{{row.order}}</q-badge>
          <q-icon v-if="!cDisableFields" name="fas fa-minus-square" :class="{'f-left':cGtxs,'f-right':cLtsm}" @click="mRemoveRelated(row)"/>
          <slot name="cv-related-item" :slot-row="row">
            <span>{{cpDinInsLabelCallBack(row)}}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CvRelationator               from 'crudvuel-tools/src/components/input-components/CvRelationator'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvResourceComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentExtraSet'
import CvSimpleFilter               from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import {QIcon,QChip,QBadge}         from 'quasar'
import VueMirroring                 from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Relationator')

export default {
  mixins: [
    CvRelationator,
    CvComponentExtraSet,
    CvResourceComponentExtraSet,
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true,posFix:'source'},
      {CvSimpleFilter,root: true,posFix:'related'}
    )
  ],

  components: {
    CvSimpleFilter,
    QIcon,
    QChip,
    QBadge
  }
}
</script>
