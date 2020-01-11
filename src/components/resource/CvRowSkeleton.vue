<script>
export default {
  data () {
    return {
      data      : {},
      resource  : null,
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
  }
}
</script>
