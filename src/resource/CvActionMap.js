import CvClass from '../CvClass'
CvClass.prototype.name              = null;
CvClass.prototype.label             = null;
CvClass.prototype.icon              = null;
CvClass.prototype.getService        = null;
CvClass.prototype.setService        = null;
CvClass.prototype.resource          = null;
CvClass.prototype.path              = null;
CvClass.prototype.component         = null;
CvClass.prototype.props             = null;
CvClass.prototype.type              = null;
CvClass.prototype.getSuccessMessage = null;
CvClass.prototype.getErrorMessage   = null;
CvClass.prototype.setSuccessMessage = null;
CvClass.prototype.setErrorMessage   = null;
CvClass.prototype.validAction = function(){
	return typeof this.name!=="undefined";
}

CvClass.prototype.getGetSuccessMessage = function(){
  return this.getSuccessMessage || this.resource.getSuccessMessage();
}

CvClass.prototype.getGetErrorMessage = function(){
  return this.getErrorMessage || this.resource.getErrorMessage();
}

CvClass.prototype.getSetSuccessMessage = function(){
  return this.setSuccessMessage || this.resource.getSetSuccessMessage();
}

CvClass.prototype.getSetErrorMessage = function(){
  return this.setErrorMessage || this.resource.getSetErrorMessage();
}

export default CvClass;