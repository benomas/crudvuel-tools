import CvCrudService from 'crudvuel-tools/src/network/CvCrudService'
import cvSerialize   from 'crudvuel-tools/src/cvSerialize'

export default class CvComunicator {
  constructor (store) {
    store.dispatch('mStInyector',this)
    var axios           = require('axios')

    this.defaultConfig = {
      baseURL            : this.mGetStCvEnv().apiUrl(),
      headers            : {
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type'     : 'application/json'
      },
      timeout           : this.mGetStCvEnv().ajaxTimeout() || 60000,
      responseType      : 'json',
      maxContentLength  : this.mGetStCvEnv().ajaxMaxContentLenght() || 20000,
      callBackRedirector: null
    }

    this.mRouter    = store.cStCvRouterCaller
    this.axios      = axios.create(this.defaultConfig)

    this.axios.interceptors.request.use(config => {
      if(this.mGetStCvPassport().autenticated())
        config.headers = this.mGetStCvPassport().injectHeaders(config.headers)
      return config
    },error => {
      return Promise.reject(error)
    })

    this.axios.interceptors.response.use(response => {
        this.mGetStCvPassport().reactToResponse(response)
        return response
    },error => {
      this.mGetStCvPassport().reactToResponse(error)
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
    return this.mGetStCvPassport().injectHeaders(headers)
  }
/*
  pushStaticCrudServices(resource) {
    if(typeof resource==="undefined")
      return false
    this.cResources[resource.resourceName] =  this.cvDinDep("CvCrudService",globals) || new CvCrudService(this,resource)
    return this
  }

  pushDinamicCrudServices (resource) {
    if(typeof resource==="undefined")
      return false
    this.cResources[resource.resourceName] = resource
    return this
  }
*/
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

  error401 () {
    this.mRouter().VueRouter.push('/login')
    return this
  }

  error403 () {
    console.log('unauthorized')
    this.mRouter().VueRouter.push('/')
    return this
  }

  error409 () {
    location.reload()
    return this
  }
  /*
  //to be deprecated
  redirect (newRoute) {
    newRoute = newRoute || ''
    this.mRouter().VueRouter.push(newRoute)
    return this
  }
  //to be deprecated
  loguedStart () {
    console.log( this.mRouter().loguedStart)
    this.redirect(this.mRouter() != null && this.mRouter().loguedStart != null ? this.mRouter().loguedStart():'/')
    return this
  }
  //to be deprecated
  unLoguedStart () {
    this.redirect(this.mRouter() != null && this.mRouter().unLoguedStart != null ? this.mRouter().unLoguedStart():'/')
    return this
  }*/
}
