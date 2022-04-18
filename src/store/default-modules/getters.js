import {get} from 'lodash'
export const cStResources                    = state => state.resources
export const cStCurrentUser                  = state => state.currentUser
export const cStUnauthorizedInteractions     = state => state.unauthorizedInteractions
export const cStWindowSize                   = state => state.windowSize
export const cStWebAppMode                   = state => state.webAppMode
export const cStCvEnv                        = state => state.cvEnv
export const cStCvComunicator                = state => state.cvComunicator
export const cStCvPassport                   = state => state.cvPassport
export const cStCvGeneralServices            = state => state.cvGeneralServices
export const cStCvServices                   = state => state.cvServices
export const cStCvRouterCore                 = state => state.cvRouterCore
export const cStCvRedirectCache              = state => state.cvRedirectCache
export const cStCvSynchronizing              = state => state.cvSynchronizing
export const cStCvI18n                       = state => state.cvI18n
export const cStCvResourceFiller             = state => state.cvResourceFiller
export const cStCvResourceFillerStorage      = state => state.cvResourceFillerStorage
export const cStCvLoadingPublicAsyncRoutes   = state => state.cvLoadingPublicAsyncRoutes
export const cStCvLoadingExternalAsyncRoutes = state => state.cvLoadingExternalAsyncRoutes
export const cStCvLoadingInternalAsyncRoutes = state => state.cvLoadingInternalAsyncRoutes

export const cStWebAppInternalModeSupport = (state,getters) => {
  if (!getters.cStCurrentUser)
    return false

  if (getters.cStCurrentUser.has_internal_access == null || !getters.cStCurrentUser.has_internal_access)
    return false

  return true
}

export const cStWebAppExternalModeSupport = (state,getters) => {
  if (!getters.cStCurrentUser)
    return false

  if (getters.cStCurrentUser.has_external_access == null || !getters.cStCurrentUser.has_external_access)
    return false

  return true
}

export const cStWebAppMultiModeSupport = (state,getters) => {
  if (getters.cStWebAppInternalModeSupport && getters.cStWebAppExternalModeSupport)
    return true

  return false
}

export const cStCurrentCvRouter = (state,getters) => {
  if (!getters.cStCvRouterCore)
    return null

  return getters.cStCvRouterCore.getCurrentCvRouter()
}

export const cStLoguedStart = (state,getters) => {
  if (!getters.cStCurrentCvRouter)
    return null

  return getters.cStCurrentCvRouter.pathToLoguedStart()
}

export const cStUnloguedStart = (state,getters) => {
  if (!getters.cStCurrentCvRouter)
    return null

  return getters.cStCurrentCvRouter.pathToUnloguedStart()
}

export const cStInternalBasePath = (state,getters) => {
  if (!getters.cStCvRouterCore)
    return ''

  return getters.cStCvRouterCore.getDinamicRoutes().external.basePath()
}

export const cStBasePath = (state,getters) => {
  if (!getters.cStCurrentCvRouter)
    return ''

  return getters.cStCurrentCvRouter.basePath()
}

export const cStDepthLang = (state,getters) => (path) => {
  if (!getters.cStCvI18n)
    return ''

  let rootLang = getters.cStCvI18n.messages[getters.cStCvI18n.locale]

  return get(rootLang,path)
}
