<script>
export default{
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
        typeof this.cUnauthorizedInteractions['resource'][this.lodash.kebabCase(resource)] === 'undefined'
    },
    hasActionPermission (action) {
      if (typeof action === 'undefined')
        action = this.cpAction || null
      if (!action)
        return true
      return !this.cUnauthorizedInteractions ||
        typeof this.cUnauthorizedInteractions['action'] === 'undefined' ||
        typeof this.cUnauthorizedInteractions['action'][this.lodash.kebabCase(action.resource.name) + '.' + this.lodash.kebabCase(action.name)] === 'undefined'
    },
    hasPermission: function (action,resource = null,excludes = null) {
      resource = resource || this.cResource
      excludes = excludes || this.cpExcludeActions
      return excludes.indexOf(action,excludes) < 0 &&
        this.mResorceAction(action,resource) &&
        this.hasActionPermission(resource.actions[action])
    },
  }
}
</script>
