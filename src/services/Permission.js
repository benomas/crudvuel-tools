import CustomCvCrudService from 'src/customs/crudvuel/network/CvCrudService'
/*
  here you can customize how this object will work with your current project
*/
export default class ExtendedCvCrudService extends CustomCvCrudService {
  unauthorizedPermissions (params,url,queryString) {
    return this.mGetStCvComunicator().axios.get(
      (url || this.getRelBaseUrl() + '/unauthorized') + (queryString ? '?' + queryString : ''),
      params || {}
    )
  }
}
