<script>
import {kebabCase,camelCase} from 'lodash'
export default {
  methods:{
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
      if(this.mActionAccessing == null)
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
      if(typeof action === 'string'){
        if(this.mActionAccessing == null)
          return true

        action = this.mActionAccessing(action,resource)
      }

      if (action == null)
        return true

      if (preventAccessWithoutResourceAccess && !this.mHasResourcePermission(action.resource.name))
        return false

      return !this.mGetUnauthorizedInteractions() ||
        this.mGetUnauthorizedInteractions()['action'] === undefined ||
        (
          this.mGetUnauthorizedInteractions()['action'][`${kebabCase(action.getResourceName())}.${camelCase(action.getName())}`]  === undefined &&
          this.mGetUnauthorizedInteractions()['action'][`${kebabCase(action.getResourceName())}.${kebabCase(action.getName())}`]  === undefined
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
