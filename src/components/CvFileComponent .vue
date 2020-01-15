<script>
export default{
  methods:{
    mOpenFile: function (path) {
      window.open(path)
    },
    getFirstFileBySlug: function (row = null,owner = null,slug = null,property = null) {
      if (row == null || owner == null || slug == null)
        return null
      if (row['files'] != null) {
        owner = row
      } else {
        if (row[owner] != null)
          owner = row[owner]
        else
          return null
      }

      if (owner.files == null || owner.files.length === 0)
        return null
      for (let i = 0; i < owner.files.length; i++)
        if (owner.files[i].cat_file.slug === slug) {
          if (property) {
            if (owner.files[i][property] != null)
              return owner.files[i][property]
            else
              return null
          }
          return owner.files[i]
        }
      return null
    },
    getFirstPathFileBySlug: function (row = null,owner = null,slug = null) {
      return this.getFirstFileBySlug(row,owner,slug,'absolute_path')
    },
    getLogoFilePath: function (row = null) {
      return this.getFirstPathFileBySlug(row,'company','company-logo')
    },
    getCvFilePath: function (row) {
      return this.getFirstPathFileBySlug(row,'candidate','candidate-cv')
    },
    getRequestFilePath: function (row) {
      return this.getFirstPathFileBySlug(row,'job','company-request')
    },
    getPhotoFilePath: function (row) {
      return this.getFirstPathFileBySlug(row,'candidate','candidate-photographi')
    },
    cExportHeaders: function () {
      return this.services.general.cvComunicator.shareHeaders() || {}
    },
    cRelBaseUrl: function () {
      return this.cResource.crudServices.getRelBaseUrl() || ''
    },
    cAbsBaseUrl: function () {
      return this.cResource.crudServices.getAbsBaseUrl() || ''
    },
    cFileUrl: function () {
      return this.cvGlobDep.globals.cvEnv.apiUrl() + '/api/files'
    },
    cFileHeaders: function () {
      let fileHeaders = this.cExportHeaders
      delete fileHeaders['Content-Type']
      return fileHeaders
    },
    cQFieldFileHeaders: function () {
      let qFieldFileHeaders = []
      let headerKeys =  Object.keys(this.cFileHeaders)
      for (let i = 0; i < headerKeys.length; i++)
        qFieldFileHeaders.push({
          name  : headerKeys[i],
          value : this.cFileHeaders[headerKeys[i]]
        })
      return qFieldFileHeaders
    }
  }
}
</script>
