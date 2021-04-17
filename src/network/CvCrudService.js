import FileSaver      from 'file-saver'
import CvSerializer   from 'crudvuel-tools/src/CvSerializer'
import {cvBase64}     from  'crudvuel-tools/src/cvHelper'

export default class CvCrudService {
  constructor (store,resourceName) {
    store.dispatch('mStInyector',this)
    this.resourceName   = resourceName
    this.resourcePrefix = '/'
    this.row            = {}
    this.rows           = []
    this.errors         = {}
    this.status         = 0
    this.statusText     = ''
    this.FileSaver      = FileSaver
  }

  getBaseUrl (additionalSegment = null) {
    return `api${additionalSegment || ''}`
  }

  getRelBaseUrl (additionalSegment = null) {
    return `${this.getBaseUrl(additionalSegment)}${this.resourcePrefix }${this.resourceName}`
  }

  getAbsBaseUrl () {
    return `${this.mGetStCvComunicator().defaultConfig.baseURL}/${this.getRelBaseUrl()}`
  }

  fixQueryString (qString = null) {
    let fixBase64 = (querySource) => `b64Query=${cvBase64.encode(querySource)}`
    let fixedQString
    if (qString && typeof qString === 'object') {
      if (this.mGetStCvEnv().base64QueryString())
        fixedQString = fixBase64(JSON.stringify(qString))
      else
        fixedQString = new CvSerializer(qString).getSerialized(qString)
    }
    else{
      if (this.mGetStCvEnv().base64QueryString())
        fixedQString = fixBase64(qString || '')
      else
        fixedQString = qString
    }

    return fixedQString? '?' + fixedQString: ''
  }

  fixRowUrl (posfix=null,id,params = null,url = null,qString = null) {
    return [
      (url || this.getRelBaseUrl() + (posfix || '/' + id)) + this.fixQueryString(qString),
      params || {}
    ]
  }

  fixRowsUrl (posfix=null,params = null,url = null,qString = null) {
    return [
      (url || this.getRelBaseUrl() + (posfix || '')) + this.fixQueryString(qString),
      params || {}
    ]
  }

  fHeaders (params) {
    let newParams = params || {}
    newParams.responseType = 'blob'
    return newParams
  }

  setResourcePrefix (resourcePrefix) {
    this.resourcePrefix = resourcePrefix || '/'
    return this
  }

  mapRowsResponse (response) {
    this.rows = response.data.data || response.data || []
    this.mapStatusRequest(response)
    return this
  }

  mapRowResponse (response) {
    this.row = response.data.data || response.data || {}
    this.mapStatusRequest(response)
    return this
  }

  mapErrors (response) {
    this.errors = response.response.data.errors || {}
    this.mapStatusRequest(response.response)
    return this
  }

  mapStatusRequest (response) {
    this.status     = response.status || 0
    this.statusText = response.statusText || ''
    return this
  }

  //spected params: id,params,url,qString
  show (...params) {
    return this.mGetStCvComunicator().axios.get(...this.fixRowUrl(null,...params))
  }

  //spected params: params,url,qString
  index (...params) {
    return this.mGetStCvComunicator().axios.get(...this.fixRowsUrl(null,...params))
  }

  relatedIndex (relatedResource, relatedKey,qString) {
    return this.mGetStCvComunicator().axios.get(`${this.getRelBaseUrl()}/related-to/${relatedResource}/${relatedKey}${this.fixQueryString(qString)}`)
  }

  //spected params: params,url,qString
  store (...params) {
    return this.mGetStCvComunicator().axios.post(...this.fixRowsUrl(null,...params))
  }

  //spected params: id,params,url,qString
  update (...params) {
    return this.mGetStCvComunicator().axios.put(...this.fixRowUrl(null,...params))
  }

  //spected params: id,params,url,qString
  destroy (...params) {
    return this.mGetStCvComunicator().axios.delete(...this.fixRowUrl(null,...params))
  }

  //spected params: id,params,url,qString
  activate (...params) {
    return this.mGetStCvComunicator().axios.put(...this.fixRowUrl(`/${params[0]}/activate`,...params))
  }

  //spected params: id,params,url,qString
  deactivate (...params) {
    return this.mGetStCvComunicator().axios.put(...this.fixRowUrl(`/${params[0]}/deactivate`,...params))
  }

  exporting (id, params = null,url = null,qString = null, date = null) {
    if (date == null)
      return console.log('date quasar object required')

    return new Promise((resolve, reject) => {
      this.mGetStCvComunicator().axios.get(...this.fixRowsUrl(`/${id}/exporting`,this.fHeaders(params),url,qString)).then(response => {
          let suggestedFileName = ''
          let fileName          = ''
          if(response.headers['content-disposition'] != null)
            suggestedFileName = response.headers['content-disposition'].match(/^.*?filename=(.+)$/)
          if(suggestedFileName[1] != null)
            fileName = suggestedFileName[1]
          else
            fileName = date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ') + 'export.xlsx'
          this.FileSaver.saveAs(response.data, fileName)
          resolve(response)
        }).catch((response) => {
          reject(response)
        })
    })
  }

  exportings  =  (params = null,url = null,qString = null, date = null) => {console.log(params)
    if (date == null)
      return console.log('date quasar object required')

    return new Promise((resolve, reject) => {
      this.mGetStCvComunicator().axios.get(...this.fixRowsUrl('/exporting',this.fHeaders(params),url,qString)).then(response => {
          let suggestedFileName = ''
          let fileName          = ''

          if(response.headers['content-disposition'] != null)
            suggestedFileName = response.headers['content-disposition'].match(/^.*?filename=(.+)$/)

          if(suggestedFileName[1] != null)
            fileName = suggestedFileName[1]
          else
            fileName = date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ') + 'export.xlsx'

          this.FileSaver.saveAs(response.data, fileName)

          resolve(response)
        }).catch((response) => {
          reject(response)
        })
    })
  }

  publicIndex (params = null,url = null,qString = null)  {
    return this.mGetStCvComunicator().axios.get(
      (url || this.getRelBaseUrl('public')) + this.fixQueryString(qString),
      params || {}
    )
  }

  publicShow (id,params = null,url = null,qString = null) {
    return this.mGetStCvComunicator().axios.get(
      (url || `${this.getRelBaseUrl('public')}/${id}`) + this.fixQueryString(qString),
      params || {}
    )
  }

  //spected params: params,url,qString
  newShow (id,params={},config={}) {
    return this.mGetStCvComunicator().axios.get(`${this.getRelBaseUrl()}/${id}${this.fixQueryString(params)}`,config)
  }

  //spected params: params,url,qString
  newIndex (params={},config={}) {
    return this.mGetStCvComunicator().axios.get(`${this.getRelBaseUrl()}${this.fixQueryString(params)}`,config)
  }
}
