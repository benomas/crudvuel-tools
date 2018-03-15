import ToExtend   from '../CvClass'
import cvExtender from '../cvExtender'
export default cvExtender(
  ToExtend,
  {
    name             : null,
    label            : null,
    icon             : null,
    getService       : null,
    setService       : null,
    resource         : null,
    path             : null,
    urlParams        : null,
    component        : null,
    props            : null,
    type             : null,
    getSuccessMessage: null,
    getErrorMessage  : null,
    setSuccessMessage: null,
    setErrorMessage  : null,
    setCancelMessage : null,
    actionRoute      : null,
    disableFields    : null,
    nextLabel        : null,
    backLabel        : null,
    isParentRoute    : null,
    position         : null,
    validAction:function(){
      return typeof this.name!=="undefined";
    },
    getGetSuccessMessage:function(){
      return this.getSuccessMessage || this.resource.getSuccessMessage();
    },
    getGetErrorMessage:function(){
      return this.getErrorMessage || this.resource.getErrorMessage();
    },
    getSetSuccessMessage:function(){
      return this.setSuccessMessage || this.resource.getSetSuccessMessage();
    },
    getSetErrorMessage:function(){
      return this.setErrorMessage || this.resource.getSetErrorMessage();
    },
    getSetCancelMessage:function(){
      return this.setCancelMessage || this.resource.getSetCancelMessage();
    },
    setRoute:function(){
      if(typeof this.path!=="undefined" && typeof this.component!=="undefined" && this.component){
        this.actionRoute={
          path      : this.path,
          component : this.component,
          props     : this.props?this.props:{ cvAction:this}
        }
      }
    },
    getRoute:function(){
      return this.actionRoute
    },
    getFixedParams:function(data){
      if(typeof data==="undefined" || ! data)
        return null

      let fixedParams = {}
      let fixed=false;
      for(let i=0 ; i<this.urlParams.length ; i++)
        if(typeof data[this.urlParams[i]]!=="undefined"){
          fixedParams[this.urlParams[i]] = data[this.urlParams[i]]
          fixed = true
        }
      return fixed?fixedParams:null
    },
    getFixedPath:function(data){
      if(typeof data ==="undefined" || !data)
        return this.path

      let fixedParams =  this.getFixedParams(data)

      if(!fixedParams)
        return this.path

      let urlParams = Object.keys(fixedParams)

      let fixedPath = this.path
      for(let i=0 ; i< urlParams.length ; i++)
        fixedPath =  fixedPath.replace(":"+urlParams[i],fixedParams[urlParams[i]])
      return fixedPath
    },
    setPosition:function(position){
      if(typeof position)
        this.position = position
    }
  }
)
