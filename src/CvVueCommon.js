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

          for (const [resource, resourceDef] of Object.entries(this.cResources)) {
            if (resourceDef.resourceSections == null)
              continue

            for (const section of resourceDef.resourceSections) {
              if (sections[section] == null)
                sections[section] = {'resources': {}}

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

        cShowDevButtons: function () {
          if (this.cEnv == null)
            return false

          let devButtonsEnabled = store.getters.cStCvEnv.environmentProperty('DEV_BUTTONS_ENABLED',false)

          if (devButtonsEnabled !== true)
            return false

          if (this.cClereable !== true)
            return false

          return true
        },

        cAutoFillable: function () {
          return this.cShowDevButtons
        },

        cAutoReseable: function () {
          return this.cShowDevButtons
        },

        cAutoClearable: function () {
          return this.cShowDevButtons
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
          return this.cWindowsWidth >  this.cWindowsHeight
        },

        cPortrait () {
          return !this.cLandscape
        },

        cMobile () {
          return this.$q.platform.is.mobile
        },

        cQuery () {
          return this.$route.query
        },

        cLocationProtocol () {
          return location == null || location.protocol == null ? 'https' : location.protocol
        },

        cLocationPort () {
          return location == null || location.port == null ? '' : location.port
        },

        cDocumentDomain () {
          return document == null || document.domain == null ? 'localhost' : document.domain
        },

        cBaseUrl () {
          return `${this.cLocationProtocol}//${this.cDocumentDomain}:${this.cLocationPort}/`
        },

        cLastClickerComponent () {
          if(this.lastClickerComponent == null)
            return null

          return this.lastClickerComponent
        },

        cUserProfileImg () {
          let defaultImg = 'statics/profile.png'

          if (this.$store == null || this.$store.state == null || this.$store.state.currentUser == null)
            return defaultImg

          if (this.$store.state.currentUser.related_files == null)
            return defaultImg

          for (const file of this.$store.state.currentUser.related_files) {
            if (file.cat_file == null)
              continue

            if (file.cat_file.slug === 'profile-img')
              return file.absolute_path
          }

          return defaultImg
        },

        cValidLocales () {
          return store.getters.cStValidLocales()
        },

        cValidLocalesOptions () {
          return this.cValidLocales.map(localOption => (
            {value:localOption, label: localOption}
          ))
        },

        cLocale() {
          return store.getters.cStLocale()
        },

        cStrLocale() {
          return store.getters.cStStrLocale()
        },

        ...mapGetters(Object.keys(store.getters))
      },
    }
  }
}
