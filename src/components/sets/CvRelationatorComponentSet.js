import {camelCase}   from 'lodash'
import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring().fixProperties({
      '[P]staInsRelatedResource': null
    })
  ],

  computed: {
    cpStaInsResource () {
      if (this.cvStaInsResource != null)
        return this.mResourceAccessing(this.cvStaInsResource)

      const found = [...this.componentBindingTag.matchAll(/^(cv-relate-to-)(.+?)(-skeleton)$/gi)]

      if (!found || found[0] == null || found[0][2] == null || found[0][2] === '')
        return null

      return this.mResourceAccessing(camelCase(found[0][2]))
    },

    cRelatedBindingTag () {
      if (!this.cpStaInsRelatedResource || !this.cpStaInsResource || !this.cpStaInsResource.pluralName)
        return null

      return `${this.cpStaInsRelatedResource}-to-${this.cpStaInsResource.pluralName}`
    },

    cLocalBindingTag () {
      if (!this.cpStaInsResource || !this.cpStaInsResource.singularName)
        return null

      return `cv-relationator-related-${this.cpStaInsResource.singularName}`
    },

    cLocalBindins () {
      return {
        'cv-din-ins-related-paginate': {
          paginate: {
            selectQuery  : ['id','cv_search'],
            byColumn     : 0,
            orderBy      : 'id',
            ascending    : 1,
            searchMode   : 'cv-simple-paginator',
            searchObject : ''
          }
        },

        'cv-din-ins-source-paginate': {
          paginate: {
            selectQuery  : ['id','cv_search'],
            byColumn     : 0,
            orderBy      : 'id',
            ascending    : 1,
            searchMode   : 'cv-simple-paginator',
            searchObject : ''
          }
        }
      }
    }
  }
}
