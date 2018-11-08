var cvAuthHelper = (context) => {
  var parentContext = context
  const authCallError = response => {
    parentContext.CvNotify.createNegative(parentContext.router.VueRouter.app.$tc('crudvuel.labels.needToLogin'))
    parentContext.router.VueRouter.cvPassport.destroyAutentication()
    return parentContext.unloguedStart()
  }

  const authNoPermmission = response => {
    parentContext.CvNotify.createNegative(parentContext.router.VueRouter.app.$tc('crudvuel.labels.noAccessAllowed'))
    parentContext.globals.store.commit('setUnauthorizedInteractions',response.data)
    return parentContext.loguedStart()
  }

  const authValidation = function () {
    parentContext.router.resources.permissions.crudServices.unauthorizedPermissions()
      .then(authNoPermmission)
      .catch(authCallError)
  }
  return {
    authCallError,
    authNoPermmission,
    authValidation
  }
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
