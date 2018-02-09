import cvEnv from './CvEnvironment'
export default function(){
  let cvEnvInstance = new cvEnv();
  this.loadTokens = ()=>{
    if(!cvEnvInstance.isPassportEnabled())
      return ;
    this.accessToken  = JSON.parse(localStorage.getItem("accessToken") || 'null');
    this.refreshToken = JSON.parse(localStorage.getItem("refreshToken") || 'null');
  };

  this.setAccessToken = function(accessToken){
    if(!cvEnvInstance.isPassportEnabled())
      return ;
    this.accessToken = typeof accessToken!=="undefined"?"Bearer "+accessToken:null;
    if(this.accessToken)
      localStorage.setItem("accessToken", JSON.stringify(this.accessToken));
    else
      localStorage.removeItem("accessToken");
  };

  this.setRefreshToken=function(refreshToken){
    if(!cvEnvInstance.isPassportEnabled())
      return ;
    this.refreshToken=typeof refreshToken!=="undefined"?"Bearer "+refreshToken:null;
    if(this.refreshToken)
      localStorage.setItem("refreshToken", JSON.stringify(this.refreshToken));
    else
      localStorage.removeItem("refreshToken");
  };

  this.autenticated=function(){
    if(!cvEnvInstance.isPassportEnabled())
      return true;
    this.loadTokens();
    return this.accessToken!==null;
  };

  this.injectHeaders=function(headers){
    if(!cvEnvInstance.isPassportEnabled())
      return headers;
    headers["Authorization"]=this.accessToken;
    return headers;
  };

  this.reactToResponse=function(response){
    if(!cvEnvInstance.isPassportEnabled())
      return ;
    if(typeof response!=="undefined" && typeof response.response!=="undefined" && typeof response.response.status!=="undefined" && response.response.status===401){
      this.setAccessToken()
      this.setRefreshToken()
      return false;
    }

    if(typeof response!=="undefined" && typeof response.data!=="undefined" && typeof response.data.token_type!=="undefined" && response.data.token_type==="Bearer"){
      if(response.data.access_token!=="undefined")
        this.setAccessToken(response.data.access_token)
      else
        this.setAccessToken()
      if(response.data.refresh_token!=="undefined")
        this.setRefreshToken(response.data.refresh_token)
      else
        this.setRefreshToken()
    }
  };
  this.loadTokens();
};
