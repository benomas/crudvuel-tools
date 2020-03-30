<template>
  <div class="cv-index" :class="{'q-pa-sm':cGtxs}">
    <cv-action-container
      v-if="cpStaGenAction"
      v-bind="mCustomBindins('cv-action-container')"
      v-on="mCustomOns('cv-action-container')">
      <div slot="cv-title-slot" class="row action-label">
        <div class="col-xs-10 col-sm-9 col-md-8  q-pb-md">
          <label>
            <span class="q-headline txt-secondary f-bold">
              {{cpStaGenAction.label}}
            </span>
          </label>
        </div>
      </div>
      <div slot="cv-content-slot">
        <div>
          <cv-adaptive-grid-index
            v-bind="mCustomBindins('cv-adaptive-grid-index')"
            v-on="mCustomOns('cv-adaptive-grid-index')"
            :cv-sta-comf-cv-paginate-limit-values="[ 8, 20, 50, 100, 200 ]"
            :cv-sta-comf-cv-paginate-pages-per-view="5"
            :cv-din-insf-adaptive-grid-index-grid-show-top-pagination="false"
            >
            <template v-if="1" slot="headers-slot">
                <!-- cv-grid-customization-->
              <th v-cv-page-opt="'id'" class="cv-orderable cv-filterable cv-selectable t-left t-middle  w-5" >
                {{ mfLang('id') }}
                <cv-order-icons cv-sta-ins-row-field="id" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
              </th>
              <th v-cv-page-opt="'name'" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-10">
                {{ mfLang('name') }}
                <cv-order-icons cv-sta-ins-row-field="name" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
              </th>
              <th v-cv-page-opt="'slug'" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-10">
                {{ mfLang('slug') }}
                <cv-order-icons cv-sta-ins-row-field="slug" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
              </th>
              <th v-cv-page-opt="'description'" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-30">
                {{ mfLang('description') }}
                <cv-order-icons cv-sta-ins-row-field="description" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
              </th>
              <th v-cv-page-opt="'resource'" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-10">
                {{ mfLang('resource') }}
                <cv-order-icons cv-sta-ins-row-field="resource" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
              </th>
              <th v-cv-page-opt="'active'" class="cv-orderable cv-filterable cv-selectable t-left t-middle w-10" ref="headers">
                {{ mfLang('active') }}
                <cv-order-icons cv-sta-ins-row-field="active" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
              </th>
            </template>
            <template v-if="cEnableSimpleFieldFilter" slot="sub-headers-slot">
              <tr>
                <td>
                  <cv-simple-field-filter
                    v-bind="mCustomBindins('cv-simple-field-filter')"
                    v-on="mCustomOns('cv-simple-field-filter')"
                    :cv-din-ins-field="'id'"
                  >
                  </cv-simple-field-filter>
                </td>
                <td>
                  <cv-simple-field-filter
                    v-bind="mCustomBindins('cv-simple-field-filter')"
                    v-on="mCustomOns('cv-simple-field-filter')"
                    :cv-din-ins-field="'name'"
                  >
                  </cv-simple-field-filter>
                </td>
                <td>
                  <cv-simple-field-filter
                    v-bind="mCustomBindins('cv-simple-field-filter')"
                    v-on="mCustomOns('cv-simple-field-filter')"
                    :cv-din-ins-field="'slug'"
                  >
                  </cv-simple-field-filter>
                </td>
                <td>
                  <cv-simple-field-filter
                    v-bind="mCustomBindins('cv-simple-field-filter')"
                    v-on="mCustomOns('cv-simple-field-filter')"
                    :cv-din-ins-field="'description'"
                  >
                  </cv-simple-field-filter>
                </td>
                <td>
                  <cv-simple-field-filter
                    v-bind="mCustomBindins('cv-simple-field-filter')"
                    v-on="mCustomOns('cv-simple-field-filter')"
                    :cv-din-ins-field="'resource'"
                  >
                  </cv-simple-field-filter>
                </td>
                <td class="t-center">
                </td>
                <td class="t-center">
                </td>
              </tr>
            </template>
            <template v-if="1" slot="table-properties-slot" slot-scope="props">
              <td>{{props.slotRow.id}}</td>
              <td>{{props.slotRow.name}}</td>
              <td>{{props.slotRow.slug}}</td>
              <td>{{props.slotRow.description}}</td>
              <td>{{props.slotRow.resource}}</td>
            </template>
            <!-- cv-grid-extra-actions-->
            <template v-if="1" slot="table-extra-actions-slot">
            </template>
            <template v-if="1" slot="flexi-grind-headers-slot">
              <div v-cv-page-opt="'id'" class="col-xs-12 cv-orderable cv-filterable cv-selectable q-py-sm">
                <cv-order-icons cv-sta-ins-row-field="id" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
                {{ mfLang('id') }}
              </div>
              <div class="col-xs-12">
                <cv-simple-field-filter
                  v-if="cEnableSimpleFieldFilter"
                  v-bind="mCustomBindins('cv-simple-field-filter')"
                  v-on="mCustomOns('cv-simple-field-filter')"
                  :cv-din-ins-field="'id'"
                >
                </cv-simple-field-filter>
              </div>
              <div v-cv-page-opt="'name'" class="col-xs-12 cv-orderable cv-filterable cv-selectable q-py-sm">
                <cv-order-icons cv-sta-ins-row-field="name" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
                {{ mfLang('name') }}
              </div>
              <div class="col-xs-12">
                <cv-simple-field-filter
                  v-if="cEnableSimpleFieldFilter"
                  v-bind="mCustomBindins('cv-simple-field-filter')"
                  v-on="mCustomOns('cv-simple-field-filter')"
                  :cv-din-ins-field="'name'"
                >
                </cv-simple-field-filter>
              </div>
              <div v-cv-page-opt="'slug'" class="col-xs-12 cv-orderable cv-filterable cv-selectable q-py-sm">
                <cv-order-icons cv-sta-ins-row-field="slug" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
                {{ mfLang('slug') }}
              </div>
              <div class="col-xs-12">
                <cv-simple-field-filter
                  v-if="cEnableSimpleFieldFilter"
                  v-bind="mCustomBindins('cv-simple-field-filter')"
                  v-on="mCustomOns('cv-simple-field-filter')"
                  :cv-din-ins-field="'slug'"
                >
                </cv-simple-field-filter>
              </div>
              <div v-cv-page-opt="'description'" class="col-xs-12 cv-orderable cv-filterable cv-selectable q-py-sm">
                <cv-order-icons cv-sta-ins-row-field="description" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
                {{ mfLang('description') }}
              </div>
              <div class="col-xs-12">
                <cv-simple-field-filter
                  v-if="cEnableSimpleFieldFilter"
                  v-bind="mCustomBindins('cv-simple-field-filter')"
                  v-on="mCustomOns('cv-simple-field-filter')"
                  :cv-din-ins-field="'description'"
                >
                </cv-simple-field-filter>
              </div>
              <div v-cv-page-opt="'resource'" class="col-xs-12 cv-orderable cv-filterable cv-selectable q-py-sm">
                <cv-order-icons cv-sta-ins-row-field="resource" v-bind="mCustomBindins('cv-order-icons')">
                </cv-order-icons>
                {{ mfLang('resource') }}
              </div>
              <div class="col-xs-12">
                <cv-simple-field-filter
                  v-if="cEnableSimpleFieldFilter"
                  v-bind="mCustomBindins('cv-simple-field-filter')"
                  v-on="mCustomOns('cv-simple-field-filter')"
                  :cv-din-ins-field="'resource'"
                >
                </cv-simple-field-filter>
              </div>
            </template>
            <!-- cv-grid-flexi-data-cells-->
            <template v-if="1" slot="flexi-properties-slot" slot-scope="props">
              <q-item>
                <q-item-section>
                  <q-item-section label class="f-bold text-subtitle2">{{ mfLang('id') }}</q-item-section>
                </q-item-section>
                <q-item-label>
                  <q-item-section sublabel class="limit-label">{{props.slotRow.id}}</q-item-section>
                </q-item-label>
              </q-item>
              <q-item>
                <q-item-label>
                  <q-item-section label class="f-bold text-subtitle2">{{ mfLang('name') }}</q-item-section>
                  <q-item-section sublabel class="limit-label">{{props.slotRow.name}}</q-item-section>
                </q-item-label>
              </q-item>
              <q-item>
                <q-item-label>
                  <q-item-section label class="f-bold text-subtitle2">{{ mfLang('slug') }}</q-item-section>
                  <q-item-section sublabel class="limit-label">{{props.slotRow.slug}}</q-item-section>
                </q-item-label>
              </q-item>
              <q-item>
                <q-item-label>
                  <q-item-section label class="f-bold text-subtitle2">{{ mfLang('description') }}</q-item-section>
                  <q-item-section sublabel class="limit-label">{{props.slotRow.description}}</q-item-section>
                </q-item-label>
              </q-item>
              <q-item>
                <q-item-label>
                  <q-item-section label class="f-bold text-subtitle2">{{ mfLang('resource') }}</q-item-section>
                  <q-item-section sublabel class="limit-label">{{props.slotRow.resource}}</q-item-section>
                </q-item-label>
              </q-item>
            </template>
            <!-- cv-grid-flexi-extra-actions-->
            <template v-if="1" slot="flexi-extra-actions-slot">
            </template>
          </cv-adaptive-grid-index>
        </div>
      </div>
    </cv-action-container>
  </div>
</template>
<script>
import CvIndex            from 'cq-crudvuel/resource/CvIndex'
import cvPageOpt          from 'crudvuel/directives/cvPageOpt'
import {QIcon,QSkeleton}  from 'quasar'
export default {
  mixins: [
    CvIndex
  ],
  components : { QIcon,QSkeleton },
  directives : {
    cvPageOpt: cvPageOpt
  },
  computed: {
  },
  methods: {
  },
  mounted: function () {
    //console.log(this)
  }
}
</script>
