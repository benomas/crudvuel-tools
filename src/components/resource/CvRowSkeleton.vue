<script>
import CvCore from '../CvCore'
import CvDefiner from './CvDefiner'
import VueMirroring from '../../VueMirroring'
let vueMirroring = new VueMirroring()
export default {
  mixins: [
    CvCore,
    CvDefiner,
    vueMirroring.fixProperty('row')
  ],
  data () {
    return {
      resource  : null,
      action    : null,
      isMounted : false
    }
  },
  props: [
    'cvContainerResource',
    'cvCurrentResource'
  ],
  computed: {
    cContainerResource: function () {
      return this.cvContainerResource
    },
    cCurrentResource: function () {
      return this.cvCurrentResource
    }
  },
  methods: {
    validator: function () {
      return true
    }
  },
  created: function () {
    this.resource = this.resources.locations
    this.action   = this.resource.actions.createBundleRenderer
    this.row      = this.cRow
    console.log(this.cvRow)
  },
  mounted: function () {
    this.isMounted = true
  }
}
</script>
