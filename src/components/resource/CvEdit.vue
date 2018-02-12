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
    showSuccess:function(response){
      this.row=response.data;
      this.ready=true;
    },
    showError:function(response){
      this.ready=true;
      if(this.serviceError(response))
          alert("error");
    },
    showParams:function(){
      return null;
    },
    show:function(){
      this.services[this.resource].store(
          this.storeSuccess,
          this.storeError,
          this.storeParams()
      )
    },
    updateSuccess:function(response){
      this.row=response.data;
      this.ready=true;
    },
    updateError:function(response){
      this.ready=true;
      alert("error");
    },
    updateParams:function(){
      return null;
    },
    update:function(){
      this.services[this.resource].store(
          this.storeSuccess,
          this.storeError,
          this.storeParams()
      )
    }
  },
  mounted:function(){
		this.ready  =false;
  	this.show();
  }
}
</script>

<style>
	.edit-container{
		min-height:400px;
	}
</style>