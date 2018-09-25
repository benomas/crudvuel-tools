export default class FactoryMaker {
  constructor (container = null) {
    this.container = container
  }

  hasContainer (){
    return this.container != null
  }

  hasVuex (){
    return this.container.state != null && this.container._mutators != null
  }

  build () {
    if(!this.hasVuex())
      return this.buildWithVuex()
    return this.buildVar()
  }

  buildWithVar () {
    return null
  }

  buildWithVuex () {
    return null
  }
}
