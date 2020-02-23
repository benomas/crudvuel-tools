import cvDinDep      from 'crudvuel-tools/src/cvDinDep'
import CvEnv         from 'crudvuel-tools/src/CvEnv'
import CvPassport    from 'crudvuel-tools/src/network/CvPassport'
import CvCrudService from 'crudvuel-tools/src/network/CvCrudService'
import cvSerialize   from 'crudvuel-tools/src/cvSerialize'

export default class CvComunicator {

  constructor (router,globals) {
    this.globals       = globals
    this.cvDinDep      = cvDinDep
    this.resources     = {}
    this.cvEnv         = this.cvDinDep("CvEnv",globals) || new CvEnv()
    var axios          = require('axios')

    this.defaultConfig = {
      baseURL            : this.cvEnv.apiUrl(),
      headers            : {
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type'     : 'application/json'
      },
      timeout           : this.cvEnv.ajaxTimeout() || 60000,
      responseType      : 'json',
      maxContentLength  : this.cvEnv.ajaxMaxContentLenght() || 20000,
      callBackRedirector: null
    }

    this.router     = router
    this.axios      = axios.create(this.defaultConfig)
    this.cvPassport = this.cvDinDep("CvPassport",globals) || new CvPassport()

    this.axios.interceptors.request.use(config => {
      if(this.cvPassport.autenticated())
        config.headers = this.cvPassport.injectHeaders(config.headers)
      return config
    },error => {
      return Promise.reject(error)
    })

    this.axios.interceptors.response.use(response => {
        this.cvPassport.reactToResponse(response)
        return response
    },error => {
      this.cvPassport.reactToResponse(error)
      this.proccessErrorStatus(error.response)
      return Promise.reject(error)
    })

    this.cvSerialize = cvSerialize
  }

  shareHeaders () {
    let headers = {
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type'     : 'application/json'
    }
    return this.cvPassport.injectHeaders(headers)
  }

  pushStaticCrudServices(resource) {
    if(typeof resource==="undefined")
      return false
    this.resources[resource.resourceName] =  this.cvDinDep("CvCrudService",globals) || new CvCrudService(this,resource)
    return this
  }

  pushDinamicCrudServices (resource) {
    if(typeof resource==="undefined")
      return false
    this.resources[resource.resourceName] = resource
    return this
  }

  proccessErrorStatus (response) {
    switch(response.status){
      case 401:
      case 403:
      case 409:
        this[`error${response.status}`]()
        return true
    }
    return false
  }

  redirect (newRoute) {
    newRoute = newRoute || ''
    this.router.VueRouter.push(newRoute)
    return this
  }

  error401 () {
    this.router.VueRouter.push('/login')
    return this
  }

  error403 () {
    console.log('unauthorized')
    this.router.VueRouter.push('/')
    return this
  }

  error409 () {
    location.reload()
    return this
  }

  loguedStart () {
    this.redirect(this.router != null && this.router.loguedStart != null ? this.router.loguedStart():'/')
    return this
  }

  unLoguedStart () {
    this.redirect(this.router != null && this.router.unLoguedStart != null ? this.router.unLoguedStart():'/')
    return this
  }
}
