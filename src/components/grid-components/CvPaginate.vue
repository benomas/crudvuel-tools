<template>
  <div class="cv-paginate row">
  <!--
    TODO:no dependencies template, need to be defined
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
    <br>-->
  </div>
</template>
<script>
import VueMirroring   from 'crudvuel-tools/src/mirroring/VueMirroring'
import CvComponentSet from 'crudvuel-tools/src/components/sets/CvComponentSet'

export default {
  mixins: [
    CvComponentSet,
    new VueMirroring('Paginate').fixProperties({
      '[P]staComLimitValues'        : [10,20,50,100,200],
      '[P|EM]dinComCurrentPage'     : 1,
      '[P]staComPagesPerView'       : 5,
      '[P]dinComTotalQueryElements' : 0,
      '[P]dinComTotalPageElements'  : 0,
      '[P|EM]dinComLimitSelected'   : 10,
      '[D|M]pageAnimationIn'        : 'animated fadeIn',
      '[D|M]pageAnimationOut'       : 'animated fadeIn',
      '[D|M]goto'                   : false,
      '[D|M]jumpedPage'             : false,
      '[EM]staComPageNavUp'         : null,
      '[EM]staComPageNavDown'       : null,
      '[EM]staComPageNavNeutral'    : null
    })
  ],

  computed: {
    cTotalPaginable () {
      return this.cpDinComLimitSelected < 1 ? 0 : Math.ceil(this.cpDinComTotalQueryElements/this.cpDinComLimitSelected);
    },

    cFixedPagesPerView () {
      if (this.cTotalPaginable < this.cpStaComPagesPerView)
        return parseInt(this.cTotalPaginable)
      return parseInt(this.cpStaComPagesPerView)
    },

    cRangeFixer (){
      return Math.floor(this.cFixedPagesPerView/2)
    },

    cPagesViewStart () {
      return this.cPagesViewRange[0]
    },

    cPagesViewEnd () {
      return this.cPagesViewRange[this.cPagesViewRange.length-1]
    },

    cPagesViewRange () {
      let fixForCenter
      let pageRange = []
      let start     = 1

      if(this.cTotalPaginable > this.cFixedPagesPerView && this.cpDinComCurrentPage > (fixForCenter=this.cRangeFixer)){
        if(this.cTotalPaginable <= this.cpDinComCurrentPage + fixForCenter)
          start = this.cTotalPaginable - this.cFixedPagesPerView + 1;
        else
          start = this.cpDinComCurrentPage - fixForCenter;
      }

      for(let x = 0; x < this.cFixedPagesPerView; x++)
        if(start + x <= this.cTotalPaginable)
          pageRange.push(start + x)
      return pageRange
    },

    cPaginateMessage () {
      return this.$tc('crudvuel.labels.paginate.records') + ' [' +
      ((this.cpDinComCurrentPage - 1) * this.cpDinComLimitSelected + 1) + ' - ' +
      ((this.cpDinComCurrentPage - 1) * this.cpDinComLimitSelected + this.cpDinComTotalPageElements) + ' ]' +
      ' / ' + this.cpDinComTotalQueryElements
    }
  },

  methods: {
    emDinComCurrentPageProccesor (page) {
      return new Promise ((resolve, reject) => {
        if (this.cpDinComCurrentPage == null ) {
          if (page === 1)
            this.emStaComPageNavNeutralEmitter()
          else
            this.emStaComPageNavUpEmitter()
        }
        else{
          if( page > this.cpDinComCurrentPage)
            this.emStaComPageNavUpEmitter()
          if( page < this.cpDinComCurrentPage)
            this.emStaComPageNavDownEmitter()
          if( page === this.cpDinComCurrentPage)
            this.emStaComPageNavNeutralEmitter()
        }
        this.mSetGoto(false)
        resolve(page)
      })
    },

    emStaComPageNavUpProccesor () {
      return new Promise ((resolve, reject) => {
        this.mSetPageAnimationIn('animated fadeInRight')
        this.mSetPageAnimationOut('animated fadeInRight')
        resolve()
      })
    },

    emStaComPageNavDownProccesor () {
      return new Promise ((resolve, reject) => {
        this.mSetPageAnimationIn('animated fadeInLeft')
        this.mSetPageAnimationOut('animated fadeInLeft')
        resolve()
      })
    },

    emStaComPageNavNeutralProccesor () {
      return new Promise ((resolve, reject) => {
        this.mSetPageAnimationIn('animated fadeIn')
        this.mSetPageAnimationOut('animated fadeIn')
        resolve()
      })
    },

    mJump:function(){
      this.mSetGoto(!this.cdGoto)
      if (this.cdGoto)
        return
      if(!(this.cdGoto) && this.cdJumpedPage>0 && this.cdJumpedPage <= this.cTotalPaginable && this.cdJumpedPage !== this.cpDinComCurrentPage)
        this.emDinComCurrentPageEmitter(this.cdJumpedPage)
      else
        this.emDinComCurrentPageEmitter(this.cpDinComCurrentPage)
    },

    emDinComLimitSelectedProccesor (limitSelected = null) {
      return new Promise ((resolve, reject) => {
        if (this.cpDinComLimitSelected == null || this.cpDinComLimitSelected < 1)
          reject(limitSelected)
        else{
          resolve(limitSelected)
          this.$nextTick().then(() => {
            let validcvCurrentPage = Math.ceil(this.cpDinComTotalQueryElements / limitSelected)
            this.emDinComCurrentPageEmitter(this.cpDinComCurrentPage > validcvCurrentPage ? validcvCurrentPage : this.cpDinComCurrentPage)
          })
        }
      })
    }
  }
}
</script>
