<template>
  <div >
  <!--
    TODO:no dependencies template need to be defined
  -->
  </div>
</template>
<script>
import CvComponentSet             from 'crudvuel-tools/src/components/sets/CvComponentSet'
import CvResourceComponentSet     from 'crudvuel-tools/src/components/sets/CvResourceComponentSet'
import CvSimpleFilter             from 'crudvuel-tools/src/components/grid-components/CvSimpleFilter'
import {mySubString}              from 'crudvuel-tools/src/cvHelper'
import {concat,indexOf,parseInt}  from 'lodash'
import VueMirroring               from 'crudvuel/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('Relationator')

export default {
  mixins: [
    CvComponentSet,
    CvResourceComponentSet,
    vueMirroring.fixProperties({
      '[P]dinInsHasOrder'            : false,
      '[P]dinInsRelatedKeyValue'     : null,
      '[P|EM]dinInsSource'           : [],
      '[P|EM]dinInsRelated'          : [],
      '[P|EM]dinInsInitialRelated'   : [],
      '[P|EM]dinInsRelatedAttach'    : {},
      '[P|EM]dinInsRelatedDetach'    : {},
      '[P]dinInsSourceResource'      : null,
      '[P]dinInsRelatedResource'     : null,
      '[P]dinInsDraggeable'          : true,
      '[P]dinInsSourceService'       : function (paginate = {}) {
        if (this.cvDinInsSourceResource != null){
          let indexService = this.cvDinInsSourceResource.loadService('index')
          if (!indexService)
            return null
          return indexService(null,null,paginate)
        }
        return null
      },
      '[P]dinInsRelatedService'      : function (paginate = {}) {
        if (this.cvDinInsSourceResource != null){
          let relatedIndexService = this.cvDinInsSourceResource.loadService('relatedIndex')
          if (!relatedIndexService)
            return null
          return relatedIndexService(this.cpDinInsRelatedResource.pluralName,this.cpDinInsRelatedKeyValue,paginate)
        }
        return null
      },
      '[P]dinInsSourcePaginate'      : {
        paginate: {
          selectQuery  : ['id','cv_search'],
          byColumn     : 0,
          orderBy      : 'id',
          ascending    : 1,
          searchMode   : 'cv-simple-paginator',
          searchObject : ''
        }
      },
      '[P]dinInsRelatedPaginate'     : {
        paginate: {
          selectQuery  : ['id','cv_search'],
          byColumn     : 0,
          orderBy      : 'id',
          ascending    : 1,
          searchMode   : 'cv-simple-paginator',
          searchObject : ''
        }
      },
      '[P]dinInsLabelCallBack'       : (row) => row.cv_search,
      '[P]dinInsValueCallBack'       : (row) => row.cv_search,
      '[P]dinInsSourceSortCallBack'  : (a,b) => a.cv_search.toString().localeCompare(b.cv_search.toString()),
      '[P]dinInsRelatedSortCallBack' : (a,b) => {
        if (a.order != null){
          return parseInt(a.order) > parseInt(b.order) ?
            1 :
            parseInt(a.order) < parseInt(b.order) ?
              -1:0
        }
        else
          return a.cv_search.toString().localeCompare(b.cv_search.toString())
      },
      '[P]dinInsRelatedContainerClass' : 'col-xs-12 col-sm-6 related-items q-pa-sm',
      '[P]dinInsRelatedSourceClass'    : 'col-xs-12 col-sm-6 related-items q-pa-sm',
      '[D|M]currentDraggedItem'        : null,
      '[D|M]draggedItemOver'           : null
    }),
    vueMirroring.assimilate(
      {CvSimpleFilter,root: true,posFix:'source'},
      {CvSimpleFilter,root: true,posFix:'related'}
    )
  ],

  components: {
    CvSimpleFilter
  },

  watch: {
    cpDinInsRelated: function (val) {
      this.emDinInsRelatedAttachEmitter(this.cRelatedAttach)
      this.mDelayer().then(()=>{
        this.emDinInsRelatedDetachEmitter(this.cRelatedDetach)
      })
    }
  },

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
      return this.mDifference(this.cpDinInsSource,this.cpDinInsRelated,this.cKeyName)
    },

    cFilteredAvailableSource () {
      return this.mProcessList(this.cAvailableSource,this.cdRelationatorSimpleFilterSourceSearch).sort(this.cpDinInsSourceSortCallBack)
    },

    cFilteredAvailableRelated () {
      return this.mProcessList(this.cpDinInsRelated,this.cdRelationatorSimpleFilterRelatedSearch).sort(this.cpDinInsRelatedSortCallBack)
    },

    cRelatedAttach () {
      if (this.cpDinInsHasOrder === true)
        return this.mDifference(this.cpDinInsRelated,this.cpDinInsInitialRelated,this.cKeyName,'order')
      return this.mDifference(this.cpDinInsRelated,this.cpDinInsInitialRelated,this.cKeyName)
    },

    cRelatedDetach () {
      if (this.cpDinInsHasOrder)
        return this.mDifference(this.cpDinInsInitialRelated,this.cpDinInsRelated,this.cKeyName,'order')
      return this.mDifference(this.cpDinInsInitialRelated,this.cpDinInsRelated,this.cKeyName)
    }
  },

  methods: {
    mItemExist (item1,array,props) {
      for (const item2 of array){
        let equal = true
        for (const prop of props){
          equal = equal && item1[prop] != null && item2[prop] != null && item1[prop].toString() === item2[prop].toString()
        }
        if (equal)
          return true
      }
      return false
    },

    mDifference (array1,array2,...props) {
      let differences = []
      for (const item1 of array1) {
        if (!this.mItemExist(item1,array2,props))
          differences.push(item1)
      }
      return differences
    },

    mComponentInitialize () {
      return new Promise((resolve, reject) => {
        this.cpDinInsSourceService(this.cpDinInsSourcePaginate)
          .then(response => {
            this.emDinInsRelatedAttachEmitter([])
            this.emDinInsRelatedDetachEmitter([])
            this.emDinInsSourceEmitter(this.mIndexResponse(response).rows)
            this.cpDinInsRelatedService(this.cpDinInsRelatedPaginate)
              .then(response => {
                this.emDinInsRelatedEmitter(this.mIndexResponse(response).rows)
                this.emDinInsInitialRelatedEmitter(this.mIndexResponse(response).rows.slice())
                resolve()
                this.mSetReady()
              })
              .catch(response => {
                this.emDinInsRelatedEmitter([])
                this.emDinInsInitialRelatedEmitter([])
                reject()
                this.mSetReady()
              })
          })
          .catch(response => {
            this.emDinInsSourceEmitter([])
            reject(response)
            this.mSetReady()
          })
      })
    },

    mAddRelated: function (row,position=null) {
      if (this.cDisableFields)
        return false

      if (position == null){
        let newRow = {...row,...{order:this.cpDinInsRelated.length + 1}}
        this.emDinInsRelatedEmitter(concat(this.cpDinInsRelated,newRow).sort(this.cpDinInsRelatedSortCallBack))
      }

      else{
        let newRelated = []

        for (let i = 0 ;i < this.cpDinInsRelated.length + 1; i++) {
          if (i + 1  < position) {
            newRelated.push({...this.cpDinInsRelated[i],...{order:i+1}})
            continue
          }
          if (i + 1 === position) {
            let newRow = {...row,...{order:i+1}}
            newRelated.push(newRow)
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
      if (this.cpDinInsHasOrder){
        for (const related of this.cpDinInsRelated){
          if (row.order > related.order)
            newRelated.push(related)
          else{
            if (row.order < related.order)
              newRelated.push({...related,...{order:related.order - 1}})
          }
        }
      }else{
        for (const related of this.cpDinInsRelated)
          if (row[this.cKeyName] !== related[this.cKeyName])
            newRelated.push({...related,...{order:i++}})
      }
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
