import CustomCvCrudService from 'crudvuel-tools/srcnetwork/CvCrudService'
/*
  here you can customize how this object will work with your current project
*/
export default class ExtendedCvCrudService extends CustomCvCrudService {
  store (params,url,queryString) {
    return this.mGetStCvComunicator().axios.post(
      (url || this.getRelBaseUrl('public')) + (queryString ? '?' + queryString : ''),
      params || {},
      {headers: { 'content-type': 'multipart/form-data' }}
    )
  }

  update (id,params,url,queryString) {
    return this.mGetStCvComunicator().axios.post(
      (url || this.getRelBaseUrl()) + (queryString ? '?' + queryString : ''),
      params || {},
      {headers: { 'content-type': 'multipart/form-data' }}
    )
  }
}
