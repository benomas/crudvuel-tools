import {camelCase}  from 'lodash'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring().fixProperties({
      '[D|M]errorCount'        : 0,
      '[D|M]catFiles'          : [],
      '[P]dinGenExportHeaders' : function () {
        return this.services.general.cvComunicator.shareHeaders() || {}
      },
      '[P]dinGenFileUrl' : function () {
        return this.cvGlobDep.globals.cvEnv.apiUrl() + '/api/files'
      }
    })
  ],

  computed: {

    cFileHeaders: function () {
      let fileHeaders = {...this.cpDinGenExportHeaders()}
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
    },

    cFieldFormater: function () {
      return this.cRow ? [
        {
          name  : 'resource_id',
          value : this.cRow.resource_id
        },
        {
          name  : 'resource',
          value : this.cRow.cat_file_resource
        },
        {
          name  : 'cat_file_id',
          value : this.cRow.cat_file_id
        },
        {
          name  : 'active',
          value : this.cRow.active
        }
      ] : []
    },

    cUploadReference: function () {
      return this.$refs.uploader
    },

    cMultiple: function () {
      if (this.cRow.cat_file_multiple != null && this.cRow.cat_file_multiple)
        return true

      return false
    },

    cFileResource () {
      if (this.cRow.cat_file_resource != null)
        return this.cRow.cat_file_resource

      return ''
    },

    cCamelFileResource () {
      return camelCase(this.cFileResource)
    },

    cCurrentCvResource: function () {
      return this.cRow.cat_file_camel_resource != null ? this.cRow.cat_file_camel_resource : false
    },

    cCurrentResource: function () {
      return this.cRow.cat_file_resource != null ? this.cRow.cat_file_resource : null
    },

    cCatFiles: function () {
      return this.catFiles
    }
  },

  methods: {
    mOpenFile: function (file = null) {
      if (file)
        window.open(file.absolute_path)
      else
        window.open(this.cRow.absolute_path)
    },

    uploadFileStart: function () {
      this.errorCount = 0
      this.errors     = {}
    },

    uploadFilesFinish: function () {/*
      if (!this.errorCount)
        this.successRedirect()*/
    },

    mFixResponse (response) {
      return JSON.parse(response.xhr.response)
    },

    uploadFileCompleted: function (info) {
      return new Promise ((resolve,reject) => {
        let file = this.mFixResponse(info)

        if (this.mDirectInput != null)
          this.mDirectInput('files',[file.data])

        this.mSetReady()

        if (this.cShowSetMessages)
          this.collectSuccessMessages(this.cpStaGenAction.getSetSuccessMessage() + this.cIdentText)

        resolve(info.xhr)
      })
    },

    uploadFileFail: function (info) {
      let {file,xhr} = info

      if (this.cvComunicator.proccessErrorStatus(xhr))
        return false

      this.mSetReady()
      this.errorCount++

      if (xhr !== undefined && xhr.response != null && xhr.response !== '') {
        let parsed = JSON.parse(xhr.response)
        if (typeof parsed.errors !== 'undefined') {
          let errors = {}
          if (!this.cMultiple)
            errors = parsed.errors
          else {
            if (typeof parsed.errors['resource_id'] !== 'undefined')
              errors['resource_id'] = parsed.errors['resource_id']
            if (typeof parsed.errors['cat_file_id'] !== 'undefined')
              errors['cat_file_id'] = parsed.errors['cat_file_id']
            if (typeof parsed.errors['active'] !== 'undefined')
              errors['active'] = parsed.errors['active']
            if (this.cRow.cat_file_id) {
              if (typeof parsed.errors['request_file_' + this.cRow.cat_file_id] !== 'undefined') {
                if (typeof errors['request_file_' + this.cRow.cat_file_id] === 'undefined')
                  errors['request_file_' + this.cRow.cat_file_id] = parsed.errors['request_file_' + this.cRow.cat_file_id]
              }
            }
          }
          this.mSetLocalError(errors)
        }
      }

      if (this.cShowSetMessages)
        this.mErrorNotification(this.cpStaGenAction.getSetErrorMessage())
      //this.errorRedirect()
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

      return this.cRow ? [
        {
          name  : 'resource_id',
          value : this.cRow.id
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
