<template>
  <div class="q-pa-md cv-create">
    <cv-action-container
      v-if="cpStaGenAction"
      v-bind="mCustomBingins('cv-action-container')"
      v-on="mOns('cv-action-container')">
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
        <div class="row w-100">
          <cv-catalog-skeleton
            v-bind="mCustomBingins('cv-catalog-skeleton')"
            v-on="mOns('cv-catalog-skeleton')"
            :cv-segment="''"
            >
          </cv-catalog-skeleton>
          <div class="col-xs-12 h-50px">
          <!-- Code -->
          </div>
          <div class="col-xs-12">
            <cv-action-buttons
              v-bind="mCustomBingins('cv-action-buttons')"
              v-on="mOns('cv-action-buttons')"
              >
            </cv-action-buttons>
          </div>
        </div>
      </div>
    </cv-action-container>
  </div>
</template>
<script>
import CvCreate                 from 'src/customs/crudvuel/themes/quasar/components/resource/CvCreate'
import CvCatalogsSkeleton       from 'crudvuel-tools/src/themes/quasar/components/catalogs/catalog1/CvCatalogsSkeleton'
import CvSkeletonController     from 'src/customs/crudvuel/themes/quasar/components/resource/CvSkeletonController'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Create').enableRoot()
export default {
  mixins: [
    CvCreate,
    vueMirroring.restoreBindings(CvCreate).assimilate(
      {CvCatalogsSkeleton}
    ),
    CvSkeletonController
  ],
  components: {
    CvCatalogsSkeleton
  },
  directives: {
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
