import CvClass from 'crudvuel-tools/src/CvClass'

export default class CvResourceMap extends CvClass {
  constructor (options) {
    super()
    this.name              = null,
    this.label             = null,
    this.buttonLabel       = null,
    this.icon              = null,
    this.getService        = null,
    this.setService        = null,
    this.resource          = null,
    this.path              = null,
    this.urlParams         = null,
    this.component         = null,
    this.props             = {},
    this.type              = null,
    this.getSuccessMessage = null,
    this.getErrorMessage   = null,
    this.setSuccessMessage = null,
    this.setErrorMessage   = null,
    this.setCancelMessage  = null,
    this.actionRoute       = null,
    this.disableFields     = null,
    this.nextLabel         = null,
    this.backLabel         = null,
    this.confirmLabel      = null,
    this.isParentRoute     = null,
    this.position          = null,
    this.context           = 'action',
    this.loadOptions(options)
  }

  validAction () {
    return this.name !== undefined
  }

  getGetSuccessMessage () {
    return this.getSuccessMessage || this.resource.getGetSuccessMessage()
  }

  getGetErrorMessage () {
    return this.getErrorMessage || this.resource.getGetErrorMessage()
  }

  getSetSuccessMessage () {
    return this.setSuccessMessage || this.resource.getSetSuccessMessage()
  }

  getSetErrorMessage () {
    return this.setErrorMessage || this.resource.getSetErrorMessage()
  }

  getSetCancelMessage () {
    return this.setCancelMessage || this.resource.getSetCancelMessage()
  }

  getContext () {
    return this.context || ''
  }

  setRoute () {
    if (this.path !== undefined && this.component !== undefined && this.component) {
      let props = { cvStaGenAction:this}

      if(typeof this.props === 'object')
        props = {...props,...this.props}

      this.actionRoute = {
        name      : `${this.resource.name}.${this.name}`,
        path      : this.path,
        component : this.component,
        props,
        meta      : {cvAction:this}
      }
    }
  }

  getRoute () {
    return this.actionRoute
  }

  getFixedParams (data) {
    if (data === undefined || ! data)
      return null

    let fixedParams = {}
    let fixed=false

    for (let i=0 ;i<this.urlParams.length; i++)
      if (data[this.urlParams[i]]!==undefined) {
        fixedParams[this.urlParams[i]] = data[this.urlParams[i]]
        fixed = true
      }

    return fixed ? fixedParams : null
  }

  getFixedPath (data = null) {
    if (!data)
      return this.path

    let fixedParams =  this.getFixedParams(data)

    if (!fixedParams)
      return this.path

    let urlParams = Object.keys(fixedParams)

    let fixedPath = this.path

    for (let i=0; i< urlParams.length; i++)
      fixedPath = fixedPath.replace(":"+urlParams[i],fixedParams[urlParams[i]])

    return fixedPath
  }

  setPosition (position) {
    if(typeof position)
      this.position = position
  }

  getName () {
    return this.name || ''
  }

  getResource () {
    return this.resource || null
  }

  getResourceName () {
    if(!this.getResource())
      return ''

    return this.getResource().getName()
  }

  getResourceActionName(){
    if(!this.getResource())
      return this.getName()

    return `${this.getResourceName()}.${this.getName()}`
  }
}
