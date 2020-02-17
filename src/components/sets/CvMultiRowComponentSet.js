import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('MultiRowComponentSet')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]dinGenKeyName' : 'id'
    })
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
  },
  methods: {
  }
}
