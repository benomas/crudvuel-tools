import cvDinDep from './cvDinDep'
export default class CvClass {

  constructor(){
    this.cvDinDep=cvDinDep;
  }

	defError(message){
		if(typeof message!=="undefined" && message){
			console.log("Config error,"+message);
			return true;
		}
	};

	setProperty(property,opts,defaultValue){
		if(typeof property==="undefined" || typeof this[property] ==="undefined")
			return false;

		if(typeof opts!=="undefined" && typeof opts[property]!=="undefined")
			this[property] = opts[property];
		else{
			if(typeof defaultValue==="undefined")
				this[property] = defaultValue;
		}
	};

	getProperty(property){
		if(typeof property==="undefined" || typeof this[property] ==="undefined")
			return null;
		return this[property];
	};

	loadOptions(options){
		let opts =  options
		if(typeof options ==="function")
			opts = options();
		if(typeof options ==="object"){
    		let optionsKeys = Object.keys(options);
    		for(let i=0;i<optionsKeys.length;i++)
    			this.setProperty(optionsKeys[i],options)
		}
	}
};
