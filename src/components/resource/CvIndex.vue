<script>
import CvBaseCrud from './CvBaseCrud.vue';
export default {
  extends: CvBaseCrud,
	data (){
    return {
        mainGridData:null,
    }
	},
  computed:{
  },
  mounted:function(){
    this.mainGridData = this.$refs.mainGrid || null;
  }
}
</script>

<style>
	.index-container{
		min-height:400px;
	}
</style>
