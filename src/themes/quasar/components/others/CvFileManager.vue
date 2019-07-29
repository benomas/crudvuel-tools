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
    }
  },
  methods: {
    init: function () {
      this.$set(this.row,'cat_file_camel_resource',null)
    },
    openFile: function () {
      window.open(this.row.absolute_path)
    },
    uploadFileStart: function () {
      this.errorCount = 0
      this.ready      = false
      this.errors     = {}
    },
    uploadFilesFinish: function () {
      if (!this.errorCount)
        this.successRedirect()
    },
    uploadFileCompleted: function (info) {
      let {file,xhr} = info
      this.row   = xhr.response.data
      if (this.cShowSetMessages)
        this.collectSuccessMessages(this.action.getSetSuccessMessage() + this.cIdentText)
    },
    uploadFileFail: function (info) {
      let {file,xhr} = info
      if (this.cvComunicator.proccessErrorStatus(xhr))
        return false
      this.ready  = true
      this.errorCount++
      if (typeof xhr !== 'undefined' && typeof xhr.response !== 'undefined') {
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
        this.collectErrorMessages(this.action.getSetErrorMessage() + this.cIdentText)
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
        row.search_field = row.search_field
      }
      return row
    },
    loadCatFiles: function () {
      return new Promise((resolve, reject) => {
        this.resources.catFiles.crudServices.sluged().then( response => {
          let catFiles = response.data.data || response.data || null
          this.$set(this,'catFiles',catFiles)
          console.log(this.catFiles)
          resolve(response)
        }).catch( response => {
          this.$set(this,'catFiles',null)
          reject(response)
        })
      })
    }
  }
}
</script>
