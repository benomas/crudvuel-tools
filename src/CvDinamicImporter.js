
export default class CvDinamicImporter {
  constructor(context = 'crudvuel') {
    this.modules = []
    this.contexts = {}
    this.contexts['crudvuel']         = {path:'crudvuel-tools/src/',parent:null}
    this.contexts['crudvuelTheme']    = {path:'crudvuel-tools/src/themes/quasar/',parent:this.contexts['crudvuel']}
    this.contexts['projectThemePath'] = {path:'src/customs/crudvuel/themes/quasar/',parent:this.contexts['crudvuelTheme']}
    this.setContextFlow(this.contexts[context])
  }

  async addModule (relatedPath) {
    let path = 'sets/CvComponentSet.js'
    let myModule = await import(
      /* webpackChunkName: "CvComponentSet" */
      `crudvuel-tools/src/components/${path}`
    );
    console.log(myModule.default)
    /*`messages_${getLocale()}.js`
    const path = '/src/components/sets/CvComponentSet'
    //const path = 'crudvuel-tools/src/components/sets/CvComponentSet'
    import('crudvuel-tools/src/components/sets/CvComponentSet')
    .then(myModule => {
      console.log(myModule.default);
    });
    console.log(temp)*/
    while(1 && 0){
      try {
        if (this.getContextFlow()) {
          let path = this.getContextFlow().path+relatedPath
          if (path === 'crudvuel-tools/src/components/sets/CvComponentSet'){
            console.log(typeof path)
            console.log(path)
            //let temp = require(path)
          }
          //const newModule = require(this.getContextFlow().path+relatedPath);
          //if(newModule){
          //  this.modules.push(newModule)
          //  return
          //}
          if(!this.getContextFlow().parent){
            this.modules.push({})
            return
          }
          else{
            this.setContextFlow(this.getContextFlow().parent)
          }
        }else{
          this.modules.push({})
          return
        }
        // do stuff
      } catch (ex) {
        if(!this.getContextFlow().parent){
          this.modules.push({})
          return
        }
        else{
          this.setContextFlow(this.getContextFlow().parent)
        }
      }
    }
  }

  setContextFlow (contextFlow = null) {
    this.contextFlow = contextFlow
    return this
  }

  getContextFlow () {
    return this.contextFlow
  }

  getModules (){
    return this.modules
  }
}
