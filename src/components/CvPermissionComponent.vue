<script>
import {kebabCase,camelCase} from 'lodash'
export default {
  methods:{
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
        typeof this.cUnauthorizedInteractions['resource'][kebabCase(resource)] === 'undefined'
    },

    hasActionPermission (action) {
      if (action === undefined)
        action = this.cpStaGenAction || null

      if (!action)
        return true

      return !this.cUnauthorizedInteractions ||
        this.cUnauthorizedInteractions['action'] === undefined ||
        this.cUnauthorizedInteractions['action'][kebabCase(action.resource.name) + '.' + camelCase(action.name)]  === undefined
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
