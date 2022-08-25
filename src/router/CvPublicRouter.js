import CvBaseRouter     from 'src/router/CvBaseRouter'

export default class CvPrivateInternalRouter extends CvBaseRouter {
  basePath () {
    return '/'
  }

  pathToLoguedStart () {
    return '/admin'
  }

  async guard (to, from, next) {
    this.mStSetSecureWebAppMode('public')

    if (this.startsWith(to.fullPath,this.pathToAuth()) && this.mGetStCvPassport().autenticated()) {
      if (!this.mGetStCurrentUser()) {
        if (await this.mStReloadUserData()) {
          this.mStForceSecureWebAppMode()
          next(this.mGetStCurrentCvRouter().pathToLoguedStart())

          return this.STOPPED
        } else {
          this.mStDestroyAutentication()
          next()
          return this.STOPPED
        }
      } else {
        this.mStForceSecureWebAppMode()
        next(this.mGetStCurrentCvRouter().pathToLoguedStart())
        return this.STOPPED
      }
    }

    next()
    return this.STOPPED
  }

  getRoutes () {
    const beforeEnter = {beforeEnter: async (to, from, next) => this.guard(to, from, next)}

    return  [
      {
        path        : this.pathToAuth(),
        component   : () => import('layouts/public-navigation-auth'),
        ...beforeEnter,
        children    : [
          {
            path      : 'session-start',
            name      : 'session-start',
            component : () => import('components/cv-login'),
            ...beforeEnter
          },
          {
            path      : 'register',
            name      : 'register',
            component : () => import('components/cv-register'),
            ...beforeEnter
          },
          {
            path      : 'recover',
            name      : 'recover',
            component : () => import('components/cv-recover'),
            ...beforeEnter
          }
        ]
      },
      {
        path        : this.basePath(),
        redirect    : () => this.pathToUnloguedStart(),
        beforeEnter : async (to, from, next) => this.guard(to, from, next)
      },
      {
        path      : '*',
        component : () => import('pages/404')
      }
    ]
  }
}
