//import VueMirroring from 'crudvuel-tools/src/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvMultiRowComponentSet from '../../../../components/sets/CvMultiRowComponentSet'
import CvActionComponentSet     from './CvActionComponentSet'
import CvOrderIcons           from '../grid-components/CvOrderIcons'
import CvThs                  from '../grid-components/CvThs'
export default{
  mixins: [
    CvMultiRowComponentSet,
    CvActionComponentSet
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
