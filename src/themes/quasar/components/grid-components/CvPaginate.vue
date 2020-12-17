<template>
  <div class="cv-paginate row txt-secondary q-pa-sm">
    <div class="row w-100">
      <div class="row col-xs-10 col-sm-8 col-md-6 justify-start">
        <div class="cv-paginate-buttons form-inline mnh-22px">
          <q-btn @click="emDinComCurrentPageEmitter(1)" v-if="cPagesViewStart > 1" size="sm" class="bg-secondary-l-84 txt-white">«</q-btn>
          <span>
            <span>
              <q-tooltip  :disable="!cpDinComTotalPageElements || (!cXs && !cSm)"  content-class="bg-secondary-l-90 txt-secondary-l-66 f-rem-2">
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
                  :class="mFixedButtonClass(position)"
                  >
                  <span class="fs-5">{{position}}</span>
                </q-btn>

                <q-btn
                  v-else
                  size="sm"
                  :key="position"
                  class="bg-secondary txt-white"
                  :class="mFixedButtonClass(position)"
                  @click="emDinComCurrentPageEmitter(position)">
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
import CvComponentExtraSet                  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import CvPaginate                           from 'crudvuel-tools/src/components/grid-components/CvPaginate'
import {QTooltip,QIcon,QBtn,QSelect,QField,QInput} from 'quasar'

export default {
  mixins: [
    CvPaginate,
    CvComponentExtraSet
  ],

  components : {
    QTooltip,
    QIcon,
    QBtn,
    QField,
    QSelect,
    QInput
  }
}
</script>
