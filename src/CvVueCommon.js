import {mySubString,myReplace,cvF,cvFixDotDepth}   from 'crudvuel-tools/src/cvHelper'

export default class CvVueCommon{
  vueCommonMaker (app, router, store, Vue, cRouter, cvGlobDep, resources) {
    return {
      data: function () {
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
        cWindowsHeigth: function () {
          return this.$q.screen.width.heigth || 0
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
        cAutofillEnabled: function () {
          return cvGlobDep.globals.cvEnv.environmentProperty('AUTOFILL_ENABLED',false) || null
        },
        cAutoFill: function () {
          if (this.cEnv == null || this.cEnv !== 'dev')
            return false
          if (this.cAutofillEnabled == null || this.cAutofillEnabled !== true)
            return false
          if (
            this.cResource == null ||
            this.cResource.lang == null ||
            this.cResource.lang.fields ==  null ||
            !this.cAction ||
            !this.cAction.name ||
            this.cAction.name !== 'create'

          )
            return false
          return true
        }
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
        hasSpecialPermission (special) {
          return !this.cUnauthorizedInteractions ||
            typeof this.cUnauthorizedInteractions['special'] === 'undefined' ||
            typeof this.cUnauthorizedInteractions['special'][special] === 'undefined'
        },
        hasSectionPermission (section) {
          return !this.cUnauthorizedInteractions ||
            typeof this.cUnauthorizedInteractions['section'] === 'undefined' ||
            typeof this.cUnauthorizedInteractions['section'][section + '-section'] === 'undefined'
        },
        hasResourcePermission (resource) {
          return !this.cUnauthorizedInteractions ||
            typeof this.cUnauthorizedInteractions['resource'] === 'undefined' ||
            typeof this.cUnauthorizedInteractions['resource'][this.lodash.kebabCase(resource)] === 'undefined'
        },
        hasActionPermission (action) {
          if (typeof action === 'undefined')
            action = this.cAction || null
          if (!action)
            return true
          return !this.cUnauthorizedInteractions ||
            typeof this.cUnauthorizedInteractions['action'] === 'undefined' ||
            typeof this.cUnauthorizedInteractions['action'][this.lodash.kebabCase(action.resource.name) + '.' + this.lodash.kebabCase(action.name)] === 'undefined'
        },
        hasPermission: function (action,resource = null,excludes = null) {
          resource = resource || this.cResource
          excludes = excludes || this.cExcludeActions
          return excludes.indexOf(action,excludes) < 0 &&
            this.mResorceAction(action,resource) &&
            this.hasActionPermission(resource.actions[action])
        },
        getFirstFileBySlug: function (row = null,owner = null,slug = null,property = null) {
          if (row == null || owner == null || slug == null)
            return null
          if (row['files'] != null) {
            owner = row
          } else {
            if (row[owner] != null)
              owner = row[owner]
            else
              return null
          }

          if (owner.files == null || owner.files.length === 0)
            return null
          for (let i = 0; i < owner.files.length; i++)
            if (owner.files[i].cat_file.slug === slug) {
              if (property) {
                if (owner.files[i][property] != null)
                  return owner.files[i][property]
                else
                  return null
              }
              return owner.files[i]
            }
          return null
        },
        getFirstPathFileBySlug: function (row = null,owner = null,slug = null) {
          return this.getFirstFileBySlug(row,owner,slug,'absolute_path')
        },
        getLogoFilePath: function (row = null) {
          return this.getFirstPathFileBySlug(row,'company','company-logo')
        },
        getCvFilePath: function (row) {
          return this.getFirstPathFileBySlug(row,'candidate','candidate-cv')
        },
        getRequestFilePath: function (row) {
          return this.getFirstPathFileBySlug(row,'job','company-request')
        },
        getPhotoFilePath: function (row) {
          return this.getFirstPathFileBySlug(row,'candidate','candidate-photographi')
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
        mySubString,
        myReplace,
        cvF,
      }
    }
  }
}
