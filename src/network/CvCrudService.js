import FileSaver from 'file-saver'
import { date }  from 'quasar'
export default function(cvComunicator,resourceName){
  this.cvComunicator  = cvComunicator
  this.resourceName   = resourceName
  this.resourcePrefix = '/'
  this.row            = {}
  this.rows           = []
  this.errors         = {}
  this.status         = 0
  this.statusText     = ''

  this.getRelBaseUrl =  function (){
    return 'api' + this.resourcePrefix + this.resourceName
  }

  this.getAbsBaseUrl = function () {
    return this.cvComunicator.defaultConfig.baseURL + '/' + this.getRelBaseUrl()
  }

  this.fixRowUrl = (posfix=null,id,params,url,qString) => {
    return [
      (url || this.getRelBaseUrl() + (posfix || '/' + id)) + (qString? '?' + qString: ''),
      params || {}
    ]
  }

  this.fixRowsUrl = (posfix=null,params,url,qString) => {
    return [
      (url || this.getRelBaseUrl() + (posfix || '')) + (qString? '?' + qString: ''),
      params || {}
    ]
  }

  this.fHeaders = (params) => {
    let newParams = params || {}
    newParams.responseType = 'blob'
    return newParams
  }

  this.setResourcePrefix= function(resourcePrefix){
    this.resourcePrefix = resourcePrefix || '/'
  }

  this.mapRowsResponse = function(response){
    this.rows = response.data.data || response.data || []
    this.mapStatusRequest(response)
  }

  this.mapRowResponse = function(response){
    this.row = response.data.data || response.data || {}
    this.mapStatusRequest(response)
  }

  this.mapErrors = function(response){
    this.errors = response.response.data.errors || {}
    this.mapStatusRequest(response.response)
  }

  this.mapStatusRequest = function(response){
    this.status     = response.status || 0
    this.statusText = response.statusText || ''
  }
  //spected params: id,params,url,qString
  this.show = (...params) => this.cvComunicator.axios.get(...this.fixRowUrl(null,...params))

  //spected params: params,url,qString
  this.index = (...params) => this.cvComunicator.axios.get(...this.fixRowsUrl(null,...params))

  //spected params: params,url,qString
  this.store = (...params) => this.cvComunicator.axios.post(...this.fixRowsUrl(null,...params))

  //spected params: id,params,url,qString
  this.update = (...params) => this.cvComunicator.axios.put(...this.fixRowUrl(null,...params))

  //spected params: id,params,url,qString
  this.destroy = (...params) => this.cvComunicator.axios.delete(...this.fixRowUrl(null,...params))

  //spected params: id,params,url,qString
  this.activate = (...params) =>
    this.cvComunicator.axios.put(...this.fixRowUrl('/'+params[0]+'/activate',...params))

  //spected params: id,params,url,qString
  this.deactivate = (...params) =>
    this.cvComunicator.axios.put(...this.fixRowUrl('/'+params[0]+'/deactivate'))

  this.exporting = (id, params = null,url = null,qString = null) =>
    new Promise((resolve, reject) => {
      this.cvComunicator.axios.get(...this.fixRowsUrl('/'+id+'/exporting',this.fHeaders(params),url,qString)).then(response => {
          let suggestedFileName = ''
          let fileName          = ''
          if(response.headers['content-disposition'] != null)
            suggestedFileName = response.headers['content-disposition'].match(/^.*?filename=(.+)$/)
          if(suggestedFileName[1] != null)
            fileName = suggestedFileName[1]
          else
            fileName = date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ') + 'export.xlsx'
          FileSaver.saveAs(response.data, fileName)
          resolve(response)
        }).catch((response) => {
          reject(response)
        })
    })

  this.exportings = (params = null,url = null,qString = null) =>
    new Promise((resolve, reject) => {
      this.cvComunicator.axios.get(...this.fixRowsUrl('/exporting',this.fHeaders(params),url,qString)).then(response => {
          let suggestedFileName = ''
          let fileName          = ''
          if(response.headers['content-disposition'] != null)
            suggestedFileName = response.headers['content-disposition'].match(/^.*?filename=(.+)$/)
          if(suggestedFileName[1] != null)
            fileName = suggestedFileName[1]
          else
            fileName = date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ') + 'export.xlsx'
          FileSaver.saveAs(response.data, fileName)
          resolve(response)
        }).catch((response) => {
          reject(response)
        })
    })

  this.moduleExport = (params,url,qString) => {
    let newParams = params || {}
    newParams.responseType = 'blob'
    return this.cvComunicator.axios.get((url || this.getRelBaseUrl() + '/module-export') + (qString ? '?' + qString : ''),newParams)
  }
  this.cvComunicator.pushDinamicCrudServices(this)
}
