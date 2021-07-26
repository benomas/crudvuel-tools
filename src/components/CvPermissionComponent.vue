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
    //to be deprecated because has malformed name
    hasSpecialPermission (special) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['special'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['special'][special] === 'undefined'
    },
    //to be deprecated because has malformed name
    hasSectionPermission (section) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['section'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['section'][section + '-section'] === 'undefined'
    },
    //to be deprecated because has malformed name
    hasResourcePermission (resource) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['resource'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['resource'][kebabCase(resource)] === 'undefined'
    },
    //to be deprecated because has malformed name
    hasActionPermission (action = null, resource = null) {
      if (this.mActionAccessing == null)
        return true

      action = this.mActionAccessing(action,resource)
      //to be deprecated because has malformed name
      return !this.mGetUnauthorizedInteractions() ||
        this.mGetUnauthorizedInteractions()['action'] === undefined ||
        (
          this.mGetUnauthorizedInteractions()['action'][`${kebabCase(action.getResourceName())}.${camelCase(action.getName())}`]  === undefined &&
          this.mGetUnauthorizedInteractions()['action'][`${kebabCase(action.getResourceName())}.${kebabCase(action.getName())}`]  === undefined
        )
    },

    hasPermission (action,resource = null,excludes = null) {
      resource = resource || this.cResource
      excludes = excludes || this.cpDinGenExcludeActions || []

      return excludes.indexOf(action,excludes) < 0 &&
        this.mResourceAction(action,resource) &&
        this.hasActionPermission(resource.actions[action])
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
      let actionSegment   = null
      let resourceSegment = null

      let fixByAction = function () {
        if (action.getName == null || action.getResourceName == null)
          return true

        actionSegment   = camelCase(action.getName())
        resourceSegment = kebabCase(action.getResourceName())
      }

      if (typeof action === 'object') {
        fixByAction()
      } else {
        if (resource == null) {
          if (this.mActionAccessing == null)
            return true

          action = this.mActionAccessing(action,resource)
          fixByAction()
        } else {
          actionSegment   = camelCase(action)
          resourceSegment = kebabCase(resource)
        }
      }

      if (actionSegment == null || resourceSegment == null)
        return true

      if (preventAccessWithoutResourceAccess && !this.mHasResourcePermission(resourceSegment))
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
