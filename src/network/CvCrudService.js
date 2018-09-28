export default function(cvComunicator,resourceName){
  this.cvComunicator  = cvComunicator;
  this.resourceName   = resourceName;
  this.resourcePrefix = "/";
  this.row            = {};
  this.rows           = [];
  this.errors         = {};
  this.status         = 0;
  this.statusText     = "";

  this.getRelBaseUrl =  function (){
    return "api" + this.resourcePrefix + this.resourceName
  }

  this.getAbsBaseUrl = function () {
    return this.cvComunicator.defaultConfig.baseURL + '/' + this.getRelBaseUrl()
  }

  this.setResourcePrefix= function(resourcePrefix){
    this.resourcePrefix = resourcePrefix || "/";
  }

  this.mapRowsResponse = function(response){
    this.rows = response.data.data || response.data || [];
    this.mapStatusRequest(response);
  };

  this.mapRowResponse = function(response){
    this.row = response.data.data || response.data || {};
    this.mapStatusRequest(response);
  };

  this.mapErrors = function(response){
    this.errors = response.response.data.errors || {};
    this.mapStatusRequest(response.response);
  }

  this.mapStatusRequest = function(response){
    this.status     = response.status || 0;
    this.statusText = response.statusText || "";
  }

  this.show=(id,params,url,queryString)=>{
    return this.cvComunicator.axios.get(
        (url || this.getRelBaseUrl()+"/"+id) + (queryString?"?"+queryString:""),
        params|| {}
    );
  };

  this.index=(params,url,queryString)=>{
    return this.cvComunicator.axios.get(
        (url || this.getRelBaseUrl()) + (queryString?"?"+queryString:""),
        params|| {}
    );
  };

  this.store=(params,url,queryString)=>{
    return this.cvComunicator.axios.post(
        (url || this.getRelBaseUrl()) + (queryString?"?"+queryString:""),
        params|| {}
    );
  };

  this.update=(id,params,url,queryString)=>{
    return this.cvComunicator.axios.put(
        (url || this.getRelBaseUrl()+"/"+id) + (queryString?"?"+queryString:""),
        params|| {}
    );
  };

  this.destroy=(id,params,url,queryString)=>{
    return this.cvComunicator.axios.delete(
        (url || this.getRelBaseUrl()+"/"+id) + (queryString?"?"+queryString:""),
        params|| {}
    );
  }

  this.activate=(id,params,url,queryString)=>{
    return this.cvComunicator.axios.put(
        (url || this.getRelBaseUrl()+"/"+id+"/activate") + (queryString?"?"+queryString:""),
        params|| {}
    );
  }

  this.deactivate=(id,params,url,queryString)=>{
    return this.cvComunicator.axios.put(
        (url || this.getRelBaseUrl()+"/"+id+"/deactivate") + (queryString?"?"+queryString:""),
        params|| {}
    );
  }

  this.cvComunicator.pushDinamicCrudServices(this);
};
