//This is the active router
import Vue                        from 'vue'
import VueRouter                  from 'vue-router'
import CvBaseRouter               from 'src/router/CvBaseRouter'
import CvPublicRouter             from 'src/router/CvPublicRouter'
import CvPrivateInternalRouter    from 'src/router/CvPrivateInternalRouter'
import CvPrivateExternalRouter    from 'src/router/CvPrivateExternalRouter'
Vue.use(VueRouter)

export default class CvRouter extends CvBaseRouter {
  constructor (store) {
    super(store)
    this.dinamicRoutes = {
      'internal' : new CvPrivateInternalRouter(this.cStStore),
      'external' : new CvPrivateExternalRouter(this.cStStore),
      'public'   : new CvPublicRouter(this.cStStore)
    }
    this.routerSwitcherFlow = {}
  }

  vueRouterSpread () {
    // eslint-disable-next-line
    for (const [kind, router] of Object.entries(this.getDinamicRoutes()))
      router.setVueRouter(this.vueRouter).setCvRouterCore(this)

    return this
  }

  getDinamicRoutes () {
    return this.dinamicRoutes
  }

  inyecToStore () {
    this.mStLoadCvRouterCore(this.getCvRouterCore())

    return this
  }

  build () {
    this.setVueRouter(new VueRouter({
      mode           : process.env.VUE_ROUTER_MODE,
      base           : process.env.VUE_ROUTER_BASE,
      scrollBehavior : () => ({ y: 0 }),
      routes         : [
        ...this.getDinamicRoutes().internal.getRoutes(),
        ...this.getDinamicRoutes().external.getRoutes(),
        ...this.getDinamicRoutes().public.getRoutes()
      ]
    }))

    this.getVueRouter().beforeEach(async (to, from, next) => {
      //fix cvRedirectCache hack required for async routes
      if (to.fullPath === this.fakeRoute()) {
        if (this.mGetStCvRedirectCache() != null) {
          next(this.mGetStCvRedirectCache())
          this.mStSetCvRedirectCache(null)
        } else
          next(this.getCurrentCvRouter().pathToLoguedStart())

        return this.STOPPED
      }

      //dinamic routes inyection
      // eslint-disable-next-line
      for (const [type, dinamicRouter] of Object.entries(this.getDinamicRoutes()))
        if (dinamicRouter.asyncRoutesLoader(to, from, next) === this.STOPPED)
          return this.STOPPED

      let cvAction = to?.meta?.cvAction

      if (cvAction) {
        let state = await this.loadAndValidateUser(to, from, next)

        if (state !== this.CONTINUE) {
          next(this.mGetStCurrentCvRouter().pathToLoguedStart())
        } else {
          next()
        }

        return this.STOPPED
      }

      next()
    })

    return this.setCvRouterCore(this).vueRouterSpread().inyecToStore()
  }

  getRouterSwitcherFlow () {
    return this.routerSwitcherFlow
  }

  resetRouterSwitcherFlow () {
    this.routerSwitcherFlow = {}

    return this
  }

  async routerSwitch (to = null) {
    if (!to)
      return

    if (this.getRouterSwitcherFlow()[to.fullPath] == null)
      this.routerSwitcherFlow[to.fullPath] = Object.keys(this.getDinamicRoutes())

    this.routerSwitcherFlow[to.fullPath] = this.routerSwitcherFlow[to.fullPath].filter(router => router !== this.mGetStWebAppMode())

    this.mStSetWebAppMode(this.getRouterSwitcherFlow()[to.fullPath][0])
  }
}
