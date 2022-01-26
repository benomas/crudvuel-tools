import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring('ResourceComponentSet').fixProperties({
      '[P]staGenAction'             : null,
      '[P]staInsResource'           : null,
      '[P]dinGenDisableFields'      : null,
      '[P|EM]dinInsDataLoadedFail'  : false,
      '[P|EM]dinInsDataLoaded'      : false
    })
  ],

  computed: {
    cHasActions () {
      if (!this.cpStaInsResource)
        return false

      if (this.cpStaInsResource.actions == null)
        return false
      return true
    },

    cHasCreateAction () {
      if (!this.cHasActions)
        return false

      if (this.cpStaInsResource.actions.create == null)
        return false

      return true
    },

    cShowCreateButton () {
      if (!this.cpStaInsEnableCreateButton)
        return false

      if (!this.cHasCreateAction)
        return false

      if (!this.mHasActionPermission(this.cpStaInsResource.actions.create))
        return false

      return true
    },

    cCreateMessage () {
      if (!this.cShowCreateButton)
        return ''
      return this.cpStaInsResource.actions.create.label
    },

    cCreateAction () {
      if (!this.cHasCreateAction)
        return null

      return this.cpStaInsResource.actions.create
    },

    cHasShowAction () {
      if (!this.cHasActions)
        return false

      if (this.cpStaInsResource.actions.show == null)
        return false

      return true
    },

    cShowShowButton () {
      if (!this.cpStaInsEnableShowButton)
        return false

      if (!this.cHasShowAction)
        return false

      if (!this.mHasActionPermission(this.cpStaInsResource.actions.show))
        return false

      return true
    },

    cShowMessage () {
      if (!this.cShowShowButton)
        return ''
      return this.cpStaInsResource.actions.show.label
    },

    cShowAction () {
      if (!this.cHasShowAction)
        return null

      return this.cpStaInsResource.actions.show
    },

    cHasEditAction () {
      if (!this.cHasActions)
        return false

      if (this.cpStaInsResource.actions.edit == null)
        return false

      return true
    },

    cShowEditButton () {
      if (!this.cpStaInsEnableEditButton)
        return false

      if (!this.cHasEditAction)
        return false

      if (!this.mHasActionPermission(this.cpStaInsResource.actions.edit))
        return false

      return true
    },

    cEditMessage () {
      if (!this.cShowEditButton)
        return ''
      return this.cpStaInsResource.actions.edit.label
    },

    cEditAction () {
      if (!this.cHasCreateAction)
        return null

      return this.cpStaInsResource.actions.edit
    },

    cDisableFields () {
      if (this.cpDinGenDisableFields != null)
        return this.cpDinGenDisableFields

      return (this.cpStaGenAction && this.cpStaGenAction.disableFields) || false
    },

    cResource () {
      return (this.cpStaGenAction && this.cpStaGenAction.resource) ? this.cpStaGenAction.resource : null
    },

    cKeyName () {
      if (this.cpStaInsResource == null || this.cpStaInsResource.keyName == null)
        return 'id'

      return this.cpStaInsResource.keyName
    },

    cHasActiveField () {
      if (
        this.cpStaInsResource == null ||
        this.cpStaInsResource.lang == null ||
        this.cpStaInsResource.lang.fields == null ||
        this.cpStaInsResource.lang.fields.active == null
      )
        return false

      return true
    },

    cpStaInsResource () {
      if (this.cvStaInsResource)
        return this.mResourceAccessing(this.mCaseFixer('camel',this.cvStaInsResource))

      const found = [...this.cpStaInsComponentBindingTag.matchAll(/^cv-(.+)?-skeleton$/gi)]
      if (!found || found[0] == null || found[0][1] == null)
        return null

      return this.mResourceAccessing(this.mCaseFixer('camel',found[0][1]))
    },

    cCamelResource(){
      if (!this.cpStaInsResource || !this.cpStaInsResource.pluralName)
        return ''

      return this.mCaseFixer('camel',this.cpStaInsResource.pluralName)
    }
  },

  methods: {
    mResourceAccessing (resource = null) {
      if (!resource)
        return this.cpStaInsResource

      if (typeof resource === 'string') {
        if (this.cResources != null && this.cResources[resource] != null)
          return this.cResources[resource]
        return null
      }

      return resource
    },

    mrLang (source,resource = null) {
      let lResource = this.mResourceAccessing(resource)

      if(this.$tc == null)
        return null

      console.log(this.$tc,lResource)
      return lResource ? this.$tc('crudvuel.resources.' + lResource.name + '.' + source) : null
    },

    mfLang (field,resource = null) {
      return this.mrLang('fields.' + field,resource)
    },

    mIndexResponse (response) {
      if  (response.data.count != null)
        return {rows:response.data.data,count:response.data.count}

      if  (response.count != null)
        return {rows:response.data,count:response.count}

      return {rows:[],count:0}
    },

    mShowResponse (response) {
      return response.data.data || response.data
    },

    mSolveAsIndexResponse(rows=[]) {
      if (rows == null)
        return {data:[],count:0}

      return {data:rows,count:rows.length}
    },

    mPropertyErrorResponse (response,property=null) {
      if (
        response == null ||
        response.response == null ||
        response.response.data == null
      )
        return null

      if (
        property == null ||
        response.response.data[property] == null
      )
        return null

      return response.response.data[property]
    },

    mErrorResponse (response) {
      let errors = this.mPropertyErrorResponse(response,'errors')

      if(errors == null)
        return {}

      return errors
    },

    mMessageErrorResponse (response) {
      return this.mPropertyErrorResponse(response,'message')
    }
  }
}
