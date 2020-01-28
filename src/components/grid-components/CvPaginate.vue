<template>
  <div class="cv-paginate row">
    <div class="col-xs-12 col-sm-6 pull-left">
      <div class="cv-paginate-buttons form-inline" style="min-height: 25px;">
        <button  type="button" class="btn btn-default" v-on:click="emPaginateSetPageEmitter(1)" v-if="hasLeft()">«</button>
        <button  v-for="position in cpPaginateCarrousel" type="button" class="btn btn-default"  v-on:click="emPaginateSetPageEmitter(position)" :class="{'active': position===cpPaginateCurrentPage}">{{position}}</button>

        <button  type="button" class="btn btn-default"  v-on:click="emPaginateSetPageEmitter(totalPaginated)" v-if="hasRight()">»</button>

        <button
          type="button" class="btn btn-default"
          v-on:click="jump()"
          v-if="cpPaginateCarrousel.length < totalPaginated"
        >
          {{!goTo?"Ir a":"Ir"}}
        </button>
        <input
          class="form-control"
          v-if="goTo"
          type="number"
          v-model.number="cdPaginateJumpedPage"
          :max="totalPaginated"
          min="0"
          v-on:keyup.13="jump()"
        >
      </div>

      <p>Estás en la página  {{cpPaginateCurrentPage}} de {{totalPaginated}}, viendo los registros {{(cpPaginateCurrentPage-1) * cpPaginateLimit + 1}} a {{(cpPaginateCurrentPage-1) * cpPaginateLimit + cpPaginateTotalPageElements}} de {{cpPaginateTotalQueryElements}} </p>
    </div>
    <div  class="col-xs-12 col-sm-6 pull-right text-right form-inline">
      Numero de Registros por Página :
      <select   class="form-control" v-model="this.paginateLimitSelected" @change='changeLimitPerPage(paginateLimitSelected)'>
        <option
            v-for="limitValue in cdStaCompLimitValues"
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
import VueMirroring   from 'crudvuel-tools/src/mirroring/VueMirroring'
import CvComponentSet from 'crudvuel-tools/src/components/sets/CvComponentSet'
export default {
  mixins: [
    CvComponentSet,
    new VueMirroring().fixProperties({
      '[P]staCompLimitValues' : [10,20,50,100,200],
      'Info'                  : {mode: 'D|M',init: {}},
      'LimitSelected'         : {mode: 'D|M',init: null},
      'goTo'                  : {mode: 'D|M',init: false},
      'JumpedPage'            : {mode: 'D|M',init: 0},
      'PageAnimationIn'       : {mode: 'D|M',init: 'animated fadeIn'},
      'PageAnimationOut'      : {mode: 'D|M',init: 'animated fadeIn'},
      'OldCarrusel'           : {mode: 'D|M',init: []},
      'Position'              : {mode: 'P',init: 'top'},
      'CurrentPage'           : {mode: 'P',init: 1},
      'TotalQueryElements'    : {mode: 'P'},
      'TotalPageElements'     : {mode: 'P'},
      'Limit'                 : {mode: 'P'},
      'PagesPerView'          : {mode: 'P'},
      'SetPage'               : {mode: 'EM'},
    },'paginate')
  ],
  data () {
    return {
    }
  },
  props:[
  ],
  computed:{
    totalPaginated:function(){
      return Math.ceil(this.cpPaginateTotalQueryElements/this.cpPaginateLimit);
    },
    cpPaginateCarrousel:function(){
      if (!this.cpReady)
        return this.cdPaginateOldCarrusel
      let carrusel =[];
      this.totalPaginado = Math.ceil(this.cpPaginateTotalQueryElements/this.cpPaginateLimit);
      let start          = 1;
      let fixForCenter;

      if(this.totalPaginado > this.cpPaginatePagesPerView && this.cpPaginateCurrentPage > (fixForCenter=Math.floor(this.cpPaginatePagesPerView/2))){
        if(this.totalPaginado <= this.cpPaginateCurrentPage + fixForCenter)
          start = this.totalPaginado - this.cpPaginatePagesPerView + 1;
        else
          start = this.cpPaginateCurrentPage - fixForCenter;
      }

      for(let x=0; x<this.cpPaginatePagesPerView; x++)
        if(start + x <=this.totalPaginado)
          carrusel.push(start+x);
      this.mSetPaginateOldCarrusel(carrusel)
      return carrusel;
    }
  },
  methods:{
    pageNavUp: function () {
      this.mSetPaginatePageAnimationIn('animated fadeInRight')
      this.mSetPaginatePageAnimationOut('animated fadeInRight')
      this.$emit('page-nave-up');
    },
    pageNavDown: function () {
      this.mSetPaginatePageAnimationIn('animated fadeInLeft')
      this.mSetPaginatePageAnimationOut('animated fadeInLeft')
      this.$emit('page-nave-down');
    },
    pageNavNeutral: function () {
      this.mSetPaginatePageAnimationIn('animated fadeIn')
      this.mSetPaginatePageAnimationOut('animated fadeIn')
      this.$emit('page-nave-neutral');
    },
    eventPage:function(response){
      this.$emit('event-page', this.cdPaginateInfo);
    },
    jump:function(){
      this.mSetPaginategoTo(!this.cdPaginategoTo)
      if(!(this.cdPaginategoTo) && this.cdPaginateJumpedPage>0 && this.cdPaginateJumpedPage <= this.totalPaginated && this.cdPaginateJumpedPage !== this.cpPaginateCurrentPage)
        return this.emPaginateSetPageEmitter(this.jumpedPage);
      this.mSetPaginateJumpedPage(this.cpPaginateCurrentPage)
    },
    emPaginateSetPageProccesor:function(page){
      return new Promise ((resolve, reject) => {
        if (this.cdPaginateInfo.page == null ) {
          if (page === 1)
            this.pageNavNeutral()
          else
            this.pageNavUp()
        }
        else{
          if( page > this.cdPaginateInfo.page)
            this.pageNavUp()
          if( page < this.cdPaginateInfo.page)
            this.pageNavDown()
          if( page === this.cdPaginateInfo.page)
            this.pageNavNeutral()
        }
        this.mSetPaginategoTo(false)
        this.info.page     = page;
        this.info["limit"] = this.cpPaginateLimit;
        this.eventPage();
      })
    },
    changeLimitPerPage:function(limit = null){
      if (!limit || limit.value == null || limit.value < 1)
        return

      let validcvCurrentPage = Math.ceil(this.cpPaginateTotalQueryElements/limit.value);
      this.info["limit"] = limit.value;
      this.info.page     = this.cpPaginateCurrentPage>validcvCurrentPage?validcvCurrentPage:this.cpPaginateCurrentPage;
      this.pageNavNeutral()
      this.eventPage();
    },
    hasLeft:function(){
      return this.cpPaginateCarrousel && this.cpPaginateCarrousel.length && this.cpPaginateCarrousel[0] >1;
    },
    hasRight:function(){
      return this.cpPaginateCarrousel && this.cpPaginateCarrousel.length && this.cpPaginateCarrousel[this.cpPaginateCarrousel.length-1] < this.totalPaginado;
    },
    refreshParams: function () {
      if(this.cpPaginateLimit ===  "" || this.cpPaginateLimit ===  null)
        this.cpPaginateLimit = 25;
      if(this.cpPaginatePagesPerView ===  "" || this.cpPaginatePagesPerView ===  null)
        this.cpPaginatePagesPerView = 5;
      this.mSetPaginateLimitSelect(this.cpPaginateLimit)
    }
  },
  created:function(){
    this.refreshParams()
  }
}
</script>
