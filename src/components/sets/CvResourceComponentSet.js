import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('ResourceComponentSet')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]staInsResource':null
    })
  ],
  components : {
  },
  computed: {
    cDisableFields () {
      return (this.cpStaGenAction && this.cpStaGenAction.disableFields) || false
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
        return this.mResourceAccessing(this.cvStaInsResource)

      const found = [...this.cpStaInsComponentBindingTag.matchAll(/^cv-(.+)?-skeleton$/gi)]
      if (!found || found[0] == null || found[0][1] == null)
        return null
      return this.mResourceAccessing(found[0][1])
    }
  },
  methods: {
    mAutoFill (row) {
      let fields = Object.keys(this.cpStaInsResource.lang.fields)
      for (let i = 0; i < fields.length; i++)
        if (row[fields[i]] ==  null)
          row[fields[i]] = 1
      return row
    },
    mResourceAccessing (resource = null) {
      if (!resource)
        return this.cpStaInsResource

      if (typeof resource === 'string') {
        if (this.resources != null && this.resources[resource] != null)
          return this.resources[resource]
        return null
      }
      return resource
    },
    mrLang (source,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      return lResource ? this.$tc('crudvuel.resources.' + lResource.name + '.' + source) : null
    },
    mfLang (field,resource = null) {
      return this.mrLang('fields.' + field,resource)
    }
  }
}
