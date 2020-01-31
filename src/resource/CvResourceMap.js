import CvClass    from '../CvClass'
import CvActionMap from './CvActionMap'

export default class CvResourceMap extends CvClass {

  constructor(options){
    super(options)
    this.name             = null
    this.rowsLabel        = null
    this.rowLabel         = null
    this.icon             = null
    this.path             = null
    this.crudServices     = null
    this.actions          = null
    this.actionsKeys      = null
    this.routes           = null
    this.actionRoutes     = null
    this.getSuccessMessage= null
    this.getErrorMessage  = null
    this.setSuccessMessage= null
    this.setErrorMessage  = null
    this.setCancelMessage = null
    this.children         = null
    this.nextLabel        = null
    this.backLabel        = null
    this.keyName          = null
    this.parentRouteAction= null
    this.loadOptions(options);
  }

  addChild(childResource){
      if(!this.children)
        this.children=[];
      this.children.push(childResource);
      if(this.defError(!this.parentRouteAction?"resource needs to have a parentRouteAction where the children route will be append":null))
        return false;
      this.routes[this.parentRouteAction.position].children = childResource.getRoutes()
  }

  addAction(actionOptions){
      if(!this.actions){
        this.actions={};
        this.actionsKeys=[];
        this.routes=[];
      }

      if( actionOptions && typeof actionOptions.nextLabel==="undefined")
        actionOptions.nextLabel=this.nextLabel

      if( actionOptions && typeof actionOptions.backLabel==="undefined")
        actionOptions.backLabel=this.backLabel

      if( actionOptions && typeof actionOptions.disableFields==="undefined")
        actionOptions.disableFields=false

      if( actionOptions && typeof actionOptions.type==="undefined")
        actionOptions.type="row"

      if( actionOptions && typeof actionOptions.urlParams==="undefined")
        actionOptions.urlParams=[]

      if( actionOptions && typeof actionOptions.parentRoute==="undefined")
        actionOptions.parentRoute=false

      let newAction =  new CvActionMap(actionOptions);
      if(typeof newAction.validAction()){
        newAction.setRoute()
        if(newAction.getRoute()){
          newAction.setPosition(this.routes.length);
          this.routes.push(newAction.getRoute());
        }
        this.actions[newAction.name] = newAction;
        this.actionsKeys.push(newAction.name);
        if(newAction.isParentRoute)
          this.parentRouteAction = newAction;
      }
  }

  setActions(actionsOptions){
    for(let i=0 ; i < actionsOptions.length; i++)
      this.addAction(actionsOptions[i]);
  }

  getRoutes (...excludes) {
    return excludes.length ?
      this.routes.filter(route => excludes.find(e => e !== route.name )) :
      this.routes
  }

  getGetSuccessMessage(){
    return this.getSuccessMessage;
  }

  getGetErrorMessage(){
    return this.getErrorMessage;
  }

  getSetSuccessMessage(){
    return this.setSuccessMessage;
  }

  getSetErrorMessage(){
    return this.setErrorMessage;
  }

  getSetCancelMessage(){
    return this.setCancelMessage;
  }

  getAction (action=null) {
    return action && this.actions[action] != null ? this.actions[action] : action
  }
}
