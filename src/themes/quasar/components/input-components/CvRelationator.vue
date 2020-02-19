<template>
  <div class="row cv-relator-container">
    <div class="col-xs-12 col-sm-6 related-items q-pa-sm">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cSourceLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive"
          class="txt-white"
          >
          {{cFilteredAvailableSource.length}} / {{cAvailableSource.length}} / {{cpDinInsSource.length}}
        </q-chip>
        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBingins('cv-simple-filter-source')"
          v-on="mOns('cv-simple-filter-source')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <ul
        class="cv-drop-target cv-drop-source list-group"
        :class="['drop-target-uid-' + _uid]"
        :ref="'cv-drop-source-' + _uid"
        @dragenter="mOnDragEnter"
        @dragleave="mOnDragLeave"
        @dragover="mOnDragOver"
        @drop="mOnDrop">
        <li
          class="list-group-item cv-source-item-container"
          :class="['cv-item-' + row[cKeyName],'drop-target-uid-' + _uid]"
          v-for="(row, rowKey) in cFilteredAvailableSource"
          :key="mDinamicIndex(rowKey,row)"
          draggable="true"
          :ref="'cv-source-item-' + row[cKeyName]"
          @dragstart="((e)=>mOnDragStart(e,row,'source',_uid))"
        >
          <q-icon v-if="!cDisableFields" name="fas fa-plus-square" class="f-right" @click="mAddRelated(row)"/>
          <slot name="cv-source-item" :slot-row="row">
            <span>{{cpDinInsLabelCallBack(row)}}</span>
          </slot>
        </li>
      </ul>
    </div>
    <div class="col-xs-12 col-sm-6 related-items q-pa-sm">
      <hr class="lt-sm border-quaternary">
      <div class="t-center">
        <span class="txt-secondary f-weight-400 q-mr-xs">{{cRelatedLabel}}:</span>
        <q-chip
          v-if="!cDisableFields"
          color="positive" class="txt-white">
          {{cFilteredAvailableRelated.length}} / {{cpDinInsRelated.length}} / {{cpDinInsSource.length}}
        </q-chip>
        <cv-simple-filter
          class="w-100"
          v-bind="mCustomBingins('cv-simple-filter-related')"
          v-on="mOns('cv-simple-filter-related')"
          :cv-din-ins-disable-fields="cpDinGenDisableFields"
        >
        </cv-simple-filter>
      </div>
      <ul
        class="cv-drop-target cv-drop-related list-group"
        :class="['drop-target-uid-' + _uid]"
        :ref="'cv-drop-related-' + _uid"
        @dragenter="mOnDragEnter"
        @dragleave="mOnDragLeave"
        @dragover="mOnDragOver"
        @drop="mOnDrop">
        <li
          class="list-group-item cv-related-item-container"
          :class="['cv-item-' + row[cKeyName],'drop-target-uid-' + _uid]"
          v-for="(row, rowKey) in cFilteredAvailableRelated"
          :key="mDinamicIndex(rowKey,row)"
          draggable="true"
          :ref="'cv-related-item-' + row[cKeyName]"
          @dragstart="((e)=>mOnDragStart(e,row,'related',_uid))"
        >
          <q-badge class="q-mr-sm q-mt-xs text-subtitle2" color="positive" floating>{{row.order}}</q-badge>
          <q-icon v-if="!cDisableFields" name="fas fa-minus-square" :class="{'f-left':cGtxs,'f-right':cLtsm}" @click="mRemoveRelated(row)"/>
          <slot name="cv-related-item" :slot-row="row">
            <span>{{cpDinInsLabelCallBack(row)}}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CvComponentSet         from 'crudvuel-tools/src/components/sets/CvComponentSet'
import CvResourceComponentSet from 'crudvuel-tools/src/components/sets/CvResourceComponentSet'
import CvSimpleFilter         from 'crudvuel-tools/src/themes/quasar/components/grid-components/CvSimpleFilter'
import {mySubString}          from 'crudvuel-tools/src/cvHelper'
import {differenceBy,concat,indexOf,parseInt}    from 'lodash'
import {QIcon,QChip,QBadge}   from 'quasar'
import VueMirroring           from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Relationator')
export default {
  mixins: [
    CvComponentSet,
    CvResourceComponentSet,
    vueMirroring.fixProperties({
      '[P]dinInsSource'              : [],
      '[P]dinInsSourceLoaded'        : [],
      '[P|EM]dinInsRelated'          : [],
      '[P]dinOriginalInsRelated'     : [],
      '[P]dinInsLabelCallBack'       : (row) => row.cv_search,
      '[P]dinInsValueCallBack'       : (row) => row.cv_search,
      '[P]dinInsSourceSortCallBack'  : (a,b) => a.cv_search.toString().localeCompare(b.cv_search.toString()),
      '[P]dinInsRelatedSortCallBack' : (a,b) => {
        if (a.order != null)
          return parseInt(a.order) > parseInt(b.order) ?
            1 :
            parseInt(a.order) < parseInt(b.order) ?
              -1:0
        else
          return a.cv_search.toString().localeCompare(b.cv_search.toString())
      },
      '[D|M]currentDraggedItem'      : null,
      '[D|M]draggedItemOver'         : null
    }),
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true,posFix:'source'},
      {CvSimpleFilter,root: true,posFix:'related'}
    )
  ],
  components: {
    CvSimpleFilter,
    QIcon,
    QChip,
    QBadge
  },
  data: function () {
    return {
    }
  },
  props: [
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
    },
    cAvailableSource () {
      return differenceBy(this.cpDinInsSource,this.cpDinInsRelated,this.cKeyName)
    },
    cFilteredAvailableSource () {
      return this.mProcessList(this.cAvailableSource,this.cdRelationatorSimpleFilterSourceSearch).sort(this.cpDinInsSourceSortCallBack)
    },
    cFilteredAvailableRelated () {
      return this.mProcessList(this.cpDinInsRelated,this.cdRelationatorSimpleFilterRelatedSearch).sort(this.cpDinInsRelatedSortCallBack)
    }
  },
  mounted: function () {
    console.log(this)
  },
  methods: {
    mAddRelated: function (row,position=null) {
      if (this.cDisableFields)
        return false
      if (position == null)
        this.emDinInsRelatedEmitter(concat(this.cpDinInsRelated,{...row,...{order:this.cpDinInsRelated.length + 1}}).sort(this.cpDinInsRelatedSortCallBack))
      else{
        let newRelated = []
        for (let i = 0 ;i < this.cpDinInsRelated.length + 1; i++) {
          if (i + 1  < position) {
            newRelated.push({...this.cpDinInsRelated[i],...{order:i+1}})
            continue
          }
          if (i + 1 === position) {
            newRelated.push({...row,...{order:i+1}})
            continue
          }
          newRelated.push({...this.cpDinInsRelated[i-1],...{order:i+2}})
        }
        this.emDinInsRelatedEmitter(newRelated.sort(this.cpDinInsRelatedSortCallBack))
      }

      return this
    },
    mRemoveRelated: function (row) {
      if (this.cDisableFields)
        return false
      let newRelated = []
      let i = 1
      for (const related of this.cpDinInsRelated)
        if (row[this.cKeyName] !== related[this.cKeyName])
          newRelated.push({...related,...{order:i++}})
      this.emDinInsRelatedEmitter(newRelated.sort(this.cpDinInsRelatedSortCallBack))
      return this
    },
    mSwitchRelated: function (from,to) {
      if (this.cDisableFields)
        return false
      let newRelated = []
      let i = 1
      for (const related of this.cpDinInsRelated){
        if (
          from[this.cKeyName] !== related[this.cKeyName] &&
          to[this.cKeyName] !== related[this.cKeyName]
        )
          newRelated.push(related)
        else{
          if (from[this.cKeyName] === related[this.cKeyName] )
            newRelated.push({...related,...{order:to.order}})
          else
            newRelated.push({...related,...{order:from.order}})
        }
      }
      this.emDinInsRelatedEmitter(newRelated.sort(this.cpDinInsRelatedSortCallBack))
      return this
    },
    mDinamicIndex: function (position = 0,row = null,index = null) {
      if (index)
        return index
      if (row != null && row[this.cKeyName] != null)
        return position.toString() + '-' + row[this.cKeyName].toString()
      return null
    },
    mProcessList: function (items = [],search = '') {
      let lSearch = search != null ? search : ''
      let filterItems = []
      if (items == null)
        return []
      for (let i = 0; i < items.length; i++) {
        if (mySubString(this.cpDinInsLabelCallBack(items[i]),lSearch))
          filterItems.push(items[i])
      }
      return filterItems
    },
    // store the id of the draggable element
    mOnDragStart (e,row = null,from = 'source',uid) {
      e.dataTransfer.dropEffect = 'move'
      this.mSetCurrentDraggedItem({row,from,uid})
    },
    mOnDragEnter (e) {
    },
    mOnDragLeave (e) {
    },
    mOnDragOver (e) {
      e.preventDefault()
    },
    mOnDrop (e) {
      e.preventDefault()
      if (!this.cdCurrentDraggedItem)
        return
      this.mSetDraggedItemOver(null)
      // don't drop on other draggables
      let to = this.mFindTargetOrFail(e.target)
      if (!to)
        return
      if (indexOf(to.classList,'cv-drop-source') >=0 ) {
        if (this.cdCurrentDraggedItem.from === 'source')
          return
        this.mRemoveRelated(this.cdCurrentDraggedItem.row)
      }
      if (indexOf(to.classList,'cv-drop-related') >=0 ) {
        if (this.cdCurrentDraggedItem.from === 'source') {
          let position = null
          if (this.cdDraggedItemOver && this.cdDraggedItemOver.row.order != null)
            position = this.cdDraggedItemOver.row.order
          this.mAddRelated(this.cdCurrentDraggedItem.row,position)
        }else{
          this.mSwitchRelated(this.cdCurrentDraggedItem.row,this.cdDraggedItemOver.row)
        }
      }
    },
    mFindTargetOrFail (el) {
      if (el.classList == null) {
        if (el.parentElement != null)
          return this.mFindTargetOrFail(el.parentElement)
        return null
      }

      if (indexOf(el.classList,'cv-drop-target') >=0 ) {
        if (indexOf(el.classList,'drop-target-uid-' + this.cdCurrentDraggedItem.uid) < 0)
          return null
        return el
      }

      if (el.draggable) {
        if (indexOf(el.parentElement.classList,'cv-drop-target') >=0 ) {
          if (indexOf(el.parentElement.classList,'drop-target-uid-' + this.cdCurrentDraggedItem.uid) < 0)
            return null
          let found
          for (const className of el.classList) {
            found = [...className.matchAll(/^cv-item-(\w+)$/gi)]
            if (!found || found[0] == null || found[0][1] == null || found[0][1] === '')
              continue
            break
          }

          if (!found || found[0] == null || found[0][1] == null || found[0][1] === '')
            return null

          if (indexOf(el.parentElement.classList,'cv-drop-source') >=0 ) {
            let over = this.mFindItemByKey(found[0][1],this.cpDinInsSource)
            if (!over)
              return null
            this.mSetDraggedItemOver({row:over,from:'source',uid:this._uid})
          }

          if (indexOf(el.parentElement.classList,'cv-drop-related') >=0 ) {
            let over = this.mFindItemByKey(found[0][1],this.cpDinInsRelated)
            if (!over)
              return null
            this.mSetDraggedItemOver({row:over,from:'related',uid:this._uid})
          }

          return el.parentElement
        }
        return null
      }

      if (el.parentElement != null)
        return this.mFindTargetOrFail(el.parentElement)

      return null
    },
    mFindItemByKey (key,items) {
      for (const item of items) {
        if (item[this.cKeyName].toString() === key.toString())
          return item
      }
      return null
    }
  }
}
</script>
