import CvSingleRowComponentSet from 'crudvuel-tools/src/components/sets/CvSingleRowComponentSet'
//import VueMirroring from 'crudvuel-tools/src/VueMirroring'
//let vueMirroring = new VueMirroring()
export default{
  mixins: [
    CvSingleRowComponentSet
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
  },
  methods: {
    mActionInitialize: function () {
      this.row = this.cResource != null &&
        this.cResource.lang != null &&
        this.cResource.lang.fields != null &&
        this.cResource.lang.fields.active != null
        ? {active: 1} : {}
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          setTimeout(() => {
            if (this.cAutoFill) {
              let fields = Object.keys(this.cResource.lang.fields)
              for (let i = 0; i < fields.length; i++) {
                if (this.row[fields[i]] ==  null)
                  this.$set(this.row,fields[i],1)
              }
            }
            if (this.cHasActiveField)
              this.$set(this.row,'active',true)
            resolve()
          }, 2000)
        })
      })
    },
    mSetService () {
      this.cpActionSetService().then(this.setSuccess).catch(this.setError)
    }
  },
  created: function () {
  }

}
