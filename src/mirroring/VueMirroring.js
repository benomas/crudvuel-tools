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
}
