<template>
  <div class="cv-matcherizer-container">
    <div
      class="list-items"
    >
      <div
        ref="filterReference"
      >
        <cv-simple-filters
          v-bind="mDefMatcherizerProps()"
          :cv-search-message="cSourceMessage"
          :cv-active-filter="cShowingSelected"
          :cv-loading="cLoading"
          :cv-helper="cCurrentLabel"
          :cv-disable-fields="cDisableFields"
          @cv-search-key-up="keyed"
          @cv-event-filter-go-to-find="prepareToFindSource"
          @cv-search-focused="focused"
          @cv-search-blured="blured"
          @cv-search-cleared="resetCurrent"
        >
        </cv-simple-filters>
      </div>
        <!--TODO fix animation-->
        <q-slide-transition appear>
          <div>
            <ul
              v-if="cShowList && !cLoading"
              @mouseover="listIn"
              @mouseleave="listOut"
              class="list-group"
              :class="{'b-none':!cListOfItems || !cShowList}"
              :style="{'width':cContainerWidth}"
            >
                <li
                    class="list-group-item"
                    v-for="(row, rowKey) in cListOfItems"
                    v-on:click="add(rowKey,row)"
                    :class="{'single-selected':mValueCallBack(cListOfItems,row)===cCurrentValue,'current-cursor-item':currentItem===rowKey}"
                    :key="mValueCallBack(cListOfItems,row) + '|' + rowKey"
                    v-html="showPatter(mLabelCallBack(cListOfItems,row),mValueCallBack(cListOfItems,row)===cCurrentValue)"
                >
                </li>
                <li
                  v-if="cLoading"
                  class="list-group-item more-data-message"
                >
                  <q-spinner-facebook :size="18" class="q-mx-md txt-secondary-l-30"/>
                  <span class="txt-secondary-l-30">Cargando...</span>
                </li>
                <li
                  v-if="sourceCount && sourceCount > cListOfItemsLimit"
                  class="list-group-item more-data-message"
                >
                  <span class="txt-secondary-l-30">{{cMoreDataMessage}}</span>
                </li>
            </ul>
          </div>
        </q-slide-transition >
    </div>
  </div>
</template>
<script>
import CvCustomExtender                  from 'src/crudvuel/customs/components/matcherizer-components/CvMatcherizer'
import CvSimpleFilters                   from '../grid-components/CvSimpleFilters'
import {QIcon,QSlideTransition,QSpinner,QSpinnerFacebook} from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    CvSimpleFilters,
    QSlideTransition,
    QIcon,
    QSpinner,
    QSpinnerFacebook
  },
  props: [
    'cvHelper'
  ],
  computed: {
    cLimit: function () {
      return this.cvLimit || 50
    },
    cSearchIconColor: function () {
      return this.cvSearchIconColor || (this.cShowingSelected ? 'positive' : '')
    },
    cHelper: function () {
      return this.cvHelper || ''
    }
  },
  methods: {
    currentSelectedItemMark: function () {
      return '<i class="f-right fa fa-check text-positive"></i>'
    }
  }
}
</script>
