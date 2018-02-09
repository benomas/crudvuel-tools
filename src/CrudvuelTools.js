import CvTag from './components/CvTag.vue'
import CvOrderIcons from './components/grid-components/CvOrderIcons.vue'
import CvGrid from './components/grid-components/CvGrid.vue'
import CvPaginate from './components/grid-components/CvPaginate.vue'
import CvSimpleFilters from './components/grid-components/CvSimpleFilters.vue'
import CvAdvancedFilters from './components/grid-components/CvAdvancedFilters.vue'
import CvExpertFilters from './components/grid-components/CvExpertFilters.vue'
import CvThs from './components/grid-components/CvThs.vue'
import CvTds from './components/grid-components/CvTds.vue'
import CvSpinner from './components/grid-components/CvSpinner.vue'
import cvEnv from './components/CvEnvironment'
import cvPassport from './components/CvPassport'

const crudvuelTools = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.component("cv-tag",CvTag)
    Vue.component("cv-grid",CvGrid)
    Vue.component("cv-paginate",CvPaginate)
    Vue.component("cv-simple-filters",CvSimpleFilters)
    Vue.component("cv-advanced-filters",CvAdvancedFilters)
    Vue.component("cv-expert-filters",CvExpertFilters)
    Vue.component("cv-ord-icon",CvOrderIcons)
    Vue.component("cv-ths",CvThs)
    Vue.component("cv-tds",CvTds)
    Vue.component("cv-spinner",CvSpinner)
    Vue.mixin({
      data:function(){
        return {
          cvEnv,
          cvEnvInstance: new cvEnv(),
          cvPassport,
          cvcvPassportInstance: new cvPassport(),
        }
      },
      methods: {
      },
    });
  }
};

export default crudvuelTools;