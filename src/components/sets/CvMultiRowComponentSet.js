import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('MultiRowComponentSet')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]dinGenKeyName':'id'
    })
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cKeyValue: function () {
      if (
        this.$route == null ||
        this.$route.params == null ||
        this.$route.params[this.cKeyName] == null
      )
        return null
      return this.$route.params[this.cKeyName]
    }
  },
  methods: {
  },
  created: function () {
  }

}
