<template>
  <div class="cv-paginate row">
    <div class="col-xs-12 col-sm-6 pull-left">
      <div class="cv-paginate-buttons form-inline" style="min-height: 25px;">
        <button  type="button" class="btn btn-default" v-on:click="setPage(1)" v-if="hasLeft()">«</button>
        <button  v-for="posicion in carrousel" type="button" class="btn btn-default"  v-on:click="setPage(posicion)" :class="{'active': posicion===currentPage}">{{posicion}}</button>

        <button  type="button" class="btn btn-default"  v-on:click="setPage(totalPaginated)" v-if="hasRight()">»</button>

        <button
          type="button" class="btn btn-default"
          v-on:click="jump()"
          v-if="carrousel.length < totalPaginated"
        >
          {{!goTo?"Ir a":"Ir"}}
        </button>
        <input
          class="form-control"
          v-if="goTo"
          type="number"
          v-model.number="jumpedPage"
          :max="totalPaginated"
          min="0"
          v-on:keyup.13="jump()"
        >
      </div>

      <p>Estás en la página  {{currentPage}} de {{totalPaginated}}, viendo los registros {{(currentPage-1) * cvLimit + 1}} a {{(currentPage-1) * cvLimit + cvTotalPageElements}} de {{cTotalQueryElements}} </p>
    </div>
    <div  class="col-xs-12 col-sm-6 pull-right text-right form-inline">
      Numero de Registros por Página :
      <select   class="form-control" v-model="limitSelected" @change='changeLimitPerPage(limitSelected)'>
        <option
            v-for="limitValue in limitValues"
        >
            {{limitValue}}
        </option>
      </select>
    </div>
    <br>
    <br>
  </div>
</template>
<script>
export default {
  data () {
    return {
      info               : {},
      limitSelected      : null,
      totalQueryElements :0,
      totalPageElements  :0,
      limit              :0,
      pagesPerView       :0,
      goTo               :false,
      jumpedPage         :0,
    }
  },
  props:[
    "cvTotalQueryElements",
    "cvTotalPageElements",
    "cvCurrentPage",
    "cvLimit",
    "cvPagesPerView",
    "cvLimitValues",
  ],
  computed:{
    cTotalQueryElements:function(){
      return this.cvTotalQueryElements;
    },
    totalPaginated:function(){
      return Math.ceil(this.cvTotalQueryElements/this.cvLimit);
    },
    carrousel:function(){

      let carrusel =[];
      this.limitSelected = this.cvLimit;
      this.totalPaginado = Math.ceil(this.cvTotalQueryElements/this.cvLimit);
      let start          = 1;
      let fixForCenter;

      if(this.totalPaginado > this.cvPagesPerView && this.currentPage > (fixForCenter=Math.floor(this.cvPagesPerView/2))){
        if(this.totalPaginado <= this.currentPage + fixForCenter)
          start = this.totalPaginado - this.cvPagesPerView + 1;
        else
          start = this.currentPage - fixForCenter;
      }

      for(let x=0; x<this.cvPagesPerView; x++)
        if(start + x <=this.totalPaginado)
          carrusel.push(start+x);
      return carrusel;
    },
    limitValues:function(){
      return this.cvLimitValues ||  [10,20,50,100,200];
    },
    currentPage:function(){
      return (this.cvCurrentPage ===  "" || this.cvCurrentPage ===  null)?1:this.cvCurrentPage;
    }
  },
  methods:{
    eventPage:function(response){
      this.$emit('event-page', this.info);
    },
    jump:function(){
      if(!(this.goTo=!this.goTo) && this.jumpedPage>0 && this.jumpedPage <= this.totalPaginated && this.jumpedPage !== this.currentPage)
        return this.setPage(this.jumpedPage);
      this.jumpedPage = this.currentPage;
    },
    setPage:function(page){
      this.goTo=false;
      this.info["page"]  = page;
      this.info["limit"] = this.cvLimit;
      this.eventPage();
    },
    changeLimitPerPage:function(limit){
      let validcvCurrentPage = Math.ceil(this.cvTotalQueryElements/limit);
      this.info["limit"]   = limit;
      this.info["page"]    = this.currentPage>validcvCurrentPage?validcvCurrentPage:this.currentPage;
      this.eventPage();
    },
    hasLeft:function(){
      return this.carrousel && this.carrousel.length && this.carrousel[0] >1;
    },
    hasRight:function(){
      return this.carrousel && this.carrousel.length && this.carrousel[this.carrousel.length-1] < this.totalPaginado;
    }
  },
  created:function(){
    if(this.cvLimit ===  "" || this.cvLimit ===  null)
      this.cvLimit = 25;
    if(this.cvPagesPerView ===  "" || this.cvPagesPerView ===  null)
      this.cvPagesPerView = 5;
    this.limitSelected=this.cvLimit;
  }
}
</script>
<style lang="scss" scoped>
.cv-paginate{
  padding-top:5px;
  & button{
    cursor:pointer;
    border: 1px outset ThreeDLightShadow;
    border-radius:5px;
    &.active{
      background-color: #CCCCCC;
      color:white;
      &:hover{
        color:white;
      };
    }
    &:hover{
      color:white;
    };
  }
  p{
    margin:0;
  }
}
</style>












