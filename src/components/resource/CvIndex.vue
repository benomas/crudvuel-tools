<script>
import CvBaseCrud from './CvBaseCrud'
import CvGridMirroring from 'crudvuel-tools/src/components/grid-components/CvGridMirroring'
export default {
  mixins : [CvBaseCrud,CvGridMirroring],
	data (){
    return {
        mainGridData:null,
        gridRef:null
    }
	},
  computed:{
    cGridRef:function(){
      if(this.resource && this.resource.name && this.action)
        return  this.resource.name + '-'+this.action.name+'-grid'
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
  created:function(){
    this.gridRef = this.cGridRef
  },
  mounted:function(){
    this.mainGridData = this.$refs[this.gridRef] || null
  }
}
</script>
