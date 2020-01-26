import VueAutoDefiner         from './VueAutoDefiner'
import VueComponentConnector  from './VueComponentConnector'

export default class VueMirroring {
  constructor (parentPrefix = null) {
    this.vueAutoDefiner        = new VueAutoDefiner(this)
    this.vueComponentConnector = new VueComponentConnector(this,parentPrefix)
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

  root () {
    this.vueComponentConnector.enableRootMode()
    return this
  }

  inspector (context){
    console.log({
      component : this.vueComponentConnector.getParentPrefix(),
      computed : context._computedWatchers,
      data     : context._data,
      pros     : context._props,
      context,
      binding  : this.binding()
    })
  }
}
