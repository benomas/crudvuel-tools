import CvClass      from 'crudvuel-tools/src/CvClass'
import CvActionMap  from 'crudvuel-tools/src/resource/CvActionMap'

export default class CvResourceMap extends CvClass {
  constructor (options) {
    super(options)
    this.name              = null
    this.rowsLabel         = null
    this.rowLabel          = null
    this.icon              = null
    this.path              = null
    this.crudServices      = null
    this.actions           = null
    this.actionsKeys       = null
    this.routes            = null
    this.actionRoutes      = null
    this.getSuccessMessage = null
    this.getErrorMessage   = null
    this.setSuccessMessage = null
    this.setErrorMessage   = null
    this.setCancelMessage  = null
    this.children          = null
    this.nextLabel         = null
    this.backLabel         = null
    this.keyName           = null
    this.pluralName        = null
    this.singularName      = null
    this.keyName           = null
    this.parentRouteAction = null
    this.loadOptions(options)
  }

  addChild (childResource) {
      if(!this.children)
        this.children = []
      this.children.push(childResource)
      if (this.defError(!this.parentRouteAction ? "resource needs to have a parentRouteAction where the children route will be append" : null))
        return false
      this.routes[this.parentRouteAction.position].children = childResource.getRoutes()
  }

  addAction (actionOptions) {
      if (!this.actions) {
        this.actions     = {}
        this.actionsKeys = []
        this.routes      = []
      }

      if( actionOptions && actionOptions.nextLabel === undefined)
        actionOptions.nextLabel = this.nextLabel

      if( actionOptions && actionOptions.backLabel === undefined)
        actionOptions.backLabel = this.backLabel

      if( actionOptions && actionOptions.disableFields === undefined)
        actionOptions.disableFields = false

      if( actionOptions && actionOptions.type === undefined)
        actionOptions.type = "row"

      if( actionOptions && actionOptions.urlParams === undefined)
        actionOptions.urlParams = []

      if( actionOptions && actionOptions.parentRoute === undefined)
        actionOptions.parentRoute = false

      let newAction = new CvActionMap(actionOptions)
      if(typeof newAction.validAction() !== undefined ) {
        newAction.setRoute()
        if (newAction.getRoute()) {
          newAction.setPosition(this.routes.length)
          this.routes.push(newAction.getRoute())
        }
        this.actions[newAction.name] = newAction
        this.actionsKeys.push(newAction.name)
        if (newAction.isParentRoute)
          this.parentRouteAction = newAction
      }
  }

  setActions (actionsOptions) {
    for(let i=0 ; i < actionsOptions.length; i++)
      this.addAction(actionsOptions[i])
  }

  getRoutes (...excludes) {
    return excludes.length ?
      this.routes.filter(route => excludes.find(e => e !== route.name )) :
      this.routes
  }

  getGetSuccessMessage () {
    return this.getSuccessMessage
  }

  getGetErrorMessage () {
    return this.getErrorMessage
  }

  getSetSuccessMessage () {
    return this.setSuccessMessage
  }

  getSetErrorMessage () {
    return this.setErrorMessage
  }

  getSetCancelMessage () {
    return this.setCancelMessage
  }

  getAction (action=null) {
    return action && this.actions[action] != null ? this.actions[action] : action
  }

  loadService (actionService = null) {
    if (!actionService || this.crudServices == null || this.crudServices[actionService] == null)
      return null
    return (...params) => this.crudServices[actionService](...params)
  }
}
