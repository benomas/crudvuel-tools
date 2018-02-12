export default function(){
	this.environmentProperty=(property,defaultValue)=>{
		if(typeof process==="undefined" || typeof process.env==="undefined" || typeof process.env.NODE_ENV==="undefined")
			return defaultValue;
		
		if(process.env.NODE_ENV==="development" && typeof process.env[property]!=="undefined")
			return process.env[property];
		else
			return defaultValue;

		if(process.env.NODE_ENV==="production" && typeof process.env[property]!=="undefined")
			return process.env[property];
		else
			return defaultValue;
	};

	this.url=()=>{
		return this.environmentProperty("URL","/");
	};
	this.apiUrl=()=>{
		return this.environmentProperty("API_URL","/");
	};

	this.isPassportEnabled=()=>{
		return this.environmentProperty("PASSPORT",false);
	};
};