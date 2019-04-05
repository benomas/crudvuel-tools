var cvAuthHelper = (context) => {
  var parentContext = context
  const authCallError = response => {
    parentContext.CvNotify.createNegative(parentContext.globals.cvComunicator.router.VueRouter.app.$tc('crudvuel.labels.needToLogin'))
    parentContext.globals.cvComunicator.router.VueRouter.cvPassport.destroyAutentication()
    return parentContext.globals.cvComunicator.unloguedStart()
  }

  const authNoPermmission = response => {
    parentContext.CvNotify.createNegative(parentContext.globals.cvComunicator.router.VueRouter.app.$tc('crudvuel.labels.noAccessAllowed'))
    parentContext.globals.store.commit('setUnauthorizedInteractions',response.data)
    return parentContext.globals.cvComunicator.loguedStart()
  }

  const authValidation = response => {
    parentContext.globals.cvComunicator.router.resources.permissions.crudServices.unauthorizedPermissions()
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

const cvF = function (container = null, property = null) {
  if ( container == null || property == null)
    return null
  return container[property] == null ? null : container[property]
}

export {cvAuthHelper,mySubString,myReplace,cvF}
