<template>
  <div class="cv-create">
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
        <div class="row w-100">
          <cv-catalog-skeleton
            v-bind="mCustomBindins('cv-catalog-skeleton')"
            v-on="mCustomOns('cv-catalog-skeleton')"
            :cv-sta-ins-resource="cResource.pluralName"
            :cv-segment="''"
            >
          </cv-catalog-skeleton>
        </div>
      </div>

      <div slot="cv-buttons-slot">
        <div class="col-xs-12 ">
          <cv-action-buttons
              v-bind="mCustomBindins('cv-action-buttons')"
              v-on="mCustomOns('cv-action-buttons')"
              >
          </cv-action-buttons>
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
    vueMirroring.restoreBindins(CvCreate).assimilate(
      {CvCatalogsSkeleton}
    ),
    CvSkeletonController
  ],

  components: {
    CvCatalogsSkeleton
  }
}
</script>
