import ToExtend    from '../CvClass'
import CvActionMap from './CvActionMap'
import cvExtender  from '../cvExtender'
export default cvExtender(
  ToExtend,
  {
    name             : null,
    rowsLabel        : null,
    rowLabel         : null,
    icon             : null,
    path             : null,
    crudServices     : null,
    actions          : null,
    actionsKeys      : null,
    routes           : null,
    actionRoutes     : null,
    getSuccessMessage: null,
    getErrorMessage  : null,
    setSuccessMessage: null,
    setErrorMessage  : null,
    setCancelMessage : null,
    children         : null,
    nextLabel        : null,
    backLabel        : null,
    parentRouteAction: null,
    addChild : function(childResource){
      if(!this.children)
        this.children=[];
      this.children.push(childResource);
      if(this.defError(!this.parentRouteAction?"resource needs to have a parentRouteAction where the children route will be append":null))
        return false;
      this.routes[this.parentRouteAction.position].children = childResource.getRoutes()
    },
    addAction    :function(actionOptions){
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
    },
    setActions :function(actionsOptions){
      for(let i=0 ; i < actionsOptions.length; i++)
        this.addAction(actionsOptions[i]);
    },
    getRoutes :function(){
      return this.routes;
    },
    getGetSuccessMessage :function(){
      return this.getSuccessMessage;
    },
    getGetErrorMessage :function(){
      return this.getErrorMessage;
    },
    getSetSuccessMessage :function(){
      return this.setSuccessMessage;
    },
    getSetErrorMessage :function(){
      return this.setErrorMessage;
    },
    getSetCancelMessage :function(){
      return this.setCancelMessage;
    },
  }
)
