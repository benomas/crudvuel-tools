import CvPrivateRouter  from 'src/router/CvPrivateRouter'

export default class CvPrivateInternalRouter extends CvPrivateRouter {
  basePath () {
    return '/admin/'
  }

  pathToLoguedStart () {
    return '/admin/orders'
  }

  async guard (to, from, next) {
    let previus = await super.guard(to, from, next)

    if (previus === this.STOPPED)
      return previus

    this.mStSetWebAppMode('internal')

    if (!this.mGetStWebAppInternalModeSupport()) {
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

  getRoutes () {
    return  [
      {
        path        : this.basePath(),
        component   : () => import('layouts/private-internal-navigation'),
        beforeEnter : async (to, from, next) => this.guard(to, from, next),
        children    : [
          {
            path      : '',
            name      : 'internal-dashboard',
            component : () => import('components/internal-dashboard')
          }
          ,...this.mGetStResources().users.getRoutes()
          ,...this.mGetStResources().roles.getRoutes()
          ,...this.mGetStResources().permissions.getRoutes()
          ,...this.mGetStResources().catPermissionTypes.getRoutes()
          ,...this.mGetStResources().catStates.getRoutes()
          ,...this.mGetStResources().catGenders.getRoutes()
          ,...this.mGetStResources().catColors.getRoutes()
          ,...this.mGetStResources().catFiles.getRoutes()
          ,...this.mGetStResources().files.getRoutes()
          ,...this.mGetStResources().locations.getRoutes()
          ,...this.mGetStResources().catMunicipalities.getRoutes()
          ,...this.mGetStResources().contacts.getRoutes()
        ]
      }
    ]
  }
}
