//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvActionComponentSet   from 'crudvuel-tools/src/components/sets/CvActionComponentSet'
import CvComponentSet         from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import CvNotifyComponentSet   from 'crudvuel-tools/src/themes/quasar/components/sets/CvNotifyComponentSet'
import CvActionContainer      from 'crudvuel-tools/src/themes/quasar/components/resource/CvActionContainer'
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
