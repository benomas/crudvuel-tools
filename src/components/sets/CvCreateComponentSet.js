import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Create')
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P]staInsRow'     : {},
      '[P]staInsRowTest' : {prueba:5}
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
