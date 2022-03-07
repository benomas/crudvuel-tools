import CvNotify               from 'src/customs/crudvuel/themes/quasar/components/others/CvNotify'
import {cvAuthHelper}         from 'src/customs/crudvuel/cvHelper'
import CvPermissionComponent  from 'crudvuel-tools/src/components/CvPermissionComponent'
import {startsWith}           from 'lodash'

export default class CvBaseRouter {
  constructor (store) {
    store.dispatch('mStInyector',this)
    this.CONTINUE             = true
    this.STOPPED              = false
    this.UNDETERMINED         = null
    this.resourceRoutes       = []
    this.CvNotify             = CvNotify
    this.cvAuthHelperClousure = cvAuthHelper(this)
    this.vueRouter            = null
    this.CvRouterCore         = null
    this.loadPermissionValidators()
  }

  actionWithoutResourceValidation () {
    return [
      'profile'
    ]
  }

  loadPermissionValidators = () => {
    for (const [method, implementation] of Object.entries(CvPermissionComponent.methods))
      if (this[method] == null)
        this[method] = implementation
  }

  getCvApp () {
    return this.getVueRouter().app
  }

  getCvAuthHelperClousure () {
    return this.cvAuthHelperClousure
  }

  getVueRouter () {
    if (this.vueRouter != null)
      return this.vueRouter
  }

  getCvRouterCore () {
    return this.CvRouterCore
  }

  getCurrentCvRouter () {
    if (!this.getCvRouterCore())
      return null

    if (!this.getDinamicRoutes())
      return null

    if (this.getDinamicRoutes()[this.mGetStWebAppMode()] == null)
      return null

    return this.getDinamicRoutes()[this.mGetStWebAppMode()]
  }

  setVueRouter (vueRouter = null) {
    this.vueRouter = vueRouter

    return this
  }

  setCvRouterCore (CvRouterCore = null) {
    this.CvRouterCore = CvRouterCore

    return this
  }

  basePath () {
    return '/'
  }

  pathToLoguedStart () {
    return '/'
  }

  pathToHome () {
    return this.basePath()
  }

  pathToUnloguedStart () {
    return '/auth/session-start'
  }

  pathToAuth () {
    return '/auth'
  }

  pathToRecover () {
    return `${this.pathToAuth()}/recover`
  }

  pathToRegister () {
    return `${this.pathToAuth()}/register`
  }

  pathToLogin () {
    return `${this.pathToAuth()}/session-start`
  }

  routeRedirect (newRoute = null) {
    newRoute = newRoute || ''

    this.getVueRouter().push(newRoute)

    return this
  }

  routeRedirectToHome () {
    this.routeRedirect(this.mGetStCurrentCvRouter().pathToHome())

    return this
  }

  routeRedirectToLoguedStart () {
    this.routeRedirect(this.mGetStCurrentCvRouter().pathToLoguedStart())

    return this
  }

  routeRedirectToUnloguedStart () {
    this.routeRedirect(this.mGetStCurrentCvRouter().pathToUnloguedStart())

    return this
  }

  unauthorizedInteractionsFlow (to, from, next) {
    // if user permission was loaded
    if (this.mGetStUnauthorizedInteractions()) {
      // if user have permission for access to the next route

      if (to?.meta?.cvAction == null)
        return true

      if (this.mGetStCvAppCaller().mHasActionPermission(to.meta.cvAction,null,!this.actionWithoutResourceValidation().includes(to.meta.cvAction.name))) {
        return this.autenticated(to, from, next)
      }

      this.mStLoadUnauthorizedInteractions()

      return true
    }

    this.mStLoadUnauthorizedInteractions()
  }

  modeFlow (mode) {
    if (mode === 'internal' && !this.mGetStWebAppInternalModeSupport()) {
      this.mStLoadUnauthorizedInteractions().then(() => {
        this.routeRedirectToLoguedStart()
      })

      return true
    }

    if (mode === 'external' && !this.mGetStWebAppExternalModeSupport()) {
      this.mStLoadUnauthorizedInteractions().then(() => {
        this.routeRedirectToLoguedStart()
      })
      return true
    }

    return false
  }

  autenticated (to, from, next) {
    if (to.fullPath === this.pathToLogin()) {
      next(this.mGetStCurrentCvRouter().pathToLoguedStart())

      return this.STOPPED
    }

    next()

    return this.STOPPED
  }

  noAutenticated (to, from, next) {
    if (to.fullPath === this.pathToLogin()) {
      return this.STOPPED
    }

    next(this.mGetStCurrentCvRouter().pathToUnloguedStart())

    return this.STOPPED
  }

  async guard (to, from, next) {
    next()

    return this.STOPPED
  }

  async loadAndValidatePermissions (to, from, next) {
    await this.mStLoadUnauthorizedInteractions()

    if (to?.meta?.cvAction == null)
      return this.CONTINUE
    // if user doest have  permissions for access to the next route

    if (!this.mHasActionPermission(to.meta.cvAction,null,!this.actionWithoutResourceValidation().includes(to.meta.cvAction.name))) {
      //next(this.mGetStCurrentCvRouter().pathToLoguedStart())

      return this.STOPPED
    }

    return this.CONTINUE
  }

  async loadAndValidateUser (to, from, next) {
    //if current user is defined
    if (!this.mGetStCurrentUser())
      await this.mStReloadUserData()

    if (this.mGetStCurrentUser()) {
      // if user permission was loaded
      if (this.mGetStUnauthorizedInteractions()) {
        // if user doest have  permissions for access to the next route
        if (to?.meta?.cvAction == null)
          return this.CONTINUE

        if (!this.mHasActionPermission(to.meta.cvAction,null,!this.actionWithoutResourceValidation().includes(to.meta.cvAction.name)))
          return this.loadAndValidatePermissions(to, from, next)

        return this.CONTINUE
      }

      return this.loadAndValidatePermissions(to, from, next)
    }

    return this.UNDETERMINED
  }

  startsWith (...params) {
    return startsWith(...params)
  }

  asyncRoutesLoader (to, from, next) {
    // here you can put logic for load async routes
    return this.CONTINUE
  }

  fakeRoute () {
    return '/cache-redirect/'
  }

  beforeEach (to, from, next) {
    next()
  }
}
