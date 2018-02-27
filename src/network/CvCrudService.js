export default function(cvComunicator,resourceName){
  this.cvComunicator  = cvComunicator;
  this.resourceName   = resourceName;
  this.resourcePrefix = "/";
  this.row            = {};
  this.rows           = [];
  this.errors         = {};
  this.status         = 0;
  this.statusText     = "";

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

  this.show=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.get(
        (url || "api"+this.resourcePrefix+this.resourceName+"/"+id) + (queryString?"?"+queryString:""),
        params|| {}
    ).then((response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  };

  this.index=(successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.get(
        (url || "api"+this.resourcePrefix+this.resourceName) + (queryString?"?"+queryString:""),
        params|| {}
    ).then( (response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  };

  this.store=(successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.post(
        (url || "api"+this.resourcePrefix+this.resourceName) + (queryString?"?"+queryString:""),
        params|| {}
    ).then( (response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  };

  this.update=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.put(
        (url || "api"+this.resourcePrefix+this.resourceName+"/"+id) + (queryString?"?"+queryString:""),
        params|| {}
    ).then( (response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  };

  this.destroy=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.delete(
        (url || "api"+this.resourcePrefix+this.resourceName+"/"+id) + (queryString?"?"+queryString:""),
        params|| {}
    ).then( (response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  }

  this.activate=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.put(
        (url || "api"+this.resourcePrefix+this.resourceName+"/"+id+"/activate") + (queryString?"?"+queryString:""),
        params|| {}
    ).then( (response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  }

  this.deactivate=(id,successCallBack,ErrorCallBack,params,url,queryString)=>{
    this.cvComunicator.axios.put(
        (url || "api"+this.resourcePrefix+this.resourceName+"/"+id+"/deactivate") + (queryString?"?"+queryString:""),
        params|| {}
    ).then( (response)=>{
        if(typeof successCallBack ==="function")
            successCallBack(response);
    }).catch( (error)=>{
        if(typeof ErrorCallBack ==="function")
            ErrorCallBack(error);
    });
  }

  this.cvComunicator.pushDinamicCrudServices(this);
};