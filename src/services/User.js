import CustomCvCrudService from 'src/customs/crudvuel/network/CvCrudService'
/*
  here you can customize how this object will work with your current project
*/
export default class ExtendedCvCrudService extends CustomCvCrudService {
  profile (successCallBack,ErrorCallBack,params,url,queryString) {
    return this.mGetStCvComunicator().axios.get(
      (url || this.getRelBaseUrl() + '/profile') + (queryString ? '?' + queryString : ''),
      params || {}
    )
  }

  updateProfile (id,params,url,queryString) {
    return this.mGetStCvComunicator().axios.put(
      (url || this.getRelBaseUrl() + '/' + id + '/profile') + (queryString ? '?' + queryString : ''),
      params || {}
    )
  }

  dashboardInfo (card = null) {
    return card !==  null ?
      this.mGetStCvComunicator().axios.get(`api/dashboard-info${card}`) :
      this.mGetStCvComunicator().axios.get(`api/dashboard-info`)
  }
}
