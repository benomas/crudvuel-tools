import CvCrudService from 'crudvuel-tools/src/network/CvCrudService'
import cvSerialize   from 'crudvuel-tools/src/cvSerialize'
import {cStLocale, cStStrLocale} from 'app/crudvuel/src/store/default-modules/getters'

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

    this.axios      = axios.create(this.defaultConfig)

    this.axios.interceptors.request.use(config => {
      if(this.mGetStCvPassport().autenticated())
        config.headers = this.mGetStCvPassport().injectHeaders(config.headers)
      let langQString = `lang=${store.getters.cStStrLocale()}`

      if (store.getters.cStCvEnv.apiUrl() === config.baseURL) {
        if (config.url.search("\\?") < 0) {
          langQString = `?${langQString}`
        }else{
          langQString = `&${langQString}`
        }

        config.url = `${config.url}${langQString}`
      }

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
    this.mGetStCurrentCvRouter().getVueRouter().push('/login')

    return this
  }

  error403 () {
    console.log('unauthorized')
    this.mGetStCurrentCvRouter().getVueRouter().push('/')

    return this
  }

  error409 () {
    location.reload()
    return this
  }
}
