import VueMirroring     from 'crudvuel-tools/src/mirroring/VueMirroring'
import {split}          from 'lodash'

export default {
  props:[
    'cvResourcer',
    'cvResourcerKey',
    'cvEnableAutoUpload'
  ],

  computed: {
    cResourcer () {
      return this.cvResourcer || null
    },

    cResourcerKey () {
      return this.cvResourcerKey || null
    },

    cResourceName: function () {
      return this.cResourcer != null ? this.cResourcer.name : null
    },

    cEnableAutoUpload () {
      return this.cvEnableAutoUpload || null
    },

    cCurrentResource: function () {
      return this.cResourcer != null ? this.cResourcer.name : null
    },

    cFieldFormater: function () {
      return this.cRow ? [
        {
          name  : 'resource_id',
          value : this.cResourcerKey
        },
        {
          name  : 'resource',
          value : this.cResourcer.name
        },
        {
          name  : 'cat_file_id',
          value : this.cRow.id
        },
        {
          name  : 'active',
          value : 1
        }
      ] : []
    },

    cDefaultImg () {
      return 'assets/default-file-img.svg'
    },

    cSkeletonName () {
      if (this.cResources.files.singularName != null)
        return this.cResources.files.singularName

      return ''
    },

    cImgExtensions () {
      return ['jpg','jpeg','gif','svg','png','tif']
    }
  },

  methods: {
    mResourcerBinder () {
      return {
        'cv-resourcer'          : this.cResourcer,
        'cv-resourcer-key'      : this.cResourcerKey,
        'cv-enable-auto-upload' : this.cEnableAutoUpload
      }
    },

    mIsImage (file) {
      let ext = this.mFileExtension(file)

      return this.cImgExtensions.find(item => item === ext)
    },

    mFileExtension (file) {
      let fileSegments = split(file.absolute_path,'.')

      if (fileSegments.length < 2)
        return ''

      return fileSegments.pop()
    }
  }
}
