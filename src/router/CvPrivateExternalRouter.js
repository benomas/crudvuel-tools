import CvPrivateRouter    from 'src/router/CvPrivateRouter'
export default class CvPrivateExternalRouter extends CvPrivateRouter {
  basePath () {
    return '/home/'
  }

  pathToLoguedStart () {
    if (!this.mGetStCurrentUser())
      return this.pathToHome()

    return `/home/users/${this.mGetStCurrentUser().id}/profile`
  }

  async guard (to, from, next) {
    let previus = await super.guard(to, from, next)

    if (previus === this.STOPPED)
      return previus

    this.mStSetWebAppMode('external')

    if (!this.mGetStWebAppExternalModeSupport()) {
      this.getCvRouterCore().routerSwitch(to)
      next(this.mGetStCurrentCvRouter().pathToLoguedStart())

      return this.STOPPED
    }

    if (!this.mHasActionPermission(this.mFixActionObject(to.name))){
      next(this.mGetStCurrentCvRouter().pathToLoguedStart())

      return this.STOPPED
    }

    next()

    return this.CONTINUE
  }

  getRoutes () { /*
    let routeNameFix = (route) => {
      return {...route,...{name: `external-${route.name}`}}
    }*/
    return  [
      {
        path        : this.basePath(),
        component   : () => import('layouts/private-external-navigation'),
        beforeEnter : async (to, from, next) => this.guard(to, from, next),
        children    : [
          {...this.mGetStResources().users.getRoute('users.profile','external-users.profile')}
        ]
      }
    ]
  }
  /*
  asyncRoutesLoader (to, from, next) {
    if (this.startsWith(to.fullPath,this.basePath())) {
      let externalRoutes = this.getVueRouter().options.routes.find(r => r.path === this.basePath())
      let oldRoutes = externalRoutes.children
      let newRoutes

      if (this.mGetStUserTreeComponents())
        newRoutes = this.mGetStUserTreeComponents().filter(r => {
          if (oldRoutes.find(r2 => r2.path === r.path) != null)
            return false

          return true
        })

      if (newRoutes != null && newRoutes.length) {
        externalRoutes.children = [...newRoutes]
        this.getVueRouter().addRoutes([externalRoutes])
        this.mStSetCvRedirectCache(to.fullPath)
        next(this.fakeRoute())

        return this.STOPPED
      }
    }

    return this.CONTINUE
  }*/

  beforeEach (to, from, next) {
    if (this.mGetStCvSynchronizing()) {
      this.CvNotify.createWarning(this.mGetStDepthLang()('crudvuel.labels.sync_in_progress'))

      return this.STOPPED
    }
    next()
    return this.STOPPED
  }
}
