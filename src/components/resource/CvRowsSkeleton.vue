<script>
export default {
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
    }
  },
  methods: {
    validator: function () {
      return true
    }
  }
}
</script>
