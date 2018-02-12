import cvDinDep from '../CvDinDep'
import CvEnv from '../CvEnvironment'
import CvPassport from './CvPassport'
import CvCrudService from './CvCrudService'

export default function(router,Customs){
  
  this.cvEnv = cvDinDep(()=>{
    return  new CvEnv();
  });
  
  var axios = require('axios');
  this.defaultConfig = {
    baseURL            : this.cvEnv.url(),
    headers            : {
      'X-Requested-With'           : 'XMLHttpRequest',
      'Content-Type'               : 'application/json'
    },
    timeout            : 15000,
    responseType       : 'json',
    maxContentLength   : 20000,
    callBackRedirector:null
  };
  this.router = router;
  this.axios = axios.create(this.defaultConfig);
  this.cvPassport = cvDinDep(()=>{
    return  new CvPassport();
  });

  this.axios.interceptors.request.use((config)=>{
    if(this.cvPassport.autenticated())
     config.headers = this.cvPassport.injectHeaders(config.headers);
    return config;
  },(error)=> {
    return Promise.reject(error);
  });

  this.axios.interceptors.response.use((response)=>{
      this.cvPassport.reactToResponse(response);
      return response;
  },(error)=>{
    this.cvPassport.reactToResponse(error);
    switch(error.response.status){
      case 401:
        this.router.VueRouter.push('login');
        break;
      case 409:
        location.reload(); 
        break;
      default:return Promise.reject(error);
    }
    return Promise.reject(error);
  });

  this.pushStaticCrudServices=(resource)=>{
    if(typeof resource==="undefined")
      return false;
    this[resource] = cvDinDep(()=>{
      return  new CvCrudService(this,resource);
    });
  };

  this.pushDinamicCrudServices=(resource)=>{
    if(typeof resource==="undefined")
      return false;
    this[resource.resource] = resource;
  };
};