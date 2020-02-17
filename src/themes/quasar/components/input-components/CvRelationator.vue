<template>
  <div class="row cv-relator-container">
    <div class="col-xs-12 col-sm-6 related-items q-pa-sm">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cRelatedLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive" class="txt-white">
          {{cdFilteredRelated.length}} / {{cpDinInsRelated.length}}
        </q-chip>
        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBingins('cv-simple-filter-related')"
          v-on="mOns('cv-simple-filter')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(row, rowKey) in cdFilteredRelated"
          :key="mDinamicIndex(row)"
          @click="removeRelated(rowKey,row)"
        >
          <q-icon v-if="!cDisableFields" name="fas fa-minus-square" class="f-right"/>
          {{row[cLabelProperty]}}
        </li>
      </ul>
    </div>
    <div class="col-xs-12 col-sm-6 related-items q-pa-sm">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cSourceLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive"
          class="txt-white"
          >
          {{cdFilteredSource.length}} / {{cpDinInsSource.length}}
        </q-chip>
        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBingins('cv-simple-filter-source')"
          v-on="mOns('cv-simple-filter')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(row, rowKey) in cdFilteredSource"
          :key="mDinamicIndex(row)"
          @click="addRelated(rowKey,row)"
        >
          <q-icon v-if="!cDisableFields" name="fas fa-plus-square" class="f-left"/>
          {{row[cLabelProperty]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CvComponentSet         from 'crudvuel-tools/src/components/sets/CvComponentSet'
import CvResourceComponentSet from 'crudvuel-tools/src/components/sets/CvResourceComponentSet'
import CvSimpleFilter         from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import VueMirroring           from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Relationator')
import {QIcon,QChip}        from 'quasar'
export default {
  mixins: [
    //CvMatcherizer,
    CvComponentSet,
    CvResourceComponentSet,
    vueMirroring.fixProperties({
      '[P]dinInsSource'        : [],
      '[P]dinInsSourceLoaded'  : [],
      '[P]dinInsRelated'       : [],
      '[P]dinInsLabelCallBack' : (row) => row.name,
      '[P]dinInsValueCallBack' : (row) => row.name,
      '[D|M]filteredSource'    : [],
      '[D|M]filteredRelated'   : []
    }),
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true,posFix:'source'},
      {CvSimpleFilter,root: true,posFix:'related'}
    )
  ],
  components: {
    CvSimpleFilter,
    QIcon,
    QChip
  },
  data: function () {
    return {
      /*
      source        : [],
      related       : [],
      relatedSearch : '',
      sourceSearch  : '',
      filterSource  : [],
      filterRelated : []*/
    }
  },
  props: [/*
    'cvSource',
    'cvRelated',
    'cvLabelProperty',
    'cvRelatedIdentifier',
    'cvDisableFields'*/
  ],
  computed: {
    cRelatedLabel () {
      let trans = this.mComLang('relatedLabel')
      if (trans !== '')
        return trans
      return 'Asignados'
    },
    cSourceLabel () {
      let trans = this.mComLang('sourceLabel')
      if (trans !== '')
        return trans
      return 'Disponibles'
    }
    /*
    cSource: function () {
      return this.cvSource
    },
    cRelated: function () {
      return this.cvRelated
    },
    cLocalSource: function () {
      return this.source
    },
    cLocalRelated: function () {
      return this.related
    },
    cLabelProperty: function () {
      return this.cvLabelProperty || 'name'
    },
    cKeyProperty: function () {
      return this.cvKeyProperty || 'id'
    },
    cRelatedIdentifier: function () {
      return this.cvRelatedIdentifier
    },
    cSourceSearch: function () {
      return this.sourceSearch
    },
    cRelatedSearch: function () {
      return this.relatedSearch
    },
    cFilteredSource: function () {
      return this.filterSource
    },
    cFilteredRelated: function () {
      return this.filterRelated
    },
    cSearchKeyInterruption: function () {
      return this.cvSearchKeyInterruption || 250
    }*/
  },
  mounted: function () { /*
    if (this.cRelated && this.cRelated.length > 0)
      for (let i = 0; i < this.cSource.length; i++) {
        let sourceRow = this.cSource[i]
        let skip = false
        for (let j = 0; j < this.cRelated.length; j++) {
          let relatedRow = this.cRelated[j]
          if (sourceRow[this.cKeyProperty] === relatedRow[this.cKeyProperty]) {
            skip = true
            continue
          }
        }
        if (!skip)
          this.source.push(sourceRow)
      }
    else
      this.$set(this,'source',this.cSource)

    this.related = this.cRelated
    this.relatedChanged()*/
  },
  methods: {
    /*
    addRelated: function (index,row) {
      if (this.cDisableFields)
        return false
      this.related.push(row)
      this.related.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.$set(
        this,
        'source',
        this.source.filter(currentRow =>
          this.mDinamicIndex(currentRow) !== this.mDinamicIndex(row)
        )
      )
      this.source.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.relatedChanged()
    },
    removeRelated: function (index,row) {
      if (this.cDisableFields)
        return false
      this.source.push(row)
      this.source.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.$set(
        this,
        'related',
        this.related.filter(currentRow =>
          this.mDinamicIndex(currentRow) !== this.mDinamicIndex(row)
        )
      )
      this.related.sort((a,b) => a[this.cLabelProperty].localeCompare(b[this.cLabelProperty]))
      this.relatedChanged()
    },
    processList: function (items = null,search = '') {
      let filterItems = []
      if (items == null)
        return items
      for (let i = 0; i < items.length; i++) {
        let currentItemLabel = items[i][this.cLabelProperty]
        if (this.mySubString(currentItemLabel,search))
          filterItems.push(items[i])
      }
      return filterItems
    },
    keyed: function (key,ref) {
      if (typeof key === 'undefined' || !key || typeof key.keyCode === 'undefined')
        return false
      this.mSearchKeyUp(key)
      switch (key.keyCode) {
        case 27:
          if (this.$refs[ref])
            this.$refs[ref].mSearchClear()
          break
        default:
          break
      }
    },
    mDinamicIndex: function (row = null,index = null) {
      if (index)
        return index
      if (row != null && row[this.cKeyProperty] != null)
        return row[this.cKeyProperty]
      return null
    }*/
    mRelatedReFilter: function () {
      this.$set(this,'filterRelated',this.mProcessList(this.cLocalRelated,this.relatedSearch))
    },
    mRelatedChanged: function () {
      this.mSourceReFilter()
      this.mRelatedReFilter()
      this.$emit(
        'related-changed',
        {
          cRelatedIdentifier : this.cRelatedIdentifier,
          related            : this.cLocalRelated,
          source             : this.cLocalSource
        }
      )
    },
    mRelatedSimpleFilterFind: function (search) {
      if (search == null)
        search = ''
      this.$set(this,'relatedSearch',search)
      this.mRelatedReFilter()
    },
    mSourceSimpleFilterFind: function (search) {
      if (search == null)
        search = ''
      this.$set(this,'sourceSearch',search)
      this.mSourceReFilter()
    },
    mSourceReFilter: function () {
      this.mSetFilterSource(this.mProcessList(this.cLocalSource,this.sourceSearch))
    },
    mProcessList: function (items = null,search = '') {
      let filterItems = []
      if (items == null)
        return items
      for (let i = 0; i < items.length; i++) {
        let currentItemLabel = items[i][this.cLabelProperty]
        if (this.mySubString(currentItemLabel,search))
          filterItems.push(items[i])
      }
      return filterItems
    }
  }
}
</script>
