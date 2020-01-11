<script>
import CvDefiner from './CvDefiner'
export default {
  extends: CvDefiner
  data () {
    return {
      row       : {},
      resource  : null,
      action    : null,
      isMounted : false
    }
  },
  props: [
    'cvRow',
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
    cRow: function () {
      return this.cvRow
    }
  },
  methods: {
    validator: function () {
      return true
    }
  },
  created: function () {
    this.resource = this.resources.locations
    this.action = this.resource.actions.create
  },
  mounted: function () {
    this.isMounted = true
    this.row = this.cRow
    console.log(this.cRow)
  }
}
</script>
