import { mapGetters } from 'vuex'

export default class CvVueCommon {
  vueCommonMaker (app,store) {
    return {
      computed: {
        cI18n () {
          return app.i18n
        },

        cServices () {
          return store.getters.cStCvServices
        },

        cResources () {
          return store.getters.cStResources
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
          return store.getters.cStUnauthorizedInteractions
        },

        //responsive computed
        cCurrentUser: function () {
          return store.getters.cStCurrentUser
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

        cEnv: function () {
          return store.getters.cStCvEnv.environmentProperty('ENV_MODE','production') || null
        },

        cAutoFillableEnabled: function () {
          return store.getters.cStCvEnv.environmentProperty('AUTOFILL_ENABLED',false) || null
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

        cLandscape () {
          return this.cWindowsWidth>this.cWindowsHeight
        },

        cPortrait(){
          return !this.cLandscape
        },

        cMobile(){
          return this.$q.platform.is.mobile
        },

        ...mapGetters(Object.keys(store.getters))
      }
    }
  }
}
