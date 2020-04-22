import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
export default {
  props:[
    'cvResourcer',
    'cvResourcerKey'
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
    }
  },

  methods: {
    mResourcerBinder () {
      return {
        'cv-resourcer'     : this.cResourcer,
        'cv-resourcer-key' : this.cResourcerKey
      }
    }
  },
}
