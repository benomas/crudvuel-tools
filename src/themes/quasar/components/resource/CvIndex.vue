<script>
import CvCustomExtender  from 'src/crudvuel/customs/components/resource/CvIndex'
import CvOrderIcons      from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvOrderIcons'
import CvThs             from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvThs'
import CvActionContainer from './CvActionContainer'
import {
  Dialog,
  QBtn,
  QCard,
  QCardActions,
  QCardTitle,
  QIcon,
  QItem,
  QItemMain,
  QItemSeparator,
  QItemSide,
  QItemTile,
  QList,
  QTooltip,
  QCardMedia
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
    QCardActions,
    QCardTitle,
    QIcon,
    QItem,
    QItemMain,
    QItemSeparator,
    QItemSide,
    QItemTile,
    QList,
    QTooltip,
    QCardMedia
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
    }
  },
  methods: {
    fLang: function (field) {
      let word = 'crudvuel.resources.' + this.resource.name + '.fields.' + field
      return  this.$tc(word)
    },
    defActionProps: function () {
      return {
        'cv-resource'         : this.resource,
        'cv-action'           : this.action,
        'cv-ready'            : this.cReady,
        'cv-show-own-spinner' : false
      }
    }
  }
}
</script>
