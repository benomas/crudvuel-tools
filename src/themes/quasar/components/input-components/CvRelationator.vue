<template>
  <div class="row cv-relator-container q-pa-xs bg-grey-l-90 rounded-borders ba-1px border-grey-l-75">
    <div :class="cpDinInsRelatedContainerClass">
      <hr class="lt-sm border-quaternary">

      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cSourceLabel}}:</span>

        <q-chip
          v-if="!cDisableFields"
          color="positive"
          class="txt-white"
          >
          {{cFilteredAvailableSource.length}} / {{cdAvailableSourceRows.length}} / {{cdSourceRows.length}}
        </q-chip>

        <q-btn
          round
          size="xs"
          class="bg-info-l-93 txt-info-l-54"
          :icon="cLtsm?'fas fa-angle-double-down':'fas fa-angle-double-right'"
          @click="(()=>{
            mPushAllRight().mUpdateAvailableSourceRows()
          })"
        />

        <cv-simple-filter
          class=""
          v-bind="mCustomBindins('cv-simple-filter-source')"
          v-on="mCustomOns('cv-simple-filter-source')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>

      <ul
        v-if="cdReady"
        class="cv-drop-target cv-drop-source list-group"
        :class="['drop-target-uid-' + _uid]"
        :ref="'cv-drop-source-' + _uid"
        @dragenter="mOnDragEnter"
        @dragleave="mOnDragLeave"
        @dragover="mOnDragOver"
        @drop="mOnDrop">
        <li
          class="list-group-item cv-source-item-container"
          :class="['cv-item-' + mSourceRowKey(sourceKey -1),'drop-target-uid-' + _uid]"
          v-for="sourceKey in cSourceRowsVisualLimit"
          :key="mDinamicIndex(sourceKey -1,mSourceRow(sourceKey -1))"
          :draggable="cpDinInsDraggeable"
          :ref="'cv-source-item-' + mSourceRowKey"
          @dragstart="((e)=>mOnDragStart(e,mSourceRow(sourceKey -1),'source',_uid))"
        >
          <div v-if="mSourceRowKey(sourceKey -1)">
            <q-icon v-if="!cDisableFields" name="fas fa-plus-square" class="f-right" @click="(()=>{
              mAddRelated(mSourceRow(sourceKey -1)).mUpdateAvailableSourceRows()
            })"/>

            <slot name="cv-source-item" :slot-row="mSourceRow(sourceKey -1)">
              <span>{{cpDinInsLabelCallBack(mSourceRow(sourceKey -1))}}</span>
            </slot>
          </div>

          <q-skeleton v-else type="rect" />
        </li>
      </ul>

      <div v-else class="q-pa-md bg-grey-l-96 q-mt-md">
        <div class="q-gutter-md">
          <q-skeleton class="bg-grey-l-84" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-93" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-84" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-93" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-84" animation="pulse-y" />
        </div>
      </div>

      <div class="bg-grey-l-96 q-px-md ba-1px border-grey-l-72">
        <q-slider
          class="txt-positive-l-45"
          :readonly="cSourceRowsVisualLimit < cdMinimumRowsVisualLimit"
          :value="cdSourceRowsVisualLimit"
          @change="val => { sourceRowsVisualLimit = val }"
          :min="cdMinimumRowsVisualLimit"
          :max="cdSourceRows.length"
          :step="cSourceRowsVisualLimitStep"
          label
          markers
          :label-value="`${cLimitListLabel} ${cdSourceRowsVisualLimit}`"
        />
      </div>

    </div>
    <div :class="cpDinInsRelatedSourceClass">
      <hr class="lt-sm border-quaternary">

      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cRelatedLabel}}:</span>

        <q-chip
          v-if="!cDisableFields"
          color="positive" class="txt-white">
          {{cFilteredAvailableRelated.length}} / {{cdRelatedRows.length}} / {{cdSourceRows.length}}
        </q-chip>

        <q-btn
          round
          size="xs"
          class="bg-info-l-93 txt-info-l-54"
          :icon="cLtsm?'fas fa-angle-double-up':'fas fa-angle-double-left'"
          @click="(()=>{
            mPushAllLeft().mUpdateAvailableSourceRows()
          })"
        />

        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBindins('cv-simple-filter-related')"
          v-on="mCustomOns('cv-simple-filter-related')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>

      <ul
        v-if="cdReady"
        class="cv-drop-target cv-drop-related list-group"
        :class="['drop-target-uid-' + _uid]"
        :ref="'cv-drop-related-' + _uid"
        @dragenter="mOnDragEnter"
        @dragleave="mOnDragLeave"
        @dragover="mOnDragOver"
        @drop="mOnDrop">
        <li
          class="list-group-item cv-related-item-container"
          :class="['cv-item-' + mRelatedRowKey(relatedKey -1),'drop-target-uid-' + _uid]"
          v-for="relatedKey in cRelatedRowsVisualLimit"
          :key="mDinamicIndex(relatedKey -1,mRelatedRow(relatedKey -1))"
          :draggable="cpDinInsDraggeable"
          :ref="'cv-related-item-' + mRelatedRowKey(relatedKey -1)"
          @dragstart="((e)=>mOnDragStart(e,mRelatedRow(relatedKey -1),'related',_uid))"
        >
          <div v-if="mRelatedRowKey(relatedKey -1)">
            <q-badge class="q-mt-sm text-subtitle2" :class="{'f-left q-mr-md':cGtxs,'f-right q-mr-sm':cLtsm}" color="info" floating>{{1 + mFindItemPosition(mRelatedRow(relatedKey -1),cdRelatedRows)}}</q-badge>

            <q-icon v-if="!cDisableFields" name="fas fa-minus-square" class="my-auto" :class="{'f-left':cGtxs,'f-right':cLtsm}"
              @click="(()=>{mRemoveRelated(mRelatedRow(relatedKey -1)).mUpdateAvailableSourceRows()})"/>

            <slot name="cv-related-item" :slot-row="mRelatedRow(relatedKey -1)">
              <span>{{cpDinInsLabelCallBack(mRelatedRow(relatedKey -1))}}</span>
            </slot>
          </div>

          <q-skeleton v-else type="rect" />
        </li>
      </ul>

      <div v-else class="q-pa-md bg-grey-l-96 q-mt-md">
        <div class="q-gutter-md">
          <q-skeleton class="bg-grey-l-84" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-93" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-84" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-93" animation="pulse-y" />
          <q-skeleton class="bg-grey-l-84" animation="pulse-y" />
        </div>
      </div>

      <div class="bg-white-l-96 q-px-md ba-1px border-grey-l-72">
        <q-slider
          class="txt-positive-l-45"
          :readonly="cRelatedRowsVisualLimit < cdMinimumRowsVisualLimit"
          :value="cdRelatedRowsVisualLimit"
          @change="val => { relatedRowsVisualLimit = val }"
          :min="cdMinimumRowsVisualLimit"
          :max="cdSourceRows.length"
          :step="cSourceRowsVisualLimitStep"
          label
          markers
          :label-value="`${cLimitListLabel} ${cdRelatedRowsVisualLimit}`"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CvRelationator               from 'crudvuel-tools/src/components/input-components/CvRelationator'
import CvComponentExtraSet          from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvResourceComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentExtraSet'
import CvSimpleFilter               from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import {QIcon,QChip,QBadge,QBtn,QSkeleton,QSlider}     from 'quasar'
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
    QBadge,
    QBtn,
    QSkeleton,
    QSlider
  }
}
</script>
