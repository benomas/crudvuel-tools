<template>
  <cv-adaptive-grid-index v-if="resource && action" v-bind="defActionProps()">
    <!-- cv-grid-customization-->
    <template v-if="1" slot="headers-slot" slot-scope="props">
        <!-- cv-grid-customization-->
        <th cv-key="id" class="cv-orderable cv-filterable cv-selectable t-left t-middle  w-8" >
          {{ fLang('id') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="id"></cv-order-icons>
        </th>
        <th cv-key="name" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-18" >
          {{ fLang('name') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="name"></cv-order-icons>
        </th>
        <th cv-key="slug" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-20" >
          {{ fLang('slug') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="slug"></cv-order-icons>
        </th>
        <th cv-key="cat_permission_type_name" class="gt-md cv-orderable cv-filterable cv-selectable t-left t-middle w-15" >
          {{ fLang('cat_permission_type_name') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="cat_permission_type_name"></cv-order-icons>
        </th>
        <th cv-key="active" class="cv-orderable cv-filterable cv-selectable t-center t-middle w-8" >
          {{ fLang('active') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="active"></cv-order-icons>
        </th>
    </template>
    <!-- cv-grid-extra-headers-->
    <template v-if="1" slot="extra-actions-header-slot" slot-scope="props">
    </template>
    <!-- cv-grid-data-cells-->
    <template v-if="1" slot="table-properties-slot" slot-scope="props">
      <td >
        {{props.slotRow.id}}
      </td>
      <td >
        {{props.slotRow.name}}
      </td>
      <td>
        {{props.slotRow.slug}}
      </td>
      <td class="gt-md">
        {{props.slotRow.cat_permission_type_name}}
      </td>
    </template>
    <!-- cv-grid-extra-actions-->
    <template v-if="1" slot="table-extra-actions-slot" slot-scope="props">
    </template>
    <!-- cv-grid-flexi-data-cells-->
    <template v-if="1" slot="flexi-properties-slot" slot-scope="props">
      <q-item>
        <q-item-section>
          <q-item-section label>{{ fLang('id') }}</q-item-section>
        </q-item-section>
        <q-item-label>
          <q-item-section sublabel class="limit-label">{{props.slotRow.id}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ fLang('name') }}</q-item-section>
          <q-item-section sublabel class="limit-label h-50px">{{props.slotRow.name}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ fLang('slug') }}</q-item-section>
          <q-item-section sublabel class="limit-label h-50px">{{props.slotRow.slug}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ fLang('cat_permission_type_name') }}</q-item-section>
          <q-item-section sublabel class="limit-label">{{props.slotRow.cat_permission_type_name}}</q-item-section>
        </q-item-label>
      </q-item>
    </template>
    <!-- cv-grid-flexi-extra-actions-->
    <template v-if="1" slot="flexi-extra-actions-slot" slot-scope="props">
    </template>
  </cv-adaptive-grid-index>
</template>
<script>
import CvIndex             from '../../resource/CvIndex'
import CvAdaptiveGridIndex from '../../others/CvAdaptiveGridIndex'
import {QIcon}             from 'quasar'
export default {
  extends    : CvIndex,
  components : {CvAdaptiveGridIndex,QIcon}
}
</script>
