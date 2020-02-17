export default class VueDebugger {
  constructor (vueMirroring = null) {
    this.vueMirroring = vueMirroring
    this.tree         = []
  }

  inspector (context){
    console.log({
      component : this.vueMirroring.vueComponentConnector.getParentPrefix(),
      computed  : context._computedWatchers,
      data      : context._data,
      pros      : context._props,
      context,
      binding : this.vueMirroring.binding()
    })
  }

  makeMixingTree (component) {
    if (component && component.__file != null)
      this.tree.push(component.__file)
    if(component.mixins)
      for (let currentComponent of component.mixins)
        this.makeMixingTree(currentComponent)
    if(component.extends)
      this.makeMixingTree(component.extends)
    return this
  }

  getMixingTree (component) {
    console.log(this.makeMixingTree(component).tree)
    return tree
  }
}
