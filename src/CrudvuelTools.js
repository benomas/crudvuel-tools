import cvInProgress    from './directives/cvInProgress'
import CvActionMap     from './resource/CvActionMap'
import CvTag           from './components/CvTag.vue'
import CvSpinner       from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSpinner'
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
    Vue.component("cv-spinner",CvSpinner)
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
