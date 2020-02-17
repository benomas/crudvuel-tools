import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Index')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]staInsRows' : []
    })
  ],
  data () {
    return {
    }
  },
  props: [
  ],
  computed: {
  },
  methods: {
  }
}
