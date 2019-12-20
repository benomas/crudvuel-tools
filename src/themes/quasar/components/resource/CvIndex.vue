<script>
import CvCustomExtender  from 'src/crudvuel/customs/components/resource/CvIndex'
import CvOrderIcons      from '../grid-components/CvOrderIcons'
import CvThs             from '../grid-components/CvThs'
import CvActionContainer from './CvActionContainer'
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
export default {
  extends    : CvCustomExtender,
  components : {
    CvActionContainer,
    CvOrderIcons,
    CvThs,
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
  computed: {
    cvGridComponentSwitch: function () {
      return this.isMobile ? 'CvFlexiGridIndex' : 'CvTableGridIndex'
    },
    cvGridCellSwitch: function () {
      return this.isMobile ? 'div' : 'td'
    },
    cvGridCellClassSwitch: function () {
      return this.isMobile ? 'col-lg-12' : ''
    },
    cvGridShowCellLabel: function () {
      return this.isMobile
    },
    cMyGridSystem: function () {
      if (this.gridRefs['grid-system-' + this.resource.name + '-ref'] != null)
        return this.gridRefs['grid-system-' + this.resource.name + '-ref']
      if (this.gridRefs['grid-system-ref'] != null)
        this.gridRefs['grid-system-ref'] != null
      return null
    }
  },
  methods: {
    fLang: function (field) {
      let word = 'crudvuel.resources.' + this.resource.name + '.fields.' + field
      return  this.$tc(word)
    },
    defActionProps: function () {
      return {
        'cv-parent-ref'       : this.cSelfRef,
        'cv-resource'         : this.resource,
        'cv-action'           : this.action,
        'cv-ready'            : this.cReady,
        'cv-show-own-spinner' : false
      }
    }
  }
}
</script>
