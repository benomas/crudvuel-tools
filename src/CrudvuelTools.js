import CvActionMap from './resource/CvActionMap'
import CvResourceMap from './resource/CvResourceMap'
import CvTag from './components/CvTag.vue'
import CvOrderIcons from './components/grid-components/CvOrderIcons.vue'
import CvGrid from './components/grid-components/CvGrid.vue'
import CvThs from './components/grid-components/CvThs.vue'
import CvSpinner from './components/grid-components/CvSpinner.vue'
import cvDinDep from './cvDinDep'

const crudvuelTools = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.component("cv-tag",CvTag)
    Vue.component("cv-grid",CvGrid)
    Vue.component("cv-ord-icon",CvOrderIcons)
    Vue.component("cv-ths",CvThs)
    Vue.component("cv-spinner",CvSpinner)
    Vue.mixin({
      data:function(){
        return {
          cvDinDep
        }
      },
      methods: {
      },
    });
  }
};

export default crudvuelTools;