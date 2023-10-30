<script>
import {kebabCase,camelCase} from 'lodash'
export default {
  methods: {
    mGetUnauthorizedInteractions (special) {
      if (this.$store != null)
        return this.$store.getters.cStUnauthorizedInteractions

      if (this.cStStore != null)
        return this.cStStore.getters.cStUnauthorizedInteractions

      return null
    },

    mResourceByStrings(resourceSegment = null) {
      if (
        this.cResources != null &&
        this.cResources[resourceSegment] != null
      )
        return this.cResources[resourceSegment]

      return null
    },

    mActionResourceByStrings(actionSegment = null,resourceSegment = null) {
      const resourceByStrings = this.mResourceByStrings(resourceSegment)

      if (resourceByStrings == null)
        return null

      if (resourceByStrings['actions'][actionSegment] != null)
        return resourceByStrings['actions'][actionSegment]

      return null
    },

    mFixResourceObject (resource = null,action) {
      if (resource != null && typeof resource === 'object')
        return resource

      if (resource == null){
        if (this.cResource != null)
          return this.cResource

        if (this.cpStaInsResource != null)
          return this.cpStaInsResource

        return null
      }

      if (typeof resource === 'string') {
        return this.mResourceByStrings(resource)
      }

      return null
    },

    mFixActionObject (action = null,resource = null) {
      if (action != null && typeof action === 'object')
        return action

      if (action == null) {
        if (this.action  !== undefined )
          return this.action

        if (this.cAction  !== undefined )
          return this.cAction

        if (this.cpStaGenAction !== undefined)
          return this.cpStaGenAction

        return null
      }

      if (typeof action === 'string') {
        let fixedResource = null

        let actionSegments = action.split('.')

        if(actionSegments.length > 2)
          return true

        if(actionSegments.length === 2)
          return this.mActionResourceByStrings(actionSegments[1],actionSegments[0])

        fixedResource = this.mFixResourceObject(resource,action)

        if (
          fixedResource == null ||
          fixedResource.actions == null ||
          fixedResource.actions[action] == null
        ){
          return null
        }

        return fixedResource.actions[action]
      }

      return action
    },

    mHasSpecialPermission (special) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['special'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['special'][special] === 'undefined'
    },

    mHasSectionPermission (section) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['section'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['section'][section + '-section'] === 'undefined'
    },

    mHasResourcePermission (resource) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['resource'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['resource'][kebabCase(resource)] === 'undefined'
    },

    mHasActionPermission (action = null, resource = null,preventAccessWithoutResourceAccess = true) {
      const fixedActionObject = this.mFixActionObject(action,resource)

      if(typeof action === 'string' && typeof resource === 'string'){
        if (
          fixedActionObject.getStrictResourceActionPermission() &&
          preventAccessWithoutResourceAccess &&
          !this.mHasResourcePermission(resource)
        )
          return false

        return !this.mGetUnauthorizedInteractions() ||
          this.mGetUnauthorizedInteractions()['action'] === undefined ||
          (
            this.mGetUnauthorizedInteractions()['action'][`${resource}.${action}`]  === undefined &&
            this.mGetUnauthorizedInteractions()['action'][`${resource}.${kebabCase(action)}`]  === undefined
          )
      }

      if (
        fixedActionObject == null ||
        fixedActionObject.getName == null ||
        fixedActionObject.getResourceName == null
      )
        return true

      const actionSegment   = camelCase(fixedActionObject.getName())
      const resourceSegment = kebabCase(fixedActionObject.getResourceName())

      if (actionSegment == null || resourceSegment == null)
        return true

      if (
        fixedActionObject.getStrictResourceActionPermission() &&
        preventAccessWithoutResourceAccess &&
        !this.mHasResourcePermission(resourceSegment)
      )
        return false

      return !this.mGetUnauthorizedInteractions() ||
        this.mGetUnauthorizedInteractions()['action'] === undefined ||
        (
          this.mGetUnauthorizedInteractions()['action'][`${resourceSegment}.${actionSegment}`]  === undefined &&
          this.mGetUnauthorizedInteractions()['action'][`${resourceSegment}.${kebabCase(actionSegment)}`]  === undefined
        )
    },

    mHasPermission (action,resource = null,excludes = null) {
      resource = resource || this.cResource
      excludes = excludes || this.cpDinGenExcludeActions || []

      return excludes.indexOf(action,excludes) < 0 &&
        this.mResourceAction(action,resource) &&
        this.mHasActionPermission(resource.actions[action])
    }
  }
}
</script>
