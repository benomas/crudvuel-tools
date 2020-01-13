<script>
export default {
  methods: {
    mResourceAccessing: function (resource = null) {
      if (!resource)
        return this.cResource
      if (typeof resource === 'string') {
        if (this.resources != null && this.resources[resource] != null)
          return this.resources[resource]
        return null
      }
      return resource
    },
    rLang: function (source,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      return lResource ? this.$tc('crudvuel.resources.' + lResource.name + '.' + source) : null
    },
    fLang: function (field,resource = null) {
      return this.rLang('fields.' + field,resource)
    },
    defActionProps: function (action = null,resource = null) {
      let currentDefActionProps = {
        'cv-parent-ref' : this.cSelfRef,
        'cv-action'     : this.mActionAccessing(action,this.mResourceAccessing(resource)),
        'cv-ready'      : this.cdReady
      }

      if (this.bGridBind !== undefined)
        currentDefActionProps = {...currentDefActionProps,...this.bGridBind()}
      return currentDefActionProps
    },
    defInputProps: function (field,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      let def =  {
        'float-label'    : lResource ? this.fLang(field,lResource) : null,
        'label'          : lResource ? this.fLang(field,lResource) : null,
        'clearable'      : 'clearable',
        'readonly'       : this.cDisableFields,
        'disable'        : this.cDisableFields,
        'hide-underline' : this.cDisableFields,
        'clear-icon'     : 'fas fa-times-circle',
        'class'          : 'w-100',
        'error'          : this.cvErr(this.errors,field,'boolean'),
        'error-message'  : this.cvErr(this.errors,field),
        'no-error-icon'  : true,
        'ref'            : `row.${field}`
        //'loading'   : !this.cReady,
      }
      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon
      return def
    },
    defErrorInputProps: function (field,resource = null) {
      let lResource = this.mResourceAccessing(resource)
      let def =  {
        'error'         : this.cvErr(this.errors,field,'boolean'),
        'error-message' : this.cvErr(this.errors,field),
        'no-error-icon' : true
      }
      if (lResource.fields != null && lResource.fields[field] != null && lResource.fields[field].icon != null)
        def.icon = lResource.fields[field].icon
      return def
    },
    defMatcherizerProps: function (resource = null,snakeResource = null) {
      let lResource = this.mResourceAccessing(resource)
      return {
        'cv-source-service'      : lResource.crudServices.index || null,
        'cv-source-label'        : lResource.rowLabel || null,
        'cv-search-label'        : lResource.rowLabel || null,
        'cv-disable-fields'      : this.cDisableFields,
        'cv-search-icon'         : lResource.icon || null,
        'cv-parent-ref'          : this.cSelfRef || null,
        'clear-icon'             : 'fas fa-times-circle',
        'class'                  : 'w-100',
        'cv-filter-query'        : {'cv_search': ''},
        'cv-order-by'            : 'cv_search',
        'cv-label-call-back'     : (rows,row) => { return row['cv_search'] },
        'cv-list-of-items-limit' : '10',
        ...(snakeResource ? {
          'ref'              : `row.${snakeResource}_id`,
          'cv-select-query'  : {'id': `${snakeResource}_id`,'cv_search': `${snakeResource}_cv_search`},
          'cv-current-value' : this.row[`${snakeResource}_id`],
          'cv-current-label' : this.row[`${snakeResource}_cv_search`]
        } : {})
        //'cv-loading'          : !this.cReady,
      }
    }
  }
}
</script>
