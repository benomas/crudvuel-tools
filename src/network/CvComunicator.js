import cvDinDep      from '../cvDinDep'
import CvEnv         from '../CvEnv'
import CvPassport    from './CvPassport'
import CvCrudService from './CvCrudService'
import cvSerialize   from '../cvSerialize'

export default function(router,globals){
  this.globals       = globals
  this.cvDinDep      = cvDinDep
  this.resources     = {}
  this.cvEnv         = this.cvDinDep("CvEnv",globals) || new CvEnv()
  var axios          = require('axios')
  this.defaultConfig = {
    baseURL            : this.cvEnv.apiUrl(),
    headers            : {
    'X-Requested-With'           : 'XMLHttpRequest',
    'Content-Type'               : 'application/json'
    },
    timeout           : this.cvEnv.ajaxTimeout() || 60000,
    responseType      : 'json',
    maxContentLength  : this.cvEnv.ajaxMaxContentLenght() || 20000,
    callBackRedirector: null
  }
  this.router     = router
  this.axios      = axios.create(this.defaultConfig)
  this.cvPassport = this.cvDinDep("CvPassport",globals) || new CvPassport()

  this.shareHeaders = function () {
    let headers = {
      'X-Requested-With'           : 'XMLHttpRequest',
      'Content-Type'               : 'application/json'
    }
    //let headers = JSON.parse(JSON.stringify(this.defaultConfig.headers))
    return this.cvPassport.injectHeaders(headers)
  }

  this.axios.interceptors.request.use((config)=>{
    if(this.cvPassport.autenticated())
      config.headers = this.cvPassport.injectHeaders(config.headers)
    return config
  },(error)=> {
    return Promise.reject(error)
  })

  this.axios.interceptors.response.use((response)=>{
      this.cvPassport.reactToResponse(response)
      return response
  },(error)=>{
    this.cvPassport.reactToResponse(error)
    this.proccessErrorStatus(error.response)
    return Promise.reject(error)
  })

  this.pushStaticCrudServices=(resource)=>{
    if(typeof resource==="undefined")
      return false
    this.resources[resource.resourceName] =  this.cvDinDep("CvCrudService",globals) || new CvCrudService(this,resource)
  }

  this.pushDinamicCrudServices=(resource)=>{
    if(typeof resource==="undefined")
      return false
    this.resources[resource.resourceName] = resource
  }

  this.proccessErrorStatus = (response) => {
    switch(response.status){
      case 401:
        this['error' + response.status]()
        return true
      case 403:
        this['error' + response.status]()
        return true
      case 409:
        this['error' + response.status]()
        return true
    }
    return false
  }

  this.redirect = function(newRoute){
    newRoute = newRoute || ''
    this.router.VueRouter.push(newRoute)
  }

  this.error401 = () => {
    this.router.VueRouter.push('/login')
  }

  this.error403 = () => {
    console.log('unauthorized')
    this.router.VueRouter.push('/')
  }

  this.error409 = () => {
    location.reload()
  }
  this.cvSerialize=cvSerialize

  this.loguedStart    = () => {
    let redirect = this.router != null &&
    this.router.loguedStart != null ? this.router.loguedStart():'/'
    this.redirect(redirect)
  }
  this.unLoguedStart  = () =>{
    let redirect = this.router != null &&
    this.router.unLoguedStart != null ? this.router.unLoguedStart():'/'
    this.redirect(redirect)
  }
}
