<script>
import CvBaseCrud from './CvBaseCrud'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring()
export default {
  mixins: [
    vueMirroring.fixProperties({
    })
  ],
  extends: CvBaseCrud,
  data () {
    return {
    }
  },
  methods:{/*
    mActionInitialize: function () {
      this.row = this.cResource != null &&
        this.cResource.lang != null &&
        this.cResource.lang.fields != null &&
        this.cResource.lang.fields.active != null
        ? {active: 1} : {}
      return new Promise((resolve, reject) => {
        if (this.cpActionGetService){
          this.cpActionGetService(this.cKeyValue).then(response => {
            this.row = this.transformResponse(response)
            if (this.cAutoFillable) {
              console.log(
                '%c Autofill function is enabled' +
                                '%c every create component now autofill his fields with 1,' +
                                '%c this behaivor can be changed in .env file',
                'font-weight: bold; background: ' + colors.getBrand('white') + '; color: ' + colors.getBrand('info'),
                'background: ' + colors.getBrand('white') + '; color: ' + colors.getBrand('warning'),
                'background: ' + colors.getBrand('white') + '; color: ' + colors.getBrand('negative')
              )
            }
            resolve()
          }).catch(error => {
            console.log(error)
            resolve()
          })
        }
        else
          resolve()
      })
    },*/
  },
  computed:{/*
    cKeyName: function () {
      return this.cvKeyName || 'id'
    },
    cKeyValue: function () {
      if (
        this.$route == null ||
        this.$route.params == null ||
        this.$route.params[this.cKeyName] == null
      )
        return null
      return this.$route.params[this.cKeyName]
    }*/
  },
  mounted: function () {
  }
}
</script>
