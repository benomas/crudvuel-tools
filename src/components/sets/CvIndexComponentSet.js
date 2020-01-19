//import VueMirroring from 'crudvuel-tools/src/VueMirroring'
//let vueMirroring = new VueMirroring()
import CvMultiRowComponentSet from 'crudvuel-tools/src/components/sets/CvMultiRowComponentSet'
import CvGridMirroring        from 'crudvuel-tools/src/components/grid-components/CvGridMirroring'
export default{
  mixins: [
    CvGridMirroring,
    CvMultiRowComponentSet
  ],
  data () {
    return {
        mainGridData:null,
        gridRef:null
    }
  },
  props: [
  ],
  computed: {
    cGridRef:function(){
      if(this.cpAction)
        return  this.cResource.name + '-'+this.cpAction.name+'-grid'
      return "mainGrid"
    },
    cGridEl:function(){
      if (!this.cGridRef || this.$refs[this.cGridRef] == null)
        return null
      return this.$refs[this.cGridRef]
    },
    cEnableSuperFilers: function () {
      return this.cdGridCurrentFilter==='simple-filters'
    }
  },
  methods: {
  },
  created: function () {
    this.gridRef = this.cGridRef
  },
  mounted:function(){
    this.mainGridData = this.$refs[this.gridRef] || null
  }
}
