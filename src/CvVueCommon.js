import { mapGetters } from 'vuex'

export default class CvVueCommon {
  vueCommonMaker (app, router, store, Vue, cRouter, cvGlobDep, resources) {
    return {
      data () {
        return {
          cvGlobDep,
          cvComunicator : cvGlobDep.globals.cvComunicator,
          i18n          : app.i18n,
          services      : cvGlobDep.globals.cvComunicator.resources,
          resources     : resources,
          router        : cRouter
        }
      },

      computed: {
        cComunicator () {
          return cvGlobDep.globals.cvComunicator
        },

        cI18n () {
          return app.i18n
        },

        cServices () {
          return cvGlobDep.globals.cvComunicator.resources
        },

        cResources () {
          return resources
        },

        cResourcesPerSection () {
          if (!this.cResources)
            return {}

          let sections  = {}

          for (const [resource, resourceDef] of Object.entries(this.cResources)){

            if (resourceDef.resourceSections == null)
              continue

            for (const section of resourceDef.resourceSections) {
              if (sections[section] == null)
                sections[section] = {'resources':{}}

              sections[section]['resources'][resource] = true
            }
          }

          return sections
        },

        cUnauthorizedInteractions: function () {
          return store.state.unauthorizedInteractions
        },

        //responsive computed
        cCurrentUser: function () {
          return store.state.currentUser
        },

        cWindowsWidth: function () {
          return this.$q.screen.width || 0
        },

        cWindowsHeight: function () {
          return this.$q.screen.height || 0
        },

        cGtxs: function () {
          return this.$q.screen.gt.xs
        },

        cGtsm: function () {
          return this.$q.screen.gt.sm
        },

        cGtmd: function () {
          return this.$q.screen.gt.md
        },

        cGtlg: function () {
          return this.$q.screen.gt.lg
        },

        cLtxs: function () {
          return this.$q.screen.lt.xs
        },

        cLtsm: function () {
          return this.$q.screen.lt.sm
        },

        cLtmd: function () {
          return this.$q.screen.lt.md
        },

        cLtlg: function () {
          return this.$q.screen.lt.lg
        },

        cLtxg: function () {
          return this.$q.screen.lt.xl
        },

        cXs: function () {
          return this.$q.screen.xs
        },

        cSm: function () {
          return this.$q.screen.sm
        },

        cMd: function () {
          return this.$q.screen.md
        },

        cLg: function () {
          return this.$q.screen.lg
        },

        cXg: function () {
          return this.$q.screen.xl
        },

        cColSize: function () {
          if (this.cXs)
            return 'xs'
          if (this.cSm)
            return 'sm'
          if (this.cMd)
            return 'md'
          if (this.cLg)
            return 'lg'
          return 'xg'
        },

        cCurrentRoute: function () {
          if (this.$route != null)
            return this.$route.path
          return null
        },

        cCvPassport: function () {
          return cvGlobDep.globals.cvPassport
        },

        cEnv: function () {
          return cvGlobDep.globals.cvEnv.environmentProperty('ENV_MODE','production') || null
        },

        cAutoFillableEnabled: function () {
          return cvGlobDep.globals.cvEnv.environmentProperty('AUTOFILL_ENABLED',false) || null
        },

        cAutoFillable: function () {
          if (this.cEnv == null)
            return false
          if (this.cAutoFillableEnabled == null || this.cAutoFillableEnabled !== true)
            return false
          if (
            this.cResource == null ||
            this.cResource.lang == null ||
            this.cResource.lang.fields ==  null ||
            !this.cpStaGenAction ||
            !this.cpStaGenAction.name ||
            this.cpStaGenAction.name !== 'create'

          )
            return false
          return true
        },

        cClereable: function () {
          if (
            this.cResource == null ||
            this.cResource.lang == null ||
            this.cResource.lang.fields ==  null ||
            !this.cpStaGenAction ||
            !this.cpStaGenAction.name ||
            this.cpStaGenAction.name === 'show'
          )
            return false
          return true
        },

        cRootPath: function () {
          return '/'
        },

        cExternalPriaveRootPath () {
          return cvGlobDep.globals.externalPriaveRootPath()
        },

        cInternalPriaveRootPath () {
          return cvGlobDep.globals.internalPriaveRootPath()
        },

        ...mapGetters(Object.keys(store.getters))
      }
    }
  }
}
