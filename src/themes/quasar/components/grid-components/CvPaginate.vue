<template>
  <div class="cv-paginate row">
    <div class="col-xs-12 col-sm-10 col-md-7 pull-left">
      <div class="cv-paginate-buttons form-inline mnh-25px">
        <q-btn @click="setPage(1)" v-if="hasLeft()" size="sm" class="btn btn-default">«</q-btn>
        <span>
          <span>
            <q-tooltip  :disable="!cXs && !cSm" cPosition class="fs-5">
              {{cPaginateMessage}}
            </q-tooltip>
            <transition-group
              :enter-active-class="pageAnimationIn"
              :duration="{ enter: 500, leave: 0 }"
            >
              <q-btn
                size="sm"
                v-for="position in carrousel"
                :key="position"
                @click="setPage(position)"
                :color="position===currentPage?'primary':''"
                :class="{'bg-secondary': position===currentPage}"
                v-if="cReady || position!==currentPage"
                class="btn btn-default"
              >
                {{position}}
              </q-btn>
              <q-btn
                size="sm"
                v-else
                :key="position"
                class="btn btn-default"
                @click="setPage(position)"
              >
                {{position}}
              </q-btn>
            </transition-group>
          </span>
          <q-btn size="sm" @click="setPage(totalPaginated)" v-if="hasRight()" class="btn btn-default">»</q-btn>
          <span class="mnh-25px" >
            <q-btn
              size="sm"
              class="btn btn-default"
              @click="jump()"
              v-if="carrousel.length < totalPaginated"
            >
              {{!goTo?"Ir a":"Ir"}}
            </q-btn>
            <q-field
              v-if="goTo"
              class="w-50px q-mx-sm"
            >
              <q-input
                type="number"
                v-model.number="jumpedPage"
                :max="totalPaginated"
                min="0"
                @keyup.13="jump()"
                class=""
              />
            </q-field>
          </span>
          <q-select
            class="lt-md q-ma-sm"
            style="display:inline-flex;"
            v-model="limitSelected"
            @input='changeLimitPerPage(limitSelected)'
            :hide-underline="true"
            :options="cKeyedLimitValuesArray">
          </q-select>
        </span>
      </div>
    </div>
    <div class="col-xs-6 f-left lt-sm" >
    </div>
    <div  class="col-md-5 f-right text-right form-inline  gt-sm">
      <label class="gt-sm fs-5">
        {{$tc('crudvuel.labels.paginate.recordsPerPage')}}:
      </label>
      <q-select
        class="q-ma-sm q-select-custom"
        style="display:inline-flex;"
        v-model="limitSelected"
        @input='changeLimitPerPage(limitSelected)' :options="cKeyedLimitValuesArray" >
      </q-select>
    </div>
    <div class="col-md-12 f-right gt-sm mnh-25px fs-5 q-py-xs">
      {{cPaginateMessage}}
    </div>
    <br>
    <br>
  </div>
</template>
<script>
import CvCustomExtender   from 'src/crudvuel/customs/components/grid-components/CvPaginate.vue'
import {QTooltip,CloseOverlay,QWindowResizeObservable,QIcon,QBtn,QSelect,QField} from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    QTooltip,
    QIcon,
    QBtn,
    QField,
    QWindowResizeObservable,
    QSelect
  },
  directives: {
    CloseOverlay
  },
  computed: {
    cKeyedLimitValuesArray: function () {
      let arrayLimitValues = []
      if (this.limitValues && this.limitValues.length) {
        for (let i = 0; i < this.limitValues.length; i++)
          arrayLimitValues.push({label: this.limitValues[i].toString(),value: this.limitValues[i].toString()})
      }
      return arrayLimitValues
    },
    cPaginateMessage: function () {
      return this.$tc('crudvuel.labels.paginate.records') + ' [' +
      ((this.currentPage - 1) * this.cvLimit + 1) + ' - ' +
      ((this.currentPage - 1) * this.cvLimit + this.cvTotalPageElements) + ' ]' +
      ' / ' + this.cTotalQueryElements
    }
  },
  methods: {
    refreshParams: function () {
      if (this.cvLimit ===  '' || this.cvLimit ===  null)
        this.cvLimit = 25
      if (this.cvPagesPerView ===  '' || this.cvPagesPerView ===  null)
        this.cvPagesPerView = 5
      this.$set(this,'limitSelected',this.cvLimit.toString())
    }
  },
  created: function () {
    this.refreshParams()
  }
}
</script>
<style lang="stylus" scoped>
  .q-field
    display:inline-flex
    &.q-input
      padding-top:0
      padding-bottom:0
  .q-btn
    padding: 4px 10px !important
    webkit-box-shadow: none
    box-shadow: none
  .q-select-custom
    padding-top: 0
    padding-bottom: 0
    margin:0
</style>
