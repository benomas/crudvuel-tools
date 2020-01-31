//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvMultiRowComponentSet   from 'crudvuel-tools/src/components/sets/CvMultiRowComponentSet'
import CvOrderIcons             from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvOrderIcons'
import CvThs                    from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvThs'
export default{
  mixins: [
    CvMultiRowComponentSet
  ],
  components : {
    CvOrderIcons,
    CvThs
  },
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cRowKey: function () {
      return 'id'
    }
  },
  methods: {
  }
}
