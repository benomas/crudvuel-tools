export default function(){
	this.environmentProperty=(property,defaultValue)=>{
		return process.env[property] || defaultValue
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

	this.apiClient=()=>{
		return this.environmentProperty("API_CLIENT",2);
	};
	this.apiSecret=()=>{
		return this.environmentProperty("API_SECRET","devdevdevdevdevdevdevdevdevdevdevdevdevd");
	};
};