import CvActionComponentSet from 'crudvuel-tools/src/components/sets/CvActionComponentSet'
//import VueMirroring from 'crudvuel-tools/src/VueMirroring'
//let vueMirroring = new VueMirroring()
export default{
  mixins: [
    CvActionComponentSet
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cKeyName: function () {
      return this.cvKeyName || 'id'
    },
    cRows: function () {
      return this.cvRows || this.rows || null
    }
  },
  methods: {
  },
  created: function () {
  }

}
