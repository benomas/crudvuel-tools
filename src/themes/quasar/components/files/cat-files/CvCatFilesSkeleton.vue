<template>
  <div class="row w-100">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-pa-md">
      <q-input
        v-bind="mInputBinding('name')"
        v-on="mToogleOns('name')"/>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-pa-md">
      <q-input
        v-bind="mInputBinding('slug')"
        v-on="mToogleOns('slug')"/>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-pa-md">
      <q-input
        v-bind="mInputBinding('types')"
        v-on="mToogleOns('types')"/>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-md">
      <q-input
        v-bind="mInputBinding('max_size')"
        v-on="mToogleOns('max_size')"/>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-md">
      <q-input
        v-bind="mInputBinding('min_size')"
        v-on="mToogleOns('min_size')"/>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-md">
      <q-input
        v-bind="mInputBinding('group')"
        v-on="mToogleOns('group')"/>
    </div>
    <div class="col-xs-12 col-sm-4 col-lg-2 q-pa-md m-auto">
      <q-input
        v-bind="mInputBinding('required')"
        v-on="mToogleOns('required')"/>
    </div>
    <div class="col-xs-12 col-sm-4 col-lg-2 q-pa-md m-auto">
      <q-field borderless v-bind="mErrorBinding('multiple')">
        <q-toggle
          v-bind="mToogleBinding('multiple')"
          v-on="mToogleOns('multiple')"/>
      </q-field>
    </div>
    <div class="col-xs-12 col-sm-4 col-lg-2 q-pa-md m-auto">
      <q-field borderless v-bind="mErrorBinding('active')">
        <q-toggle
          v-bind="mToogleBinding('active')"
          v-on="mToogleOns('active')"/>
      </q-field>
    </div>
    <div class="col-xs-12 q-pa-md">
      <q-input
        v-bind="mInputBinding('resource')"
        v-on="mToogleOns('resource')"/>
    </div>
    <div class="col-xs-12 q-pa-md">
      <q-input
        v-bind="mInputBinding('description')"
        v-on="mToogleOns('description')"
        type="textarea"
        :max-height="100"
        :min-rows="7"
      />
    </div>
  </div>
</template>
<script>
import CvSkeleton               from 'src/customs/crudvuel/themes/quasar/components/resource/CvSkeleton'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
import {QColor}                 from 'quasar'
let vueMirroring = new VueMirroring('FilesSkeleton')
export default {
  mixins: [
    vueMirroring.fixProperties({
    }),
    vueMirroring.assimilate(
    ),
    CvSkeleton
  ],
  components: {
    QColor
  },
  methods: {
  }
}
</script>
