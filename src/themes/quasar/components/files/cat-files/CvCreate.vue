<template>
  <cv-action-container v-if="resource && action" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-pa-md">
        <q-field v-bind="defErrorInputProps('name')">
          <q-input v-bind="defInputProps('name')" v-model.trim="row.name"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-pa-md">
        <q-field v-bind="defErrorInputProps('slug')">
          <q-input v-bind="defInputProps('slug')" v-model.trim="row.slug"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-pa-md">
        <q-field v-bind="defErrorInputProps('types')">
          <q-input v-bind="defInputProps('types')" v-model.trim="row.types"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-md">
        <q-field v-bind="defErrorInputProps('max_size')">
          <q-input v-bind="defInputProps('max_size')" v-model.trim="row.max_size"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-md">
        <q-field v-bind="defErrorInputProps('min_size')">
          <q-input v-bind="defInputProps('min_size')" v-model.trim="row.min_size"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-md">
        <q-field v-bind="defErrorInputProps('group')">
          <q-input v-bind="defInputProps('group')" v-model.trim="row.group"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-4 col-lg-2 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('required')">
          <cv-toggle v-bind="defInputProps('required')" v-model="row.required" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-4 col-lg-2 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('multiple')">
          <cv-toggle v-bind="defInputProps('multiple')" v-model="row.multiple" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-4 col-lg-2 q-pa-md m-auto">
        <q-field v-bind="defErrorInputProps('active')">
          <cv-toggle v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-lg-12 q-pa-md">
        <q-field v-bind="defErrorInputProps('description')">
          <q-input v-bind="defInputProps('description')" v-model="row.description" type="textarea" :max-height="100" :min-rows="7"/>
        </q-field>
      </div>
      <div class="col-xs-12 h-50px">
      <!-- Code -->
      </div>
      <div class="col-xs-12">
        <cv-buttons :cv-ready="ready" @cv-back="cancelAction()" @cv-next="setService()" :cv-action="action">
        </cv-buttons>
      </div>
    </div>
  </cv-action-container>
</template>
<script>
import CvBaseCrud    from 'src/crudvuel/customs/themes/quasar/components/resource/CvBaseCrud'
export default {
  extends : CvBaseCrud,
  methods : {
    validator: function () {
      return true
    }
  }
}
</script>
