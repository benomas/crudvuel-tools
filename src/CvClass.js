import cvDinDep from './cvDinDep'
export default class CvClass {

  constructor(){
    this.cvDinDep=cvDinDep;
  }

	defError(message){
		if (message !== undefined && message) {
			console.log(`Config error, ${message}`)
			return true
		}
	};

	setProperty (property,opts,defaultValue) {
		if( property === undefined || this[property]  === undefined)
			return this

		if (opts !== undefined && opts[property ]!== undefined) {
			this[property] = opts[property]
      return this
    }
    if (defaultValue === undefined)
      this[property] = defaultValue
    return this
	};

	getProperty(property){
		if(property === undefined || this[property] === undefined)
			return null;
		return this[property];
	};

	loadOptions(options){
    //console.log(options)
		let opts =  options
		if(typeof options === 'function')
			opts = options()
		if(typeof options === 'object' ) {
      let optionsKeys = Object.keys(options)
      for(let i=0;i<optionsKeys.length;i++)
        this.setProperty(optionsKeys[i],options)
    }
    return this
	}
};
