//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvIndexComponentSet      from 'crudvuel-tools/src/components/sets/CvIndexComponentSet'
import CvMultiRowComponentSet   from 'crudvuel-tools/src/themes/quasar/components/sets/CvMultiRowComponentSet'
import CvGridMirroring          from 'crudvuel-tools/src/components/grid-components/CvGridMirroring'
export default{
  mixins: [
    CvIndexComponentSet,
    CvGridMirroring,
    CvMultiRowComponentSet
  ],
  data () {
    return {
        mainGridData : null,
        gridRef      : null,
        gridRefs     : {}
    }
  },
  props: [
  ],
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
      if (this.gridRefs['grid-system-' + this.cResource.name + '-ref'] != null)
        return this.gridRefs['grid-system-' + this.cResource.name + '-ref']
      if (this.gridRefs['grid-system-ref'] != null)
        this.gridRefs['grid-system-ref'] != null
      return null
    }
  },
  methods: {/*
    fLang: function (field) {
      let word = 'crudvuel.resources.' + this.cResource.name + '.fields.' + field
      return  this.$tc(word)
    },*/
    defActionProps: function () {
      return {
        'cv-parent-ref'       : this.cSelfRef,
        'cv-resource'         : this.resource,
        'cv-action'           : this.cpStaGenAction,
        'cv-ready'            : this.cReady,
        'cv-show-own-spinner' : false
      }
    }
  },
  created: function () {
    this.gridRef = this.cGridRef
  },
  mounted:function(){
    this.mainGridData = this.$refs[this.gridRef] || null
  }
}
