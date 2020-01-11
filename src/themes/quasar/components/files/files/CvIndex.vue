<template>
  <cv-adaptive-grid-index v-if="resource && action" v-bind="defActionProps()" v-on="bGridOn()">
    <!-- cv-grid-customization-->
    <template v-if="1" slot="headers-slot" slot-scope="props">
      <!-- cv-grid-customization-->
      <th cv-key="id" class="cv-orderable cv-filterable cv-selectable t-left t-middle  w-8" ref="headers">
        {{ fLang('id') }}
        <cv-order-icons :cv-data="props.gridData" cv-key="id"></cv-order-icons>
      </th>
      <th cv-key="cv_search" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-27" ref="headers">
        {{ fLang('cv_search') }}
        <cv-order-icons :cv-data="props.gridData" cv-key="cv_search"></cv-order-icons>
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
    <template v-if="cEnableSuperFilers" slot="sub-headers-slot" slot-scope="props">
      <tr >
        <td >
          <cv-simple-filters
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('id',search)
            })"
          >
          </cv-simple-filters>
        </td>
        <td >
          <cv-simple-filters
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('cv_search',search)
            })"
          >
          </cv-simple-filters>
        </td>
        <td >
          <cv-simple-filters
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('cat_file_name',search)
            })"
          >
          </cv-simple-filters>
        </td>
        <td >
          <cv-simple-filters
            class="w-100"
            :cv-search-label="''"
            cv-search-icon=""
            @cv-event-filter-go-to-find="((search)=>{
              superFilter('cat_file_slug',search)
            })"
          >
          </cv-simple-filters>
        </td>
        <td class="t-center">
        </td>
        <td class="t-center">
        </td>
      </tr>
    </template>
    <!-- cv-grid-table-data-cells-->
    <template v-if="1" slot="table-properties-slot" slot-scope="props">
      <td>
        {{props.slotRow.id}}
      </td>
      <td>
        {{props.slotRow.cv_search}}
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
        <q-item-section>
          <q-item-section label>{{ fLang('id') }}</q-item-section>
        </q-item-section>
        <q-item-label>
          <q-item-section sublabel class="limit-label">{{props.slotRow.id}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ fLang('cv_search') }}</q-item-section>
          <q-item-section sublabel class="limit-label">{{props.slotRow.cv_search}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ fLang('cat_file_name') }}</q-item-section>
          <q-item-section sublabel class="limit-label">{{props.slotRow.cat_file_name}}</q-item-section>
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item-section label>{{ fLang('cat_file_slug') }}</q-item-section>
          <q-item-section sublabel class="limit-label">{{props.slotRow.cat_file_slug}}</q-item-section>
        </q-item-label>
      </q-item>
    </template>
    <!-- cv-grid-flexi-extra-actions-->
    <template v-if="1" slot="flexi-extra-actions-slot" slot-scope="props">
    </template>
  </cv-adaptive-grid-index>
</template>
<script>
import CvIndex             from 'src/customs/crudvuel/themes/quasar/components/resource/CvIndex.vue'
import CvAdaptiveGridIndex from 'src/customs/crudvuel/themes/quasar/components/others/CvAdaptiveGridIndex.vue'
import {QIcon}             from 'quasar'
export default {
  extends    : CvIndex,
  components : {CvAdaptiveGridIndex,QIcon}
}
</script>
