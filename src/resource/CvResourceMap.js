import ToExtend from '../CvClass'
import CvActionMap from './CvActionMap'
import cvExtender from '../cvExtender'
export default cvExtender(
  ToExtend,
  {
    name              : null,
    rowsLabel         : null,
    rowLabel          : null,
    icon              : null,
    path              : null,
    crudServices      : null,
    actions           : null,
    actionsKeys       : null,
    routes            : null,
    actionRoutes      : null,
    getSuccessMessage : null,
    getErrorMessage   : null,
    setSuccessMessage : null,
    setErrorMessage   : null,
    setCancelMessage  : null,
    addAction    :function(actionOptions){
      if(!this.actions){
        this.actions={};
        this.actionsKeys=[];
        this.routes=[];
      }

      if( actionOptions && !actionOptions.type)
        actionOptions.type="row"

      if( actionOptions && !actionOptions.urlParams)
        actionOptions.urlParams=[]

      let newAction =  new CvActionMap(actionOptions);
      if(typeof newAction.validAction()){
        newAction.setRoute()
        if(newAction.getRoute())
          this.routes.push(newAction.getRoute());
        this.actions[newAction.name] = newAction;
        this.actionsKeys.push(newAction.name);
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