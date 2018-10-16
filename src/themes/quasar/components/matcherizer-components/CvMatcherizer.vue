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
          @cv-simple-search-key-up="keyed"
          @cv-simple-filter-go-to-find="prepareToFindSource"
          @cv-simple-search-focused="focused"
          @cv-simple-search-blured="blured"
          @cv-simple-search-cleared="resetCurrent"
        >
        </cv-simple-filters>
      </div>
        <q-slide-transition>
          <ul
            v-if="cShowList"
            @mouseover="listIn"
            @mouseleave="listOut"
            class="list-group"
            :style="{'width':cContainerWidth}"
          >
              <li
                  v-if="!cLoading"
                  class="list-group-item"
                  v-for="(row, rowKey) in cListOfItems"
                  v-on:click="add(rowKey,row)"
                  :class="{'single-selected':mValueCallBack(cListOfItems,row)===cCurrentValue,'current-cursor-item':currentItem===rowKey}"
                  :key="mValueCallBack(cListOfItems,row)"
                  v-html="showPatter(mLabelCallBack(cListOfItems,row),mValueCallBack(cListOfItems,row)===cCurrentValue)"
              >
              </li>
              <li
                v-if="cLoading"
                class="list-group-item more-data-message"
              >
                Cargando...
              </li>
              <li
                v-if="sourceCount && sourceCount > cListOfItemsLimit"
                class="list-group-item more-data-message"
              >
                {{cMoreDataMessage}}
              </li>
          </ul>
        </q-slide-transition>
    </div>
  </div>
</template>
<script>
import CvCustomExtender         from 'src/crudvuel/customs/components/matcherizer-components/CvMatcherizer'
import CvSimpleFilters          from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvSimpleFilters'
import {QIcon,QSlideTransition} from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    CvSimpleFilters,
    QSlideTransition,
    QIcon
  },
  props: [
    'cvHelper'
  ],
  computed: {
    cLimit: function () {
      return this.cvLimit || 50
    },
    cSimpleSearchIconColor: function () {
      return this.cvSimpleSearchIconColor || (this.cShowingSelected ? 'positive' : '')
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
