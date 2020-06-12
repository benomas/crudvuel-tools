<script>
import {kebabCase,camelCase} from 'lodash'
export default {
  methods:{
    mGetUnauthorizedInteractions (special) {
      if (this.$store != null)
        return this.$store.getters.cStUnauthorizedInteractions

      if (this.store != null)
        return this.store.getters.cStUnauthorizedInteractions

      return null
    },

    hasSpecialPermission (special) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['special'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['special'][special] === 'undefined'
    },

    hasSectionPermission (section) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['section'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['section'][section + '-section'] === 'undefined'
    },

    hasResourcePermission (resource) {
      return !this.mGetUnauthorizedInteractions() ||
        typeof this.mGetUnauthorizedInteractions()['resource'] === 'undefined' ||
        typeof this.mGetUnauthorizedInteractions()['resource'][kebabCase(resource)] === 'undefined'
    },

    hasActionPermission (action) {
      if (action === undefined)
        action = this.cpStaGenAction || null

      if (!action)
        return true

      return !this.mGetUnauthorizedInteractions() ||
        this.mGetUnauthorizedInteractions()['action'] === undefined ||
        this.mGetUnauthorizedInteractions()['action'][kebabCase(action.resource.name) + '.' + camelCase(action.name)]  === undefined
    },

    hasPermission (action,resource = null,excludes = null) {
      resource = resource || this.cResource
      excludes = excludes || this.cpDinGenExcludeActions || []

      return excludes.indexOf(action,excludes) < 0 &&
        this.mResorceAction(action,resource) &&
        this.hasActionPermission(resource.actions[action])
    }
  }
}
</script>
