<template>
  <cv-action-container v-if="cResource && cAction" v-bind="defActionProps()">
    <div slot="cv-content-slot" class="row w-100">
      <div class="col-xs-12 col-sm-6 col-md-5 q-pa-md">
        <q-field v-bind="defErrorInputProps('name')">
          <q-input v-bind="defInputProps('name')" v-model.trim="row.name"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-2 col-md-2 q-pa-md m-auto">
          <q-field v-bind="defErrorInputProps('active')">
          <cv-toggle v-bind="defInputProps('active')" v-model="row.active" :left-label="true" :true-value="1" :false-value="0" color="positive"/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-9 col-md-12 q-pa-md">
        <q-field v-bind="defErrorInputProps('description')">
          <q-input v-bind="defInputProps('description')" v-model="row.description" type="textarea" :max-height="100" :min-rows="7"/>
        </q-field>
      </div>
      <div class="col-xs-12 h-50px">
      </div>
      <div class="col-xs-12">
        <cv-buttons :cv-ready="cReady" :cv-action="cAction" @cv-back="cancelAction()" @cv-next="setService()" >
        </cv-buttons>
      </div>
    </div>
  </cv-action-container>
</template>
<script>
import CvBaseCrud     from 'src/customs/crudvuel/themes/quasar/components/resource/CvBaseCrud'
export default {
  extends : CvBaseCrud,
  methods : {
    validator: function () {
      return true
    }
  }
}
</script>
