import CvClass from '../CvClass'
CvClass.prototype.name        = null;
CvClass.prototype.label       = null;
CvClass.prototype.icon        = null;
CvClass.prototype.getService  = null;
CvClass.prototype.setService  = null;
CvClass.prototype.resource    = null;
CvClass.prototype.path        = null;
CvClass.prototype.validAction = function(){
	return typeof this.name!=="undefined";
}
export default CvClass;