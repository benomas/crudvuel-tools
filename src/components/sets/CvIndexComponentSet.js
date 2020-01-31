//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
export default{
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
      if(this.cpStaGenAction)
        return  this.cResource.name + '-'+this.cpStaGenAction.name+'-grid'
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
