<template>
  <cv-adaptive-grid-index v-if="cResource && cAction" v-bind="defActionProps()" v-on="bGridOn()">
    <!-- cv-grid-customization-->
    <template v-if="1" slot="headers-slot" slot-scope="props">
        <!-- cv-grid-customization-->
        <th  cv-key="id" class="cv-orderable cv-filterable cv-selectable t-left t-middle  w-8" >
          {{ mfLang('id') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="id"></cv-order-icons>
        </th>
        <th cv-key="name" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-25" >
          {{ mfLang('name') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="name"></cv-order-icons>
        </th>
        <th  cv-key="slug" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-22" >
          {{ mfLang('slug') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="slug"></cv-order-icons>
        </th>
        <th  cv-key="description" class="gt-md cv-orderable cv-filterable cv-selectable t-left t-middle w-22" >
          {{ mfLang('description') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="description"></cv-order-icons>
        </th>
        <th  cv-key="active" class="cv-orderable cv-filterable cv-selectable t-center t-middle w-8" >
          {{ mfLang('active') }}
          <cv-order-icons :cv-data="props.gridData" cv-key="active"></cv-order-icons>
        </th>
        <th  cv-key="cv_search" class="cv-selectable" hidden >
        </th>
    </template>
    <!-- cv-grid-extra-headers-->
    <template v-if="1" slot="extra-actions-header-slot" slot-scope="props">
    </template>
    <template v-if="cEnableSuperFilers" slot="sub-headers-slot" slot-scope="props">
      <tr >
        <td >
          <cv-simple-filter
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('id',search)
            })"
          >
          </cv-simple-filter>
        </td>
        <td >
          <cv-simple-filter
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('name',search)
            })"
          >
          </cv-simple-filter>
        </td>
        <td >
          <cv-simple-filter
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('slug',search)
            })"
          >
          </cv-simple-filter>
        </td>
        <td >
          <cv-simple-filter
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('description',search)
            })"
          >
          </cv-simple-filter>
        </td>
        <td class="t-center">
        </td>
        <td class="t-center">
        </td>
      </tr>
    </template>
    <!-- cv-grid-data-cells-->
    <template v-if="1" slot="table-properties-slot" slot-scope="props">
      <td >
        {{props.slotRow.id}}
      </td>
      <td >
        {{props.slotRow.name}}
      </td>
      <td >
        {{props.slotRow.slug}}
      </td>
      <td class="gt-md">
        {{props.slotRow.description}}
      </td>
    </template>
    <!-- cv-grid-extra-actions-->
    <template v-if="1" slot="table-extra-actions-slot" slot-scope="props">
    </template>
    <!-- cv-grid-flexi-data-cells-->
    <template v-if="1" slot="flexi-properties-slot" slot-scope="props">
      <q-item>
        <q-item-section>
          <q-item-section label>{{ mfLang('id') }}</q-item-section>
        </q-item-section>
        <q-item-label>
          <q-item-section sublabel class="limit-label">{{props.slotRow.id}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ mfLang('name') }}</q-item-section>
          <q-item-section sublabel class="limit-label">{{props.slotRow.name}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ mfLang('slug') }}</q-item-section>
          <q-item-section sublabel class="limit-label">{{props.slotRow.slug}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ mfLang('description') }}</q-item-section>
          <q-item-section sublabel class="limit-label h-60px">{{props.slotRow.description}}</q-item-section>
        </q-item-label>
      </q-item>
    </template>
    <!-- cv-grid-flexi-extra-actions-->
    <template v-if="1" slot="flexi-extra-actions-slot" slot-scope="props">
    </template>
  </cv-adaptive-grid-index>
</template>
<script>
import CvIndex             from 'src/customs/crudvuel/themes/quasar/components/resource/CvIndex'
import CvAdaptiveGridIndex from 'src/customs/crudvuel/themes/quasar/components/others/CvAdaptiveGridIndex'
import {QIcon}             from 'quasar'
export default {
  extends    : CvIndex,
  components : {CvAdaptiveGridIndex,QIcon}
}
</script>
