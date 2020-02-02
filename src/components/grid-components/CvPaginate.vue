<template>
  <div class="cv-paginate row"> <!--
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
    new VueMirroring().fixProperties({
    },'paginate')
  ],
  data () {
    return {
    }
  },
  props:[
  ],
  computed:{
  },
  methods:{
  },
  created:function(){
  }
}
</script>
