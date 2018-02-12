<script>
import CvBaseCrud from './CvBaseCrud.vue';
export default {
  extends: CvBaseCrud,
  computed:{
    cMainGrid:function(){
      return this.$refs.mainGrid || null;
    }
  }
}
</script>

<style>
	.index-container{
		min-height:400px;
	}
</style>
