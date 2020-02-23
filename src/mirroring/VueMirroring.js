import VueAutoDefiner         from 'crudvuel-tools/src/mirroring/VueAutoDefiner'
import VueComponentConnector  from 'crudvuel-tools/src/mirroring/VueComponentConnector'
import VueDebugger            from 'crudvuel-tools/src/mirroring/VueDebugger'

export default class VueMirroring {
  constructor (parentPrefix = null) {
    this.root                  = false
    this.vueDebugger           = new VueDebugger(this)
    this.vueAutoDefiner        = new VueAutoDefiner(this)
    this.vueComponentConnector = new VueComponentConnector(this,parentPrefix)
  }

  enableRoot(){
    this.root = true
    return this
  }

  fixProperties (properties = null) {
    return this.vueAutoDefiner.fixProperties(properties)
  }

  assimilate (...components) {
    return this.vueComponentConnector.loadComponents(...components).mixinsMirroring().bindsMirroring().binding()
  }

  binding () {
    return this.vueComponentConnector.binding()
  }

  inspector (...params) {
    return this.vueDebugger.inspector(...params)
  }

  getMixingTree (...params) {
    return this.vueDebugger.getMixingTree(...params)
  }

  restoreBindins (...components) {
    let lastBindins = {}
    let lastOns      = {}
    for (let currentComponent of components){
      if (currentComponent.mixins == null || currentComponent.mixins.length === 0)
        continue
      let binded = currentComponent.mixins[currentComponent.mixins.length-1]
      if (binded.methods.mBinding != null)
        lastBindins = {...lastBindins,...binded.methods.mBinding()}
      if (binded.methods.mOns != null)
        lastOns = {...lastOns,...binded.methods.mOns()}
    }
    this.vueComponentConnector.preloadBindigs(lastBindins).preloadOns(lastOns)
    return this
  }
}
