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
import {mySubString,myLightSubString}  from 'crudvuel-tools/src/cvHelper'
import VueMirroring               from 'crudvuel-tools/src/mirroring/VueMirroring'
import {concat,indexOf,parseInt,without,round}  from 'lodash'
let vueMirroring = new VueMirroring('Relationator')

export default {
  mixins: [
    CvComponentSet,
    CvResourceComponentSet,
    vueMirroring.fixProperties({
      '[D]relatedRowPositions'          : {},
      '[D]sourceRows'                   : [],
      '[D]relatedRows'                  : [],
      '[D]minimumRowsVisualLimit'       : 10,
      '[D]sourceRowsVisualLimit'        : 10,
      '[D]relatedRowsVisualLimit'       : 10,
      '[D]availableSourceRows'          : [],
      '[D]originalRelatedRows'          : [],
      '[P]dinInsRelatedKeyValue'        : null,
      '[P|EM]dinInsRelatedDetachAttach' : {},
      //'[P|EM]dinInsRelatedDetach'       : {},
      '[P]dinInsSourceResource'         : null,
      '[P]dinInsRelatedResource'        : null,
      '[P]dinInsDraggeable'             : true,
      '[P]dinInsSourceService'          : function (paginate = {}) {
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
      '[P]dinInsDetachRowComparatorCallBack'       : function (originalRelatedRow = null) {
        if (originalRelatedRow == null)
          return false

        let relatedPosition = this.mFindItemPosition(originalRelatedRow,this.cdRelatedRows)

        if (relatedPosition == null)
          return true

        return false
      },
      '[P]dinInsAttachRowComparatorCallBack'       : function (relatedRow = null) {
        if (relatedRow == null)
          return false

        let originalRelatedPosition = this.mFindItemPosition(relatedRow,this.cdOriginalRelatedRows)

        if (originalRelatedPosition == null)
          return true

        let relatedPosition = this.mFindItemPosition(relatedRow,this.cdRelatedRows)

        if (relatedPosition == null)
          return false

        if(relatedPosition !== originalRelatedPosition)
          return true

        return false
      },
      '[P]dinInsLabelCallBack'       : (row) => row != null && row.cv_search != null? row.cv_search:'',
      '[P]dinInsValueCallBack'       : (row) => row != null && row.cv_search != null? row.cv_search:'',
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

    cLimitListLabel () {
      let trans = this.mComLang('limitListLabel')

      if (trans !== '')
        return trans

      return 'Limite de elementos a mostrar'
    },

    cFilteredAvailableSource () {
      return this.mProcessList(this.cdAvailableSourceRows,this.cdRelationatorSimpleFilterSourceSearch)
    },

    cFilteredAvailableRelated () {
      return this.mProcessList(this.cdRelatedRows,this.cdRelationatorSimpleFilterRelatedSearch)
    },

    cSourceRowsVisualLimit () {
      if(this.cFilteredAvailableSource == null || this.cFilteredAvailableSource.length === 0)
        return 0

      if (this.cdSourceRowsVisualLimit == null)
        return this.cFilteredAvailableSource.length

      if (this.cdSourceRowsVisualLimit > this.cFilteredAvailableSource.length)
        return this.cFilteredAvailableSource.length

      return this.cdSourceRowsVisualLimit
    },

    cRelatedRowsVisualLimit () {
      if(this.cFilteredAvailableRelated == null || this.cFilteredAvailableRelated.length === 0)
        return 0

      if (this.cdRelatedRowsVisualLimit == null)
        return this.cFilteredAvailableRelated.length

      if (this.cdRelatedRowsVisualLimit > this.cFilteredAvailableRelated.length)
        return this.cFilteredAvailableRelated.length

      return this.cdRelatedRowsVisualLimit
    },

    cSourceRowsVisualLimitStep () {
      if (this.cdSourceRows == null || !this.cdSourceRows.length)
        return 0

      return round (this.cdSourceRows.length / 20, 0)
    }
  },

  methods: {
    mRowByIndex(source = null,index = null){
      if(source == null || index == null || source[index] == null)
        return null

      return source[index]
    },

    mSourceRow(index = null){
      return this.mRowByIndex(this.cFilteredAvailableSource,index)
    },

    mRelatedRow(index = null){
      return this.mRowByIndex(this.cFilteredAvailableRelated,index)
    },

    mSourceRowKey(index = null){
      let sourceRow = this.mRowByIndex(this.cFilteredAvailableSource,index)

      if(sourceRow == null  || sourceRow[this.cKeyName] == null)
        return null

      return sourceRow[this.cKeyName]
    },

    mRelatedRowKey(index = null){
      let relatedRow = this.mRowByIndex(this.cFilteredAvailableRelated,index)

      if(relatedRow == null  || relatedRow[this.cKeyName] == null)
        return index

      return relatedRow[this.cKeyName]
    },

    mLoadRelatedRowPositions () {
      if(this.cdRelatedRows == null)
        this.mSetRelatedRowPositions({})

      let relatedRowPositions = {}

      for (let i=0;i<this.cdRelatedRows.length; i++)
        relatedRowPositions[this.cdRelatedRows[i][this.cKeyName]] = i

      this.mSetRelatedRowPositions(relatedRowPositions)

      return this
    },

    mSourceRowExist (sourceRow = null) {
      if (sourceRow == null || this.cKeyName == null || sourceRow[this.cKeyName] == null)
        return false

      for (let i = 0; i < this.cdRelatedRows.length; i++){
        if(this.cdRelatedRows[i][this.cKeyName] != null && this.cdRelatedRows[i][this.cKeyName] === sourceRow[this.cKeyName])
          return true
      }

      return false
    },

    mUpdateAvailableSourceRows(){
      this.mSetUnReady()

      if (this.cdSourceRows == null)
        return this.mSetAvailableSourceRows([])

      return this.mSetAvailableSourceRows(this.cdSourceRows.filter(item => !this.mSourceRowExist(item))).mSetReady()
    },

    mComponentInitialize () {
      return new Promise((resolve, reject) => {
        this.mSetUnReady()
        this.emDinInsRelatedDetachAttachEmitter({detach:[],attach:[]})
        //this.emDinInsRelatedDetachEmitter([])
        this.cpDinInsSourceService(this.cpDinInsSourcePaginate)
          .then(response1 => {
            this.mSetSourceRows(this.mIndexResponse(response1).rows.sort(this.cpDinInsSourceSortCallBack))
            this.cpDinInsRelatedService(this.cpDinInsRelatedPaginate)
              .then(response2 => {
                let temp = []

                for (const tempRow of this.mIndexResponse(response2).rows)
                  temp.push({...tempRow})

                this.mSetRelatedRows(this.mIndexResponse(response2).rows).mSetOriginalRelatedRows(temp).mUpdateAvailableSourceRows()
                resolve()
                this.mSetReady()
              })
              .catch(response => {
                reject()
                this.mSetReady()
              })
          })
          .catch(response => {
            reject(response)
            this.mSetReady()
          })
      })
    },

    mAddRelated: function (row,position = null,sync = true) {
      if (this.cDisableFields || !this.cKeyName || row[this.cKeyName] == null)
        return this

      if(position == null)
        position = this.cdRelatedRows.length

      this.relatedRows.splice(position, 0, {...row,related_order:position + 1})

      for(let i = position; i < this.relatedRows.length; i++)
        this.relatedRows[i].related_order = i + 1

      if(!sync)
        return this

      return this.mReloadAttachDetach()
    },

    mRemoveRelated: function (row,sync = true) {
      if (this.cDisableFields || !this.cKeyName || row[this.cKeyName] == null)
        return this

      let position = this.mFindItemPosition(row,this.cdRelatedRows)

      if(position != null){
        this.relatedRows.splice(position, 1)

        for(let i = position; i < this.relatedRows.length; i++)
          this.relatedRows[i].related_order = i + 1
      }

      if(!sync)
        return this

      return this.mReloadAttachDetach()
    },

    mSwitchRelated: function (from = null,to = null) {
      if (this.cDisableFields)
        return false

      let fromPosition = from ? this.mFindItemPosition(from,this.cdRelatedRows) : 0
      let toPosition   = to ? this.mFindItemPosition(to,this.cdRelatedRows) : this.cdRelatedRows.length

      if(fromPosition == null && toPosition == null)
        return null

      if(from)
        from.related_order = toPosition + 1

      if(to)
        to.related_order = fromPosition + 1

      this.relatedRows.splice(fromPosition, 1)
      this.relatedRows.splice(toPosition, 0,from)

      for(let i = Math.min(fromPosition, toPosition); i < this.relatedRows.length; i++)
        this.relatedRows[i].related_order = i +1

      return this.mReloadAttachDetach()
    },

    mDinamicIndex: function (position = 0,row = null,index = null) {
      if (index)
        return index

      if (row != null && row[this.cKeyName] != null)
        return position.toString() + '-' + row[this.cKeyName].toString()

      return null
    },

    mProcessList: function (items = [],search = '') {
      if (items == null)
        return []

      if (search == null || search == '')
        return items

      return items.filter(item => myLightSubString(this.cpDinInsLabelCallBack(item),search))
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

        this.mRemoveRelated(this.cdCurrentDraggedItem.row).mUpdateAvailableSourceRows()
      }

      if (indexOf(to.classList,'cv-drop-related') >=0 ) {
        if (this.cdCurrentDraggedItem.from === 'source') {
          let position = null

          if (this.cdDraggedItemOver != null && this.cdDraggedItemOver.row != null){
            position = this.mFindItemPosition(this.cdDraggedItemOver.row,this.cdRelatedRows)
          }

          this.mAddRelated(this.cdCurrentDraggedItem.row,position).mUpdateAvailableSourceRows()
        }else{
          let toRow = null

          if(this.cdDraggedItemOver && this.cdDraggedItemOver.row)
            toRow = this.cdDraggedItemOver.row

          this.mSwitchRelated(this.cdCurrentDraggedItem.row,toRow)
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
            let over = this.mFindItemByKey(found[0][1],this.cdSourceRows)

            if (!over)
              return null

            this.mSetDraggedItemOver({row:over,from:'source',uid:this._uid})
          }

          if (indexOf(el.parentElement.classList,'cv-drop-related') >=0 ) {
            let over = this.mFindItemByKey(found[0][1],this.cdRelatedRows)

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

    mFindItemPosition (item = null,items = null) {
      if(item == null || items == null || item[this.cKeyName] == null)
        return null

      let key = item[this.cKeyName]

      for (let i = 0; i < items.length; i++)
        if (items[i][this.cKeyName].toString() === key.toString())
          return i

      return null
    },

    mFindItemByKey (key,items) {
      for (const item of items)
        if (item[this.cKeyName].toString() === key.toString())
          return item

      return null
    },

    mPushAllRight(){
      if (this.cDisableFields)
        return this

      if (this.cFilteredAvailableSource == null)
        return this

      for (const position in this.cFilteredAvailableSource)
        this.mAddRelated(this.cFilteredAvailableSource[position],this.cdRelatedRows.length,false)

      return this.mReloadAttachDetach()
    },

    mPushAllLeft(){
      if (this.cDisableFields)
        return this

      if (this.cFilteredAvailableRelated == null)
        return this

      while(this.cFilteredAvailableRelated != null && this.cFilteredAvailableRelated.length)
        this.mRemoveRelated(this.cFilteredAvailableRelated[0],false)

      return this.mReloadAttachDetach()
    },

    mReloadAttachDetach(){
      this.emDinInsRelatedDetachAttachEmitter({
        detach:[...this.cdOriginalRelatedRows.filter(item=>this.cpDinInsDetachRowComparatorCallBack(item))],
        attach:[...this.cdRelatedRows.filter(item=>this.cpDinInsAttachRowComparatorCallBack(item))]
      })

      return this
    }
  }
}
</script>

