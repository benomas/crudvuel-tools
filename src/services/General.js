export default class General {
  constructor (store) {
    store.dispatch('mStInyector',this)
    this.resourceName   = 'general'
  }

  login (credentials) {
    return this.mGetStCvComunicator().axios.post('oauth/token',{
      'client_id'     : this.mGetStCvEnv().apiClient(),
      'client_secret' : this.mGetStCvEnv().apiSecret(),
      'grant_type'    : 'password',
      'username'      : credentials.email,
      'password'      : credentials.password
    })
  }

  logout () {
    return this.mGetStCvComunicator().axios.get('api/logout')
  }

  register (data = {}) {
    return this.mGetStCvComunicator().axios.post('api/register',data)
  }

  recovery (data = {}) {
    return this.mGetStCvComunicator().axios.post('api/recovery',data)
  }

  confirm (data = {}) {
    return this.mGetStCvComunicator().axios.post('api/confirm',data)
  }

  reloadUserData () {
    return new Promise((resolve, reject) => {
      this.mGetStCvComunicator().resources.users.profile().then(response => {
        this.cStStore.commit('setCurrentUser',response.data.data)

        //User unauthorized interactions service
        this.mGetStCvComunicator().resources.permissions.unauthorizedPermissions()
          .then((response) => {
            this.cStStore.commit('setUnauthorizedInteractions',response.data)
            //if all was correct, then redirect to loguedStart
            this.mGetStCvComunicator().loguedStart()
            resolve(response)
          })
          .catch(response => reject(response))
      }).catch(response => reject(response))
    })
  }
}
