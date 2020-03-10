import {mySubString,myReplace,cvF,cvFixDotDepth}   from 'crudvuel-tools/src/cvHelper'

export default class CvVueCommon {
  vueCommonMaker (app, router, store, Vue, cRouter, cvGlobDep, resources) {
    return {
      data: function () {
        return {
          cvGlobDep,
          cvComunicator : cvGlobDep.globals.cvComunicator,
          i18n          : app.i18n,
          services      : cvGlobDep.globals.cvComunicator.resources,
          resources     : resources,
          router        : cRouter,
          lodash        : cvGlobDep.globals.lodash
        }
      },

      computed: {
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

        cActionContentHeightFix: function () {
          if (this.cWindowsHeight < 200)
            return 'auto'

          return ( this.cWindowsHeight - 135 + this.cSmActionContentHeightFix) + 'px'
        },

        cActionContentHeightFixNoButtons: function () {
          if (this.cWindowsHeight < 200)
            return 'auto'

          return ( this.cWindowsHeight - 135 + this.cSmActionContentHeightFix) + 'px'
        },

        cSmActionContentHeightFix () {
          return this.cLtmd ? 65 : 0
        },

        cGtxs: function () {
          return this.cWindowsWidth >= 576
        },

        cGtsm: function () {
          return this.cWindowsWidth >= 768
        },

        cGtmd: function () {
          return this.cWindowsWidth >= 992
        },

        cGtlg: function () {
          return this.cWindowsWidth >= 1200
        },

        cLtxs: function () {
          return this.cWindowsWidth < 360
        },

        cLtsm: function () {
          return this.cWindowsWidth < 576
        },

        cLtmd: function () {
          return this.cWindowsWidth < 768
        },

        cLtlg: function () {
          return this.cWindowsWidth < 992
        },

        cLtxg: function () {
          return this.cWindowsWidth < 1200
        },

        cXs: function () {
          return this.cWindowsWidth < 576
        },

        cSm: function () {
          return this.cWindowsWidth >= 576 && this.cWindowsWidth < 768
        },

        cMd: function () {
          return this.cWindowsWidth >= 768 && this.cWindowsWidth < 992
        },

        cLg: function () {
          return this.cWindowsWidth >= 992 && this.cWindowsWidth < 1200
        },

        cXg: function () {
          return this.cWindowsWidth >= 1200
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
          if (this.cEnv == null || this.cEnv !== 'dev')
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
      },

      methods: {
        inputFocus: function (ref,internalRef = 'cInputRef') {
          if (this.$refs[ref] != null) {
            if (internalRef && this.$refs[ref][internalRef] != null) {
              if (typeof this.$refs[ref][internalRef].focus === 'function')
                this.$refs[ref][internalRef].focus()
              else {
                if (typeof this.$refs[ref][internalRef].$el.focus === 'function')
                  this.$refs[ref][internalRef].$el.focus()
              }
            } else {
              if (this.$refs[ref].focus != null)
                this.$refs[ref].focus()
              else
                this.$refs[ref].$el.focus()
            }
          }
        },

        mVueSetter: function (source = null) {
          if (!source || typeof source.row === 'undefined' || typeof source.cvColumnMap === 'undefined')
            return false
          let destination = source.destination || 'row'
          if (typeof destination === 'string')
            destination = cvFixDotDepth(this,destination)

          let mapKeys = Object.keys(source.cvColumnMap)
          for (let i = 0; i < mapKeys.length; i++) {
            if (source.row && typeof source.row[mapKeys[i]] !== 'undefined')
              this.$set(destination, source.cvColumnMap[mapKeys[i]], source.row[mapKeys[i]])
            else
              this.$set(destination, source.cvColumnMap[mapKeys[i]], null)
          }
        },

        transformResponse (response) {
          return response.data.data || response.data
        },
        mySubString,
        myReplace,
        cvF,
      }
    }
  }
}
