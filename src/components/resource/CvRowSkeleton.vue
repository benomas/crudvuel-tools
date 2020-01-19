<script>
import CvBaseComponent from '../CvBaseComponent'
import CvDefiner from './CvDefiner'
import VueMirroring from 'crudvuel-tools/src/VueMirroring'
let vueMirroring = new VueMirroring()
export default {
  mixins: [
    CvBaseComponent,
    CvDefiner,
    vueMirroring.fixProperties({
      disableFields : {init:false},
      row           : {init:{}},
      segment       : {init:''}
    }),
  ],
  data () {
    return {
      resource  : null,
      action    : null,
      isMounted : false,
      row       : {},
      errors    : {}
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
    },
    cErrors: function () {
      return this.cParentRef.errors
    }
  },
  methods: {
    validator: function () {
      return true
    }
  },
  created: function () {
    this.row    = this.cRow
    this.errors = this.cParentRef.errors
  },
  mounted: function () {
    this.isMounted = true
  }
}
</script>
