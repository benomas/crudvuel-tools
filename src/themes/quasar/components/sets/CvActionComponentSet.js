//import VueMirroring from 'crudvuel-tools/src/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvActionComponentSet   from '../../../../components/sets/CvActionComponentSet'
import CvComponentSet         from './CvComponentSet'
import CvNotifyComponentSet   from './CvNotifyComponentSet'
import CvActionContainer      from '../resource/CvActionContainer'
import {
  Dialog,
  QBtn,
  QCard,
  QIcon,
  QItem,
  QItemLabel,
  QSeparator,
  QItemSection,
  QList,
  QTooltip
} from 'quasar'
export default{
  mixins: [
    CvActionComponentSet,
    CvComponentSet,
    CvNotifyComponentSet
  ],
  components : {
    CvActionContainer,
    Dialog,
    QBtn,
    QCard,
    QIcon,
    QItem,
    QItemLabel,
    QSeparator,
    QItemSection,
    QList,
    QTooltip
  },
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
