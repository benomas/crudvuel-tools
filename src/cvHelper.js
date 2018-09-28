var cvHelper = {
  authCallError: response => {
    CvNotify.createNegative(this.router.VueRouter.app.$tc('crudvuel.labels.needToLogin'))
    this.router.VueRouter.cvPassport.destroyAutentication()
    return this.unloguedStart()
  },
  authNoPermmission: response => {
    CvNotify.createNegative(this.router.VueRouter.app.$tc('crudvuel.labels.noAccessAllowed'))
    this.globals.store.commit('setUnauthorizedInteractions',response.data)
    return this.loguedStart()
  }
}
cvHelper.authValidation = () => {
  this.router.resources.permissions.crudServices.unauthorizedPermissions()
    .then(cvHelper.authNoPermmission)
    .catch(cvHelper.authCallError)
}
export {cvHelper}
