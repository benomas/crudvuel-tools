export default function (store) {
  store.dispatch('mStInyector',this)
  this.resourceName   = 'general'

  this.login = function (email,password) {
    return this.mGetStCvComunicator().axios.post('oauth/token',{
      'client_id'     : this.mGetStCvEnv().apiClient(),
      'client_secret' : this.mGetStCvEnv().apiSecret(),
      'grant_type'    : 'password',
      'username'      : email,
      'password'      : password
    })
  }

  this.logout = function () {
    return this.mGetStCvComunicator().axios.get('api/logout')
  }

  this.register = function (data = {}) {
    return this.mGetStCvComunicator().axios.post('api/register',data)
  }

  this.recovery = function (data = {}) {
    return this.mGetStCvComunicator().axios.post('api/recovery',data)
  }

  this.confirm = function (data = {}) {
    return this.mGetStCvComunicator().axios.post('api/confirm',data)
  }

  this.reloadUserData = function () {
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
};
