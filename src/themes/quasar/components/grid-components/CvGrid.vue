<template>
  <cv-tag
    :tag="cpDinInsGridTag"
    class="cv-grid-container f-weight-400"
    :style="{'min-height':cpStaInsMinHeight, 'opacity':!cdReady? '0.5':'1'}">
    <transition name="component-fade" mode="out-in">
      <cv-spinner v-if="!cdReady" :cv-target="cSelfRef">
      </cv-spinner>
    </transition>
    <div class="row justify-end">
      <div class="col-xs-12 col-sm-5 col-md-3">
        <div class="row">
          <cv-filter-selector
            v-bind="mCustomBindins('cv-filter-selector')"
            v-on="mCustomOns('cv-filter-selector')">
          </cv-filter-selector>
        </div>
        <div class="row">
          <!--<transition name="component-fade" mode="out-in">-->
            <cv-simple-filter
              v-if="cShowSimpleFilter"
              class="w-100"
              v-bind="mCustomBindins('cv-simple-filter')"
              v-on="mCustomOns('cv-simple-filter')"
            >
            </cv-simple-filter>
          <!--</transition>-->
          <!--<transition name="component-fade" mode="out-in">-->
            <cv-combinatory-filter
              class="w-100"
              v-if="cShowCombinatoryFilters"
              v-bind="mCustomBindins('cv-combinatory-filter')"
              v-on="mCustomOns('cv-combinatory-filter')"
            >
            </cv-combinatory-filter>
          <!--</transition>-->
          <!--<transition name="component-fade" mode="out-in">
            TODO: develop and implement component
            <cv-advanced-filters></cv-advanced-filters>
          -->
          <!--</transition>-->
          <!--<transition name="component-fade" mode="out-in">
            TODO:develop and implement component
            <cv-expert-filters></cv-expert-filters>
          -->
          <!--</transition>-->
        </div>
      </div>
    </div>
    <transition name="component-fade" mode="out-in">
      <hr v-if="cpDinComfCvPaginateTotalPageElements && cpDinInsShowTopPagination">
    </transition>
    <transition name="component-fade" mode="out-in">
      <cv-paginate
        v-if="cpDinInsShowTopPagination"
        v-bind="mCustomBindins('cv-paginate-top')" v-on="mCustomOns('cv-paginate-top')">
      </cv-paginate>
    </transition>
    <transition name="component-fade" mode="out-in">
      <span
        v-if ='cdReady && !cpDinComfCvPaginateTotalPageElements'
      >
        {{mComLang('no-rows','Sin resultados para mostrar')}}
      </span>
    </transition>
    <div class="cv-grid-data-container">
      <slot name="cv-grid-data">
      </slot>
    </div>
    <transition name="component-fade" mode="out-in">
      <cv-paginate
        v-if="cpDinInsShowBottomPagination"
        v-bind="mCustomBindins('cv-paginate-bottom')" v-on="mCustomOns('cv-paginate-bottom')">
      </cv-paginate>
    </transition>
    <transition name="component-fade" mode="out-in">
      <hr v-if="cpDinComfCvPaginateTotalPageElements && cpDinInsShowBottomPagination">
    </transition>
  </cv-tag>
</template>
<script>
import CvGrid                 from 'crudvuel-tools/src/components/grid-components/CvGrid'
import CvTag                  from 'crudvuel-tools/src/components/CvTag'
import CvPaginate             from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvPaginate'
import CvAdvancedFilters      from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvAdvancedFilters'
import CvExpertFilters        from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvExpertFilters'
import CvSimpleFilter         from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import CvCombinatoryFilter    from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvCombinatoryFilter'
import CvFilterSelector       from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvFilterSelector'
import CvSpinner              from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSpinner'
import CvComponentSet         from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import VueMirroring           from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Grid')
export default {
  mixins: [
    CvGrid,
    CvComponentSet,
    vueMirroring.restoreBindins(CvGrid).fixProperties({}),
    vueMirroring.assimilate(
      //{CvTag},
      //{CvAdvancedFilters},
      //{CvExpertFilters},
      {CvPaginate, posFix: 'top'},
      {CvPaginate, posFix: 'bottom'},
      {CvSimpleFilter},
      {CvCombinatoryFilter},
      {CvFilterSelector}
      //{CvSpinner}
    )
  ],
  components: {
    CvTag,
    CvPaginate,
    CvAdvancedFilters,
    CvExpertFilters,
    CvSimpleFilter,
    CvCombinatoryFilter,
    CvFilterSelector,
    CvSpinner
  }
}
</script>
