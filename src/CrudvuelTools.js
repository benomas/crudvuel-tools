import cvInProgress    from './directives/cvInProgress'
import CvActionMap     from './resource/CvActionMap'
import CvResourceMap   from './resource/CvResourceMap'
import CvTag           from './components/CvTag.vue'
import CvOrderIcons    from './components/grid-components/CvOrderIcons.vue'
import CvSimpleFilters from './components/grid-components/CvSimpleFilters.vue'
import CvGrid          from './components/grid-components/CvGrid.vue'
import CvThs           from './components/grid-components/CvThs.vue'
import CvSpinner       from './components/grid-components/CvSpinner.vue'
import CvErrorWraper   from './components/input-components/CvErrorWraper.vue'
import CvRelationator  from './components/input-components/CvRelationator.vue'
import CvMatcherizer   from './components/matcherizer-components/CvMatcherizer.vue'
import cvDinDep        from './cvDinDep'
import CvParametrizer  from './CvParametrizer'
import cvExtender      from './cvExtender'
import cvVueSetter     from './cvVueSetter'
import cvErr           from './cvErr'

const crudvuelTools = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.directive('cv-in-progress', cvInProgress)
    Vue.component("cv-tag",CvTag)
    Vue.component("cv-grid",CvGrid)
    Vue.component("cv-ord-icon",CvOrderIcons)
    Vue.component("cv-ths",CvThs)
    Vue.component("cv-simple-filters",CvSimpleFilters)
    Vue.component("cv-spinner",CvSpinner)
    Vue.component("cv-error-wraper",CvErrorWraper)
    Vue.component("cv-relationator",CvRelationator)
    Vue.component("cv-matcherizer",CvMatcherizer)
    Vue.mixin({
      data:function(){
        return {
          cvDinDep,
          CvParametrizer,
          cvExtender,
          cvVueSetter,
          cvErr,
        }
      },
      methods: {
      },
    });
  }
};

export default crudvuelTools;
