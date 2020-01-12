<script>
export default {
  data    : function () {
    return {
      errorCount : 0,
      catFiles   : []
    }
  },
  computed: {
    cFieldFormater: function () {
      return this.row ? [
        {
          name  : 'resource_id',
          value : this.row.resource_id
        },
        {
          name  : 'resource',
          value : this.row.cat_file_resource
        },
        {
          name  : 'cat_file_id',
          value : this.row.cat_file_id
        },
        {
          name  : 'active',
          value : this.row.active
        }
      ] : []
    },
    cUploadReference: function () {
      return this.$refs.uploader
    },
    cFileName: function () {
      return this.cCurrentResource
    },
    cMultiple: function () {
      if (typeof this.row.cat_file_multiple !== 'undefined' && this.row.cat_file_multiple)
        return true
      return false
    },
    cCurrentCvResource: function () {
      return this.row.cat_file_camel_resource != null ? this.row.cat_file_camel_resource : false
    },
    cCurrentResource: function () {
      return this.row.cat_file_resource != null ? this.row.cat_file_resource : null
    },
    cCatFiles: function () {
      return this.catFiles
    }
  },
  methods: {
    init: function () {
      this.$set(this.row,'cat_file_camel_resource',null)
    },
    mOpenFile: function () {
      window.open(this.row.absolute_path)
    },
    uploadFileStart: function () {
      this.errorCount = 0
      this.errors     = {}
    },
    uploadFilesFinish: function () {
      if (!this.errorCount)
        this.successRedirect()
    },
    uploadFileCompleted: function (info) {
      return new Promise ((resolve,reject) => {
        let {file,xhr} = info
        this.row   = xhr.response.data
        this.ready = true
        if (this.cShowSetMessages)
          this.collectSuccessMessages(this.cAction.getSetSuccessMessage() + this.cIdentText)
        resolve(xhr)
      })
    },
    uploadFileFail: function (info) {
      let {file,xhr} = info
      console.log(info)
      if (this.cvComunicator.proccessErrorStatus(xhr))
        return false
      this.ready  = true
      this.errorCount++
      if (xhr !== undefined && xhr.response != null && xhr.response !== '') {
        let parsed = JSON.parse(xhr.response)
        if (typeof parsed.errors !== 'undefined') {
          if (!this.cMultiple)
            this.errors = parsed.errors
          else {
            if (typeof parsed.errors['resource_id'] !== 'undefined')
              this.errors['resource_id'] = parsed.errors['resource_id']
            if (typeof parsed.errors['cat_file_id'] !== 'undefined')
              this.errors['cat_file_id'] = parsed.errors['cat_file_id']
            if (typeof parsed.errors['active'] !== 'undefined')
              this.errors['active'] = parsed.errors['active']
            if (this.row.cat_file_id) {
              if (typeof parsed.errors['request_file_' + this.row.cat_file_id] !== 'undefined') {
                if (typeof this.errors['request_file_' + this.row.cat_file_id] === 'undefined')
                  this.errors['request_file_' + this.row.cat_file_id] = parsed.errors['request_file_' + this.row.cat_file_id]
                /* fix error concat
                else {
                  let oldError = this.errors['request_file_' + this.row.cat_file_id][0]
                  for (let i = 0; i < parsed.errors['request_file_' + this.row.cat_file_id].length; i++)
                    oldError = oldError + ', ' + parsed.errors['request_file_' + this.row.cat_file_id][i]
                  //this.$set(this.errors['request_file_' + this.row.cat_file_id],0,'asdasdasd')
                  this.errors['request_file_' + this.row.cat_file_id].push()
                  //this.errors['request_file_' + this.row.cat_file_id][0] = 'asdasdasd'
                }
                */
              }
            }
          }
        }
      }

      if (this.cShowSetMessages)
        this.collectErrorMessages(this.cAction.getSetErrorMessage() + this.cIdentText)
      this.errorRedirect()
    },
    validator: function () {
      return true
    },
    upload: function () {
      this.cUploadReference.upload()
    },
    reset: function () {
      this.cUploadReference.reset()
    },
    transformResponse: function (response) {
      let row = response.data.data || response.data
      if (row != null) {
        if (row.cat_file != null) {
          row.cat_file_camel_resource = row.cat_file.camel_resource
          row.cat_file_resource       = row.cat_file.resource
        }
        row.cv_search = row.cv_search
      }
      return row
    },
    loadCatFiles: function () {
      return new Promise((resolve, reject) => {
        this.resources.catFiles.crudServices.sluged().then( response => {
          let catFiles = response.data.data || response.data || null
          this.$set(this,'catFiles',catFiles)
          resolve(response)
        }).catch( response => {
          this.$set(this,'catFiles',null)
          reject(response)
        })
      })
    },
    mFieldFormater: function (catFileOrSlug) {
      let catFile
      if (typeof catFileOrSlug === 'object')
        catFile = catFileOrSlug
      else
        catFile = this.cCatFiles[catFileOrSlug] || null
      return this.row ? [
        {
          name  : 'resource_id',
          value : this.row.id
        },
        {
          name  : 'resource',
          value : this.cResource.name
        },
        {
          name  : 'cat_file_id',
          value : catFile.id || null
        },
        {
          name  : 'active',
          value : 1
        }
      ] : []
    }
  }
}
</script>
