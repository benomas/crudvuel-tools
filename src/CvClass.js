export default function(options){
	this.setProperty=function(property,opts,defaultValue){
		if(typeof property==="undefined" || typeof this[property] ==="undefined")
			return false;

		if(typeof opts!=="undefined" && typeof opts[property]!=="undefined")
			this[property] = opts[property];
		else{
			if(typeof defaultValue==="undefined")
				this[property] = defaultValue;
		}
	};

	this.getProperty=function(property){
		if(typeof property==="undefined" || typeof this[property] ==="undefined")
			return null;
		return this[property];
	};

	this.loadOptions=function(){
		let opts =  options
		if(typeof options ==="function")
			opts = options();
		if(typeof options ==="object"){
    		let optionsKeys = Object.keys(options);
    		for(let i=0;i<optionsKeys.length;i++)
    			this.setProperty(optionsKeys[i],options)
		}
	}

	this.loadOptions();
};