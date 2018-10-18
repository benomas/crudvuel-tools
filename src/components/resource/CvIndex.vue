<script>
import CvBaseCrud from './CvBaseCrud'
export default {
  extends: CvBaseCrud,
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
