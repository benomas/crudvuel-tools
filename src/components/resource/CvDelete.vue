<script>
import CvBaseCrud from './CvBaseCrud.vue';
export default {
  extends: CvBaseCrud,
  data () {
    return {
    	rows:null
    }
  },
	methods:{
    deleteSuccess:function(response){
      this.row=null;
      this.ready=true;
    },
    deleteError:function(response){
      this.ready=true;
      if(this.serviceError(response))
          alert("error");
    },
    deleteParams:function(){
      return null;
    },
    delete:function(){
      this.services[this.resource].delete(
          this.deleteSuccess,
          this.deleteError,
          this.deleteParams()
      )
    }
  },
  mounted:function(){
		this.ready  =true;
  }
}
</script>

<style>
	.delete-container{
		min-height:400px;
	}
</style>