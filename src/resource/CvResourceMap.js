import CvClass from '../CvClass'
import CvActionMap from './CvActionMap'

CvClass.prototype.name              = null;
CvClass.prototype.rowsLabel         = null;
CvClass.prototype.rowLabel          = null;
CvClass.prototype.icon              = null;
CvClass.prototype.path              = null;
CvClass.prototype.crudServices      = null;
CvClass.prototype.actions           = null;
CvClass.prototype.actionsKeys       = null;
CvClass.prototype.routes            = null;
CvClass.prototype.getSuccessMessage = null;
CvClass.prototype.getErrorMessage   = null;
CvClass.prototype.setSuccessMessage = null;
CvClass.prototype.setErrorMessage   = null;
CvClass.prototype.addAction    = function(actionOptions){
  if(!this.actions){
    this.actions={};
    this.actionsKeys=[];
    this.routes=[];
  }

  if( actionOptions && !actionOptions.type)
    actionOptions.type="row"

	let newAction =  new CvActionMap(actionOptions);
	if(typeof newAction.validAction()){
		this.actions[actionOptions.name] = newAction;
    this.actionsKeys.push(actionOptions.name);
    if(typeof newAction.path!=="undefined" && typeof newAction.component!=="undefined" && newAction.component)
      this.routes.push({
        path: newAction.path,
        component: newAction.component,
        props: newAction.props?newAction.props:{ cvResource:this, cvAction:newAction}
      });
  }
};
CvClass.prototype.setActions = function(actionsOptions){
	for(let i=0 ; i < actionsOptions.length; i++)
		this.addAction(actionsOptions[i]);
};

CvClass.prototype.getRoutes = function(){
  return this.routes;
}

CvClass.prototype.getGetSuccessMessage = function(){
  return this.getSuccessMessage;
}

CvClass.prototype.getGetErrorMessage = function(){
  return this.getErrorMessage;
}

CvClass.prototype.getSetSuccessMessage = function(){
  return this.setSuccessMessage;
}

CvClass.prototype.getSetErrorMessage = function(){
  return this.setErrorMessage;
}

export default CvClass;