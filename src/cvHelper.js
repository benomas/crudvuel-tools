var cvAuthHelper = {
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
cvAuthHelper.authValidation = () => {
  this.router.resources.permissions.crudServices.unauthorizedPermissions()
    .then(cvAuthHelper.authNoPermmission)
    .catch(cvAuthHelper.authCallError)
}

const mySubString = function (subject,patter) {
  let regexString = "(.|\s)*" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + "(.|\s)*"
  let patt = new RegExp(regexString,"i")
  return patt.test(subject)
}

const myReplace = function (subject,patter,replace) {
  let regexString = "(" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + ")"
  let patt = new RegExp(regexString,"ig")
  let fixDataType = subject
  if(typeof fixDataType === 'boolean' || typeof fixDataType === 'number')
    fixDataType=fixDataType.toString()
  return fixDataType.replace(patt,replace)
}

export {cvAuthHelper,mySubString,myReplace}
