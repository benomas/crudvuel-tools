<template>
  <div class="row cv-relator-container">
    <div
      class="col-sm-6 col-xs-12 related-items q-pa-sm"
    >
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        {{relatedLabel}}:
        <q-chip
          v-if="!cDisableFields"
          color="positive">
          {{cFilteredRelated.length}} / {{cLocalRelated.length}}
        </q-chip>
        <cv-simple-filters
          v-if="!cDisableFields"
          v-bind="mDefMatcherizerProps('relatedSimpleFilterRef')"
          @cv-simple-search-key-up="((key)=>{keyed(key,'relatedSimpleFilterRef')})"
          @cv-simple-filter-go-to-find="relatedSimpleFilterFind"
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
          <q-icon v-if="!cDisableFields" name="clear" class="f-right"/>
          {{row[cLabelProperty]}}
        </li>
      </ul>
    </div>
    <div
      class="col-sm-6 col-xs-12 related-items q-pa-sm"
    >
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        {{sourceLabel}}
        <q-chip
          v-if="!cDisableFields"
          color="positive">
          {{cFilteredSource.length}} / {{cLocalSource.length}}
        </q-chip>
        <cv-simple-filters
          v-if="!cDisableFields"
          v-bind="mDefMatcherizerProps('sourceSimpleFilterRef')"
          @cv-simple-search-key-up="((key)=>{keyed(key,'sourceSimpleFilterRef')})"
          @cv-simple-filter-go-to-find="sourceSimpleFilterFind"
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
          <q-icon v-if="!cDisableFields" name="add" class="f-left"/>
          {{row[cLabelProperty]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CvCustomExtender from 'src/crudvuel/customs/components/input-components/CvRelationator'
import CvSimpleFilters  from '../grid-components/CvSimpleFilters'
import {QIcon,QChip}    from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    QIcon,
    CvSimpleFilters,
    QChip
  }
}
</script>
