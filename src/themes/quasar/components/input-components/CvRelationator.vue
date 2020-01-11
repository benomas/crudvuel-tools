<template>
  <div class="row cv-relator-container">
    <div class="col-xs-12 col-sm-6 related-items q-pa-sm">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{relatedLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive" class="txt-white">
          {{cFilteredRelated.length}} / {{cLocalRelated.length}}
        </q-chip>
        <cv-simple-filters
          v-if="!cDisableFields"
          v-bind="mDefMatcherizerProps('relatedSimpleFilterRef')"
          @cv-search-key-up="((key)=>{keyed(key,'relatedSimpleFilterRef')})"
          @cv-event-filter-go-to-find="relatedSimpleFilterFind"
          class="q-pl-sm q-pr-xl"
        >
        </cv-simple-filters>
      </div>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in cFilteredRelated"
            :key="mDinamicIndex(row)"
            @click="removeRelated(rowKey,row)"
        >
          <q-icon v-if="!cDisableFields" name="fas fa-minus-square" class="f-right"/>
          {{row[cLabelProperty]}}
        </li>
      </ul>
    </div>
    <div class="col-xs-12 col-sm-6 related-items q-pa-sm">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{sourceLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive"
          class="txt-white"
          >
          {{cFilteredSource.length}} / {{cLocalSource.length}}
        </q-chip>
        <cv-simple-filters
          v-if="!cDisableFields"
          v-bind="mDefMatcherizerProps('sourceSimpleFilterRef')"
          @cv-search-key-up="((key)=>{keyed(key,'sourceSimpleFilterRef')})"
          @cv-event-filter-go-to-find="sourceSimpleFilterFind"
          class="q-pl-sm q-pr-xl"
        >
        </cv-simple-filters>
      </div>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(row, rowKey) in cFilteredSource"
            :key="mDinamicIndex(row)"
            @click="addRelated(rowKey,row)"
        >
          <q-icon v-if="!cDisableFields" name="fas fa-plus-square" class="f-left"/>
          {{row[cLabelProperty]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CvRelationator from '../../../../components/input-components/CvRelationator'
import CvSimpleFilters  from '../grid-components/CvSimpleFilters'
import {QIcon,QChip}    from 'quasar'
export default {
  extends    : CvRelationator,
  components : {
    QIcon,
    CvSimpleFilters,
    QChip
  }
}
</script>
