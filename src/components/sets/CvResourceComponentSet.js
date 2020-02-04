import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('ResourceComponentSet')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]staComResource':null
    })
  ],
  components : {
  },
  computed: {
    cDisableFields () {
      return (this.cpStaGenAction && this.cpStaGenAction.disableFields) || false
    },
    cKeyName () {
      if (this.cResource == null || this.cResource.keyName == null)
        return 'id'
      return this.cResource.keyName
    },
    cHasActiveField () {
      if (
        this.cResource == null ||
        this.cResource.lang == null ||
        this.cResource.lang.fields == null ||
        this.cResource.lang.fields.active == null
      )
        return false
      return true
    },
    cpStaComResource () {
      if (this.cvStaComResource)
        return this.mResourceAccessing(this.cvStaComResource)

      const found = [...this.cpStaInsComponentBindingTag.matchAll(/^cv-(.+)?-skeleton$/gi)]
      if (!found || found[0] == null || found[0][1] == null)
        return null
      return this.mResourceAccessing(found[0][1])
    }
  },
  methods: {
    mAutoFill () {
      let fields = Object.keys(this.cResource.lang.fields)
      for (let i = 0; i < fields.length; i++)
        if (this.row[fields[i]] ==  null)
          this.$set(this.row,fields[i],1)
      return this
    },
    mResourceAccessing (resource = null) {
      if (!resource)
        return this.cResource

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
