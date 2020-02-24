import CvClass from 'crudvuel-tools/src/CvClass'

export default class CvResourceMap extends CvClass {
  constructor (options) {
    super()
    this.name              = null,
    this.label             = null,
    this.icon              = null,
    this.getService        = null,
    this.setService        = null,
    this.resource          = null,
    this.path              = null,
    this.urlParams         = null,
    this.component         = null,
    this.props             = null,
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
    this.isParentRoute     = null,
    this.position          = null,
    this.loadOptions(options)
  }

  validAction () {
    return this.name !== undefined
  }

  getGetSuccessMessage () {
    return this.getSuccessMessage || this.resource.getSuccessMessage()
  }

  getGetErrorMessage () {
    return this.getErrorMessage || this.resource.getErrorMessage()
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

  setRoute () {
    if (this.path !== undefined && this.component !== undefined && this.component) {
      this.actionRoute = {
        name      : `${this.resource.name}.${this.name}`,
        path      : this.path,
        component : this.component,
        props     : this.props?this.props:{ cvStaGenAction:this},
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
}
