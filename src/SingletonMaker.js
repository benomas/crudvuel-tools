export default class FactoryMaker {
  constructor (container = null) {
    this.container = container

    if (!this.hasContainer())
      return this.build()

    if (!this.hasVuex())
      return this.buildWithVuex()

    return this.buildVar()
  }

  hasContainer () {
    return this.container != null
  }

  hasVuex () {
    return this.container.state != null && this.container._mutators != null
  }

  build () {
    return null
  }

  buildWithVar () {
    return null
  }

  buildWithVuex () {
    return null
  }
}
