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
    indexResponse (response) {
      if  (response.data.count != null)
        return {rows:response.data.data,count:response.data.count}
      if  (response.count != null)
        return {rows:response.data,count:response.count}
      return {rows:[],count:0}
    }
  }
}
