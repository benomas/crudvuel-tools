import {mySubString,myReplace,cvF,cvFixDotDepth,
  mIsArray,mLastArrayPosition,mSwitchArrayPosition,
  mMoveItemUp,mMoveItemDown,cvCaseFixer,mCvDestructuring,
  mCvConditionalDestructuring}                      from 'crudvuel-tools/src/cvHelper'
import {split,camelCase,get,capitalize,upperFirst,round}  from 'lodash'
import CvPermissionComponent                              from 'crudvuel/components/CvPermissionComponent'
import cvCanAccess                                        from 'crudvuel/directives/cvCanAccess'
import cvCantAccess                                       from 'crudvuel/directives/cvCantAccess'
import { mapActions }                                     from 'vuex'

export default function (store,staticMixin = {}) {
  return {
    mixins: [
      staticMixin,
      CvPermissionComponent,
      cvCanAccess,
      cvCantAccess
    ],

    filters: {
      fCapitalize: function (value = null) {
        if (!value)
          return ''

        return capitalize(value)
      },

      fUcfirst: function (value = null) {
        if (!value)
          return ''

        return upperFirst(value)
      },

      fRound: function (value = null,decimals = 2) {
        if (!value)
          return 0

        return round(value,decimals)
      },

      fPercente: function (value = null) {
        if (value == null)
          return ` 0%`

        return ` ${value}%`
      },

      fLaravelDateTimeFormat: function (value = null) {
        if (value == null)
          return ''

        return value.replace(/(.+)?[T|t](.+)?\..*/,`$1 $2`)
      },

      fLaravelDateFormat: function (value = null) {
        if (value == null)
          return ''

        return value.replace(/(.+)?[T|t](.+)?\..*/,`$1`)
      },

      fLaravelTimeFormat: function (value = null) {
        if (value == null)
          return ''

        return value.replace(/(.+)?[T|t](.+)?\..*/,`$2`)
      },

      fFormatMoney: function (v) {
        let decimalCount = 0
        let decimal      = '.'
        let thousands    = ','
        try {
          decimalCount = Math.abs(decimalCount)
          decimalCount = isNaN(decimalCount) ? 2 : decimalCount

          const negativeSign = v < 0 ? '-' : ''

          let i = parseInt(v = Math.abs(Number(v) || 0).toFixed(decimalCount)).toString()
          let j = (i.length > 3) ? i.length % 3 : 0

          return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(v - i).toFixed(decimalCount).slice(2) : '')
        } catch (e) {
          console.log(e)
        }
        return v
      }
    },

    methods: {
      inputFocus (ref,internalRef = 'cInputRef') {
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

      mVueSetter (source = null) {
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

      mAbsoluteNav (resourcePath = '') {
        let segments = split(resourcePath,'.')

        if (segments == null || segments.length === 0)
          return null

        let resourceName = camelCase(segments[0])

        if (this.cResources[resourceName] == null)
          return null

        if (segments.length === 1) {
          if (this.cResources[resourceName].actions.index == null)
            return null

          if (this.cResources[resourceName].actions.index == null)
            return null

          if (!this.mHasSectionPermission(resourceName) || !this.mHasActionPermission(this.cResources[resourceName].actions.index))
            return null

          return this.cStBasePath + this.cResources[resourceName].actions.index.path
        }

        let actionName = camelCase(segments[1])

        if (segments.length === 2) {
          if (this.cResources[resourceName].actions == null)
            return null

          if (this.cResources[resourceName].actions[actionName] == null)
            return null

          if (!this.mHasActionPermission(this.cResources[resourceName].actions[actionName]))
            return null

          return this.cStBasePath + this.cResources[resourceName].actions[actionName].path
        }

        return null
      },

      mIsLast (arrayData = null,current = null) {
        if (arrayData == null || current == null)
          return false

        return current === (arrayData.length - 1)
      },

      mIsBeforeLast (arrayData = null,current = null) {
        if (arrayData == null || current == null)
          return false

        return current === (arrayData.length - 2)
      },

      mIsFirst (arrayData = null,current = null) {
        if (arrayData == null || current == null)
          return false

        return current === 0
      },

      mrLang (source,resource = null) {
        let lResource = this.mResourceAccessing(resource)

        return lResource ? this.$tc('crudvuel.resources.' + lResource.name + '.' + source) : null
      },

      mfLang (field,resource = null) {
        return this.mrLang('fields.' + field,resource)
      },

      mDepthLang (path = '') {
        let rootLang = this.cI18n.messages[this.cI18n.locale]

        return get(rootLang,path)
      },

      mRedirect (newRoute = null) {
        return store.getters.cStCurrentCvRouter.routeRedirect(newRoute || '')
      },

      mRedirectToLoguedStart () {
        return store.getters.cStCurrentCvRouter.routeRedirectToLoguedStart()
      },

      mRedirectToUnloguedStart () {
        return store.getters.cStCurrentCvRouter.routeRedirectToUnloguedStart()
      },

      mDelayer (delayFor = 1) {
        return new Promise((resolve, reject) => {
          this.$nextTick().then(() => this.$nextTick().then(() => this.$nextTick().then(() => {
            setTimeout(() => {
              resolve()
            }, delayFor)
          })))
        })
      },

      mDepthSet (target = null,segments = null,value = null) {
        if (!target || !segments)
          return target

        let tempRef = target

        for (let i = 0; i < segments.length - 1; i++)
          if ((tempRef = tempRef[segments[i]]) == null)
            return target

        tempRef[segments[segments.length - 1]] = value

        return target
      },

      mDepthget (target = null,segments = null) {
        if (!target || !segments)
          return target

        let tempRef = target

        for (let i = 0; i < segments.length; i++)
          if ((tempRef = tempRef[segments[i]]) == null)
            return target

        return tempRef
      },

      mGoHome () {
        if (store.getters.cStCurrentCvRouter.routeRedirectToHome != null)
          store.getters.cStCurrentCvRouter.routeRedirectToHome()
        else
          store.getters.cStCurrentCvRouter.routeRedirectToLoguedStart()
      },

      mRandomKey () {
        return Math.random() * 100000000000000000
      },

      mCaseFixer: cvCaseFixer,

      ...mapActions(Object.keys(store._actions)),
      mySubString,
      myReplace,
      cvF,
      mIsArray,
      mLastArrayPosition,
      mSwitchArrayPosition,
      mMoveItemUp,
      mMoveItemDown,
      mCvDestructuring,
      mCvConditionalDestructuring
    },

    directives: {
      cvCanAccess,
      cvCantAccess
    }
  }
}
