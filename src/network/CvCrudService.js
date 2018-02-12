export default function(services,resourceName){
  this.services     = services;
  this.resourceName = resourceName;
  this.row          = {};
  this.rows         = [];
  this.errors       = {};
  this.status       = 0;
  this.statusText   = "";
  
  this.mapRowsResponse = function(response){
    this.rows       = response.data.data || response.data || [];
    this.mapStatusRequest(response);
  };

  this.mapRowResponse = function(response){
    this.row        = response.data.data || response.data || {};
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

  this.show=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
        this.services.axios.get(
            (url || "api/"+this.resourceName+"/"+id) + (queryString?"?"+queryString:""),
            params|| {}
        ).then(function (response) {
            if(typeof successCallBack ==="function")
                successCallBack(response);
        }).catch(function (error) {
            if(typeof ErrorCallBack ==="function")
                ErrorCallBack(error);
        });
    };

    this.index=(successCallBack,ErrorCallBack,params,url,queryString)=>{
        this.services.axios.get(
            (url || "api/"+this.resourceName) + (queryString?"?"+queryString:""),
            params|| {}
        ).then(function (response) {
            if(typeof successCallBack ==="function")
                successCallBack(response);
        }).catch(function (error) {
            if(typeof ErrorCallBack ==="function")
                ErrorCallBack(error);
        });
    };

    this.store=(successCallBack,ErrorCallBack,params,url,queryString)=>{
        this.services.axios.post(
            (url || "api/"+this.resourceName) + (queryString?"?"+queryString:""),
            params|| {}
        ).then(function (response) {
            if(typeof successCallBack ==="function")
                successCallBack(response);
        }).catch(function (error) {
            if(typeof ErrorCallBack ==="function")
                ErrorCallBack(error);
        });
    };

    this.update=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
        this.services.axios.put(
            (url || "api/"+this.resourceName+"/"+id) + (queryString?"?"+queryString:""),
            params|| {}
        ).then(function (response) {
            if(typeof successCallBack ==="function")
                successCallBack(response);
        }).catch(function (error) {
            if(typeof ErrorCallBack ==="function")
                ErrorCallBack(error);
        });
    };

    this.delete=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
        this.services.axios.delete(
            (url || "api/"+this.resourceName+"/"+id) + (queryString?"?"+queryString:""),
            params|| {}
        ).then(function (response) {
            if(typeof successCallBack ==="function")
                successCallBack(response);
        }).catch(function (error) {
            if(typeof ErrorCallBack ==="function")
                ErrorCallBack(error);
        });
    }
};