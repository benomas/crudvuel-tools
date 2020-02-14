<template>
  <div class="cv-paginate row txt-secondary q-pa-sm">
    <div class="row w-100"><!--
      <div class="row col-xs-12">
        cpStaComLimitValues        : {{cpStaComLimitValues}}<br>
        cFixedPagesPerView         : {{cFixedPagesPerView}}<br>
        cpDinComCurrentPage        : {{cpDinComCurrentPage}}<br>
        cpDinComTotalQueryElements : {{cpDinComTotalQueryElements}}<br>
        cpDinComTotalPageElements  : {{cpDinComTotalPageElements}}<br>
        cpDinComLimitSelected      : {{cpDinComLimitSelected}}<br>
        cTotalPaginable            : {{cTotalPaginable}}<br>
        cRangeFixer                : {{cRangeFixer}}<br>
      </div>-->
      <div class="row col-xs-10 col-sm-8 col-md-6 justify-start">
        <div class="cv-paginate-buttons form-inline mnh-22px">
          <q-btn @click="emDinComCurrentPageEmitter(1)" v-if="cPagesViewStart > 1" size="sm" class="bg-secondary-l-84 txt-white">«</q-btn>
          <span>
            <span>
              <q-tooltip  :disable="!cpDinComTotalPageElements || (!cXs && !cSm)"  class="fs-5">
                {{cPaginateMessage}}
              </q-tooltip>
              <transition-group
                :enter-active-class="pageAnimationIn"
                :duration="{ enter: 500, leave: 0 }">
                <q-btn
                  v-if="position!==cpDinComCurrentPage"
                  size="sm"
                  v-for="position in cPagesViewRange"
                  :key="position"
                  @click="emDinComCurrentPageEmitter(position)"
                  class="t-center t-middle bg-secondary-l-90 txt-white"
                >
                  <span class="fs-5">{{position}}</span>
                </q-btn>
                <q-btn
                  v-else
                  size="sm"
                  :key="position"
                  class="bg-secondary txt-white"
                  @click="emDinComCurrentPageEmitter(position)"
                >
                  {{position}}
                </q-btn>
              </transition-group>
            </span>
          </span>
          <q-btn size="sm" @click="emDinComCurrentPageEmitter(cTotalPaginable)" v-if="cPagesViewEnd < cTotalPaginable" class="bg-secondary-l-84 txt-white">»</q-btn>
          <span class="mnh-25px" >
            <q-btn
              size="sm"
              class="w-60px bg-secondary-l-69 txt-white t-center t-middle "
              @click="mJump()"
              v-if="cPagesViewRange.length < cTotalPaginable"
            >
              <span class="fs-5">{{!goto?"Ir a":"Ir"}}</span>
            </q-btn>
            <q-input
              v-if="goto"
              outlined
              dense
              hide-bottom-space
              type="number"
              v-model.number="jumpedPage"
              :max="cTotalPaginable"
              min="1"
              @keyup.13="mJump()"
              class="w-50px q-mx-sm"
            />
          </span>
        </div>
      </div>
      <div class="row col-xs-2 col-sm-4 col-md-6 justify-end">
        <div class="my-auto">
          <label class="fs-5 q-pr-sm gt-xs">
            {{$tc('crudvuel.labels.paginate.recordsPerPage')}}:
          </label>
        </div>
        <q-select
          dense
          options-cover
          dropdown-icon="fas fa-caret-down"
          class="q-ma-xs q-select-custom"
          style="display:inline-flex;"
          :value="cpDinComLimitSelected"
          @input='emDinComLimitSelectedEmitter'
          :options="cpStaComLimitValues" >
        </q-select>
      </div>
      <div class="row col-xs-12" v-if="cpDinComTotalPageElements">
        <span>{{cPaginateMessage}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CvPaginate                           from '../../../../components/grid-components/CvPaginate'
import {QTooltip,QIcon,QBtn,QSelect,QField} from 'quasar'
import VueMirroring                         from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Paginate')
export default {
  mixins: [
    vueMirroring.fixProperties({
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
  extends    : CvPaginate,
  components : {
    QTooltip,
    QIcon,
    QBtn,
    QField,
    QSelect
  },
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
