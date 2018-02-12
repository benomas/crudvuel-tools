<script>
import CvBaseCrud from './CvBaseCrud.vue';
export default {
  extends: CvBaseCrud,
  data () {
    return {
    	rows:[],
      gridContext:null
    }
  },
  computed:{
  },
	methods:{
    loadGridContext:function(gridContext){
      this.gridContext=gridContext;
      this.rows=gridContext.rows;
      this.ready=true;
    },
    indexSuccess:function(response){
      this.rows=response.data.data;
      this.ready=true;
    },
    indexError:function(response){
      this.ready=true;
      if(this.serviceError(response))
        alert("error");
    },
    indexParams:function(){
      return null;
    },
    index:function(indexSuccess,indexError,indexParams,url,queryString){
      this.ready=false;
      indexSuccess=indexSuccess||this.indexSuccess;
      indexError=indexError||this.indexError;
      indexParams=indexParams||this.indexParams();
      url=url||null;
      this.services[this.resource.resource].index(
        indexSuccess,
        indexError,
        indexParams,
        url,
        queryString,
      )
    }
  },
  mounted:function(){
		this.ready  =false;
    //this.index();
  }
}
</script>

<style>
	.index-container{
		min-height:400px;
	}
</style>
