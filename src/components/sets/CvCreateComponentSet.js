import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Create')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]staInsRow' : {}
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
