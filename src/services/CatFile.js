import CustomCvCrudService from 'crudvuel-tools/srcnetwork/CvCrudService'
/*
  here you can customize how this object will work with your current project
*/
export default class ExtendedCvCrudService extends CustomCvCrudService {
  sluged (params,url,queryString) {
    return this.mGetStCvComunicator().axios.get(
      (url || this.getRelBaseUrl() + '/sluged') + (queryString ? '?' + queryString : ''),
      params || {}
    )
  }

  resources = (...params) => {
    params[1] = 'api/resources'
    return this.mGetStCvComunicator().axios.get(...this.fixRowsUrl(null,...params))
  }

  resourcer (resource = 'files',key = 1,queryString = null) {
    return this.mGetStCvComunicator().axios.get(`api/resourcer/${resource}/${key}${this.fixQueryString(queryString)}`)
  }

  zippedResource (resource, key,queryString = null) {
    return this.mGetStCvComunicator().axios.get(`api/files/${resource}/${key}${this.fixQueryString(queryString)}`,this.fHeaders())
  }
}
