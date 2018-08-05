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

  // Default row params when id is defined, so action has these params id,params,url,queryString
  this.solveKeyedParams = (id = null, params = null, url = null, queryString = null) => {
    return [
      (url || this.getRelBaseUrl() + "/" + id) + (queryString?"?"+queryString:""),
      params|| {}
    ]
  }

  // Default rows params when non id is defined, so action has these params params,url,queryString
  this.solveParams = ( params = null, url = null, queryString = null) => {
    return [
      (url || this.getRelBaseUrl()) + (queryString?"?"+queryString:""),
      params|| {}
    ]
  }

  this.show = (...serviceParams) => {
    return this.cvComunicator.axios.get(...this.solveKeyedParams(...serviceParams))
  };

  this.index = (...serviceParams) => {
    return this.cvComunicator.axios.get(...this.solveParams(...serviceParams))
  };

  this.store = (...serviceParams) => {
    return this.cvComunicator.axios.post(...this.solveParams(...serviceParams))
  };

  this.update = (...serviceParams) => {
    return this.cvComunicator.axios.put(...this.solveKeyedParams(...serviceParams))
  };

  this.destroy = (...serviceParams) => {
    return this.cvComunicator.axios.delete(...this.solveKeyedParams(...serviceParams))
  }

  this.activate = (id,successCallBack,ErrorCallBack,params,url,queryString) => {
    return this.cvComunicator.axios.put(
        (url || this.getRelBaseUrl() + "/" + id + "/activate") + (queryString?"?" + queryString:""),
        params|| {}
    )
  }

  this.deactivate = (id,successCallBack,ErrorCallBack,params,url,queryString) => {
    return this.cvComunicator.axios.put(
        (url || this.getRelBaseUrl() + "/" + id + "/deactivate") + (queryString?"?"+queryString:""),
        params|| {}
    )
  }

  this.cvComunicator.pushDinamicCrudServices(this);
};
