import {mySubString,myReplace,cvF,cvFixDotDepth}    from 'crudvuel-tools/src/cvHelper'
import {split,camelCase}                            from 'lodash'
import CvPermissionComponent                        from 'crudvuel/components/CvPermissionComponent'
import cvCanAccess                                  from 'crudvuel/directives/cvCanAccess'

export default function (staticMixin = {}) {
  return {
    mixins: [
      staticMixin,
      CvPermissionComponent,
      cvCanAccess
    ],

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
          if(this.cResources[resourceName].actions.index == null)
            return null

          if(this.cResources[resourceName].actions.index == null)
            return null

          if (!this.hasResourcePermission(resourceName) || !this.hasActionPermission(this.cResources[resourceName].actions.index))
            return null

          return this.cRootPath + this.cResources[resourceName].actions.index.path
        }

        let actionName = camelCase(segments[1])

        if (segments.length === 2) {
          if(this.cResources[resourceName].actions == null)
            return null

          if(this.cResources[resourceName].actions[actionName] == null)
            return null

          if (!this.hasActionPermission(this.cResources[resourceName].actions[actionName]))
            return null

          return this.cRootPath + this.cResources[resourceName].actions[actionName].path
        }

        return null
      },

      mySubString,
      myReplace,
      cvF,
    },

    directives: {
      cvCanAccess
    }
  }
}
