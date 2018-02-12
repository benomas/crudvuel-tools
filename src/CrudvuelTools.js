import CvActionMap from './resource/CvActionMap'
import CvResourceMap from './resource/CvResourceMap'
import CvTag from './components/CvTag.vue'
import CvOrderIcons from './components/grid-components/CvOrderIcons.vue'
import CvGrid from './components/grid-components/CvGrid.vue'
import CvThs from './components/grid-components/CvThs.vue'
import CvTds from './components/grid-components/CvTds.vue'
import CvSpinner from './components/grid-components/CvSpinner.vue'
import CvEnv from './CvEnv'
import CvPassport from './network/CvPassport'
import CvService from './network/CvService'

import CvBaseCrud from './components/resource/CvBaseCrud'
import CvCreate from './components/resource/CvCreate'
import CvDelete from './components/resource/CvDelete'
import CvEdit from './components/resource/CvEdit'
import CvIndex from './components/resource/CvIndex'
import CvShow from './components/resource/CvShow'

let test = new CvResourceMap({
  "name":"cat-company-types"
});
console.log(test.name);
var customs={};
const crudvuelTools = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.component("cv-tag",CvTag)
    Vue.component("cv-grid",CvGrid)
    Vue.component("cv-ord-icon",CvOrderIcons)
    Vue.component("cv-ths",CvThs)
    Vue.component("cv-tds",CvTds)
    Vue.component("cv-spinner",CvSpinner)
    Vue.mixin({
      data:function(){
        return {
          customs,
          CvEnv,
          cvEnv: new CvEnv(),
          CvPassport,
          cvPassport: new CvPassport(),
        }
      },
      methods: {
      },
    });
  }
};

export default crudvuelTools;