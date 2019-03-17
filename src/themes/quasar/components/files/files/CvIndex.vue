<template>
  <cv-adaptive-grid-index v-if="resource && action" v-bind="defActionProps()">
    <!-- cv-grid-customization-->
    <template v-if="1" slot="headers-slot" slot-scope="props">
      <!-- cv-grid-customization-->
      <th cv-key="id" class="cv-orderable cv-filterable cv-selectable t-left t-middle  w-8" ref="headers">
        {{ fLang('id') }}
        <cv-order-icons :cv-data="props.gridData" cv-key="id"></cv-order-icons>
      </th>
      <th cv-key="search_field" class="t-left t-middle w-27" ref="headers">
        {{ fLang('search_field') }}
      </th>
      <th cv-key="cat_file_name" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-25" ref="headers">
        {{ fLang('cat_file_name') }}
        <cv-order-icons :cv-data="props.gridData" cv-key="cat_file_name"></cv-order-icons>
      </th>
      <th cv-key="cat_file_slug" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-15" ref="headers">
        {{ fLang('cat_file_slug') }}
        <cv-order-icons :cv-data="props.gridData" cv-key="cat_file_slug"></cv-order-icons>
      </th>
      <th cv-key="active" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-10" ref="headers">
        {{ fLang('active') }}
        <cv-order-icons :cv-data="props.gridData" cv-key="active"></cv-order-icons>
      </th>
      <th cv-key="resource_id" class="cv-filterable cv-selectable " hidden>
      </th>
    </template>
    <!-- cv-grid-table-extra-headers-->
    <template v-if="1" slot="extra-actions-header-slot" slot-scope="props">
    </template>
    <!-- cv-grid-table-data-cells-->
    <template v-if="1" slot="table-properties-slot" slot-scope="props">
      <td>
        {{props.slotRow.id}}
      </td>
      <td>
        {{props.slotRow.resource.search_field}}
      </td>
      <td>
        {{props.slotRow.cat_file_name}}
      </td>
      <td>
        {{props.slotRow.cat_file_slug}}
      </td>
    </template>
    <!-- cv-grid-flexi-extra-actions-->
    <template v-if="1" slot="table-extra-actions-slot" slot-scope="props">
    </template>
    <!-- cv-grid-flexi-data-cells-->
    <template v-if="1" slot="flexi-properties-slot" slot-scope="props">
      <q-item>
        <q-item-side>
          <q-item-tile label>{{ fLang('id') }}</q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile sublabel class="limit-label">{{props.slotRow.id}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>{{ fLang('search_field') }}</q-item-tile>
          <q-item-tile sublabel class="limit-label">{{props.slotRow.resource.search_field}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>{{ fLang('cat_file_name') }}</q-item-tile>
          <q-item-tile sublabel class="limit-label">{{props.slotRow.cat_file_name}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>{{ fLang('cat_file_slug') }}</q-item-tile>
          <q-item-tile sublabel class="limit-label">{{props.slotRow.cat_file_slug}}</q-item-tile>
        </q-item-main>
      </q-item>
    </template>
    <!-- cv-grid-flexi-extra-actions-->
    <template v-if="1" slot="flexi-extra-actions-slot" slot-scope="props">
    </template>
  </cv-adaptive-grid-index>
</template>
<script>
import CvIndex             from 'src/crudvuel/customs/themes/quasar/components/resource/CvIndex.vue'
import CvAdaptiveGridIndex from 'src/crudvuel/customs/themes/quasar/components/others/CvAdaptiveGridIndex.vue'
import {QIcon}             from 'quasar'
export default {
  extends    : CvIndex,
  components : {CvAdaptiveGridIndex,QIcon}
}
</script>
