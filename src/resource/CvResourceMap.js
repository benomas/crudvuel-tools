import CvClass from '../CvClass'
import CvActionMap from './CvActionMap'

CvClass.prototype.name         = null;
CvClass.prototype.label        = null;
CvClass.prototype.icon         = null;
CvClass.prototype.path         = null;
CvClass.prototype.crudServices = null;
CvClass.prototype.actions      = {};
CvClass.prototype.actionsKeys  = [];
CvClass.prototype.routes       = [];
CvClass.prototype.addAction    = function(actionOptions){
	var newAction =  new CvActionMap(actionOptions);
	if(typeof newAction.validAction()){
		this.actions[actionOptions.name] = newAction;
    this.actionsKeys.push(actionOptions.name);
    if(typeof newAction.path!=="undefined" && typeof newAction.component!=="undefined" )
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

export default CvClass;