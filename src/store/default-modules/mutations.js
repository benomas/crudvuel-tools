export const setCurrentUser = (state,currentUser) => {
  state.currentUser = currentUser
}

export const deleteCurrenUser = (state) => {
  state.currentUser = null
}

export const setUnauthorizedInteractions = (state,unauthorizedInteractions) => {
  state.unauthorizedInteractions = unauthorizedInteractions
}

export const deleteUnauthorizedInteractions = (state) => {
  state.unauthorizedInteractions = null
}

export const deleteUserData = (state) => {
  deleteCurrenUser(state)
  deleteUnauthorizedInteractions(state)
}

export const setWindowSize = (state,windowSize) => {
  state.windowSize = windowSize
}

export const deleteWindowSize = (state) => {
  state.windowSize = null
}

export const setWebAppMode = (state,webAppMode = null) => {
  if (['internal','external','public'].includes(webAppMode))
    state.webAppMode = webAppMode
  else
    state.webAppMode = null
}

export const setResources = (state,resources = null) => {
  state.resources = resources
}

export const setCvEnv = (state,cvEnv = null) => {
  state.cvEnv = cvEnv
}

export const setCvComunicator = (state,cvComunicator = null) => {
  state.cvComunicator = cvComunicator
}

export const setCvPassport = (state,cvPassport = null) => {
  state.cvPassport = cvPassport
}

export const setCvRouterCore = (state,cvRouterCore = null) => {
  state.cvRouterCore = cvRouterCore
}

export const setCvGeneralServices = (state,cvGeneralServices = null) => {
  state.cvGeneralServices = cvGeneralServices
}

export const setCvServices = (state,cvServices = null) => {
  state.cvServices = cvServices
}

export const setCvRedirectCache = (state,cvRedirectCache = null) => {
  state.cvRedirectCache = cvRedirectCache
}

export const setCvSynchronizing = (state,cvSynchronizing = null) => {
  state.cvSynchronizing = cvSynchronizing
}

export const setCvI18n = (state,cvI18n = null) => {
  state.cvI18n = cvI18n
}

export const setCvResourceFiller = (state,cvResourceFiller = null) => {
  state.cvResourceFiller = cvResourceFiller
}

export const setCvResourceFillerStorage = (state,cvResourceFillerStorage = null) => {
  state.cvResourceFillerStorage = cvResourceFillerStorage
}
