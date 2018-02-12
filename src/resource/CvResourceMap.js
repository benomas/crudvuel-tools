import CvClass from '../CvClass'
import CvActionMap from './CvActionMap'

CvClass.prototype.name         = null;
CvClass.prototype.label        = null;
CvClass.prototype.icon         = null;
CvClass.prototype.path         = null;
CvClass.prototype.crudServices = null;
CvClass.prototype.actions      = {};
CvClass.prototype.addAction    = function(actionOptions){
	var newAction =  new CvActionMap(actionOptions);
	if(typeof newAction.validAction())
		this.actions[actionOptions.name] = newAction;
};
CvClass.prototype.crudActions = function(crudActionsOptions){
	let action="index"
	this.addAction({
		name        : action;
		label       : crudActionsOptions[action].label || this.name+ " " +"index";
		icon        : crudActionsOptions[action].icon || null;
		getService  : crudActionsOptions[action].getService || null;
		setService  : crudActionsOptions[action].setService || null;
		resource    : crudActionsOptions[action].resource || null;
		path        : crudActionsOptions[action].path || null;
	})
};

export default CvClass;