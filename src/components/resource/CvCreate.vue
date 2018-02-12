<script>
import CvBaseCrud from './CvBaseCrud.vue';
export default {
  extends: CvBaseCrud,
  data () {
    return {
    	rows:null,
    }
  },
	methods:{
    storeSuccess:function(response){
      this.row=response.data;
      this.ready=true;
    },
    storeError:function(response){
      this.ready=true;
      if(this.serviceError(response))
          alert("error");
    },
    storeParams:function(){
      return null;
    },
    store:function(){
      this.services[this.resource].store(
          this.storeSuccess,
          this.storeError,
          this.storeParams()
      )
    }
  },
  mounted:function(){
		this.ready  =true;
  }
}
</script>

<style>
	.create-container{
		min-height:400px;
	}
</style>
