<template>
  <div class="cv-paginate row txt-secondary">
    <div class="row w-100">
      <div class="row col-xs-10 col-sm-8 col-md-6 justify-start">
        <div class="cv-paginate-buttons form-inline mnh-22px">
          <q-btn @click="setPage(1)" v-if="hasLeft()" size="sm" class="bg-secondary-l-84 txt-white">«</q-btn>
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
                  :class="{'bg-secondary': position===currentPage,'bg-secondary-l-90':position!==currentPage}"
                  v-if="cReady || position!==currentPage"
                  class="t-center t-middle"
                >
                  <span class="fs-5">{{position}}</span>
                </q-btn>
                <q-btn
                  size="sm"
                  v-else
                  :key="position"
                  class=""
                  @click="setPage(position)"
                >
                  {{position}}
                </q-btn>
              </transition-group>
            </span>
            <q-btn size="sm" @click="setPage(totalPaginated)" v-if="hasRight()" class="bg-secondary-l-84 txt-white">»</q-btn>
            <span class="mnh-25px" >
              <q-btn
                size="sm"
                class="w-60px"
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
          v-model="limitSelected"
          @input='changeLimitPerPage(limitSelected)' :options="cKeyedLimitValuesArray" >
        </q-select>
      </div>
      <div class="row col-xs-12">
        <span>{{cPaginateMessage}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CvPaginate from '../../../../components/grid-components/CvPaginate'
import {QTooltip,QIcon,QBtn,QSelect,QField} from 'quasar'
export default {
  extends    : CvPaginate,
  components : {
    QTooltip,
    QIcon,
    QBtn,
    QField,
    QSelect
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
