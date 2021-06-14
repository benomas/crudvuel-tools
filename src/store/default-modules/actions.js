import {trimStart} from 'lodash'

export const mStLogin = (state,credentials) => {
  return new Promise((resolve, reject) => {
    state.getters.cStCvGeneralServices.login(credentials).then(response => {
      state.dispatch('mStReloadUserData').then(response => {
        state.dispatch('mStForceSecureWebAppMode')
        resolve(response)
      }).catch(response => false)
    }).catch(reject)
  })
}

export const mStDestroyAutentication = (state) => {
  return new Promise((resolve, reject) => {
    state.getters.cStCvPassport.destroyAutentication()
    resolve()
  })
}

export const mStLogout = (state,credentials) => {
  return new Promise((resolve, reject) => {
    state.getters.cStCvGeneralServices.logout().then(response => {
      state.dispatch('mStDestroyAutentication')

      if (state.getters.cStCurrentCvRouter)
        state.getters.cStCurrentCvRouter.routeRedirectToUnloguedStart()

      state.getters.cStCvRouterCore.resetRouterSwitcherFlow()
      state.dispatch('mStSetWebAppMode','public')
    }).catch(reject)
  })
}

export const mStLoadCurrentUser = (state) => {
  return new Promise((resolve, reject) => {
    state.getters.cStCvServices.users.profile().then(response => {
      state.dispatch('mStSetCurrentUser',response.data.data)
      resolve(response)
    }).catch(response => reject(response))
  })
}

export const mStLoadUnauthorizedInteractions = (state) => {
  return new Promise((resolve, reject) => {
    state.getters.cStCvServices.permissions.unauthorizedPermissions()
      .then((response) => {
        state.commit('setUnauthorizedInteractions',response.data)
        state.dispatch('mStReloadMode')
        resolve(response)
      })
      .catch(response => reject(response))
  })
}

export const mStReloadUserData = (state) => {
  return new Promise((resolve, reject) => {
    state.dispatch('mStLoadCurrentUser').then(() =>
      state.dispatch('mStLoadUnauthorizedInteractions').then(() => {
        resolve(true)
      }).catch(response => reject(response))
    ).catch(response => reject(response))
  })
}

export const mStReloadMode = (state) => {
  if (!state.getters.cStWebAppMode) {
    if (state.getters.cStWebAppInternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','internal')

    if (state.getters.cStWebAppExternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','external')
  }

  if (state.getters.cStWebAppMode === 'internal') {
    if (state.getters.cStWebAppInternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','internal')

    if (state.getters.cStWebAppExternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','external')
  }

  if (state.getters.cStWebAppMode === 'external') {
    if (state.getters.cStWebAppExternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','external')

    if (state.getters.cStWebAppInternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','internal')
  }

  return state.dispatch('mStSetSecureWebAppMode','public')
}

export const mStSetSecureWebAppMode = (state, mode) => {
  if (mode === 'public')
    return state.commit('setWebAppMode','public')

  if (mode === 'internal' && state.getters.cStWebAppInternalModeSupport)
    return state.commit('setWebAppMode','internal')

  if (mode === 'external' && state.getters.cStWebAppExternalModeSupport)
    return state.commit('setWebAppMode','external')

  state.commit('setWebAppMode','public')
}

export const mStForceSecureWebAppMode = (state) => {
  if (state.getters.cStWebAppInternalModeSupport)
    return state.commit('setWebAppMode','internal')

  if (state.getters.cStWebAppExternalModeSupport)
    return state.commit('setWebAppMode','external')

  state.commit('setWebAppMode','public')
}

export const mStSetWebAppMode = (state, mode) => {
  state.commit('setWebAppMode',mode)
}

export const mStSetResources = (state, resources) => {
  state.commit('setResources',resources)
}

export const mStSwitchInternalExternalMode = (state) => {
  if (state.getters.cStWebAppMode === 'internal')
    if (state.getters.cStWebAppExternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','external')

  if (state.getters.cStWebAppMode === 'external')
    if (state.getters.cStWebAppExternalModeSupport)
      return state.dispatch('mStSetSecureWebAppMode','internal')
}

export const mStLoadCvGeneralServices = (state) => {
  return new Promise((resolve, reject) => {
    import('src/services/General').then((cvGeneralServices) => {
      let CvGeneralServices = cvGeneralServices.default
      let generalServices = new CvGeneralServices(state)
      state.commit('setCvGeneralServices',generalServices)
      resolve(generalServices)
    })
  })
}

export const mStLoadCvServices = (state) => {
  return new Promise((resolve, reject) => {
    let services = {}

    for (const [prop, val] of Object.entries(state.getters.cStResources)) {
      if (val.crudServices != null)
        services[prop] = val.crudServices
    }

    state.commit('setCvServices',services)
    resolve(services)
  })
}

export const mStLoadCvEnv = (state) => {
  return new Promise((resolve, reject) => {
    import('c-crudvuel/CvEnv').then((cvEnv) => {
      let CvEnv = cvEnv.default
      let env   = new CvEnv()
      state.commit('setCvEnv',env)
      resolve(env)
    })
  })
}

export const mStLoadCvComunicator = (state) => {
  return new Promise((resolve, reject) => {
    import('c-crudvuel/network/CvComunicator').then((cvComunicator) => {
      let CvComunicator = cvComunicator.default
      let comunicator = new CvComunicator(state)
      state.commit('setCvComunicator',comunicator)
      resolve(comunicator)
    })
  })
}

export const mStLoadCvPassport = (state,router) => {
  return new Promise((resolve, reject) => {
    import('c-crudvuel/network/CvPassport').then((cvPassport) => {
      let CvPassport = cvPassport.default
      let passport   = new CvPassport(state)
      state.commit('setCvPassport',passport)
      resolve(passport)
    })
  })
}

export const mStLoadCvRouterCore = (state,cvRouterCore) => {
  state.commit('setCvRouterCore',cvRouterCore)
}

export const mStSetCurrentUser = (state,currentUser) => {
  state.commit('setCurrentUser',currentUser)
}

export const mStSetCvRedirectCache = (state,cvRedirectCache) => {
  state.commit('setCvRedirectCache',cvRedirectCache)
}

export const mStStarSynchronizing = (state) => {
  state.commit('setCvSynchronizing',1)
}

export const mStCompleteSynchronizing = (state) => {
  state.commit('setCvSynchronizing',0)
}

export const mStSetCvI18n = (state,cvI18n) => {
  state.commit('setCvI18n',cvI18n)
}

export const mStSetCvResourceFiller = (state, cvResourceFiller) => {
  state.commit('setCvResourceFiller',cvResourceFiller)
}

export const mStSetCvResourceFillerStorage = (state, cvResourceFillerStorage) => {
  state.commit('setCvResourceFillerStorage',cvResourceFillerStorage)
}

let actions = [
  'mStLogin',
  'mStLogout',
  'mStLoadCurrentUser',
  'mStLoadUnauthorizedInteractions',
  'mStReloadUserData',
  'mStReloadMode',
  'mStForceSecureWebAppMode',
  'mStSetSecureWebAppMode',
  'mStSetWebAppMode',
  'mStSetResources',
  'mStSwitchInternalExternalMode',
  'mStLoadCvGeneralServices',
  'mStLoadCvServices',
  'mStLoadCvEnv',
  'mStLoadCvComunicator',
  'mStLoadCvPassport',
  'mStLoadCvRouterCore',
  'mStSetCurrentUser',
  'mStSetCvRedirectCache',
  'mStDestroyAutentication',
  'mStStarSynchronizing',
  'mStCompleteSynchronizing',
  'mStSetCvResourceFiller',
  'mStSetCvResourceFillerStorage'
]

export const mStInyector = (state,object) => {
  object.cStStore = state
  // eslint-disable-next-line
  for (const [prop, val] of Object.entries(state.getters))
    if (object[prop] == null) {
      object[`mGet${trimStart(prop,'c')}`] = () => state.getters[prop]
    }

  for (const action of actions)
    if (object[action] == null)
      object[action] = (param) => state.dispatch(action,param)
}
