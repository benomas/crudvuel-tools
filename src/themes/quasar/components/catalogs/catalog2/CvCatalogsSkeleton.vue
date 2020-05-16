<template>
  <div class="row w-100">
    <div class="col-xs-12 col-sm-5 col-md-7 q-pa-sm">
      <q-input
        v-bind="mInputBinding('name')"
        v-on="mInputOnsBinding('name')"/>
    </div>

    <div class="col-xs-7 col-sm-4 col-md-3 q-pa-sm">
      <q-input
        v-bind="mInputBinding('slug')"
        v-on="mInputOnsBinding('slug')"/>
    </div>

    <div class="row col-xs-5 col-sm-3 col-md-2 my-auto q-px-md">
      <div class="row w-100" v-bind="mToogleTittleBinding('active')">
        <span class="col-xs-8 m-auto q-pl-sm" >{{mfLang('active')}}</span>

        <q-toggle class="col-xs-4 m-unset q-pl-sm" v-bind="mToogleBinding('active')" v-on="mToogleOns('active')" :label="''"/>
      </div>

      <div v-cv-error="{field:'active'}"></div>
    </div>

    <div class="col-xs-12 col-sm-9 col-md-12 q-pa-md">
      <q-input
        v-bind="mInputBinding('description')"
        v-on="mInputOnsBinding('description')"
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
let vueMirroring = new VueMirroring('OwnersSkeleton')
export default {
  mixins: [
    vueMirroring.fixProperties({}),
    CvSkeleton
  ]
}
</script>
