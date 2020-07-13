
<script>
import {QList,QItemSection,QIcon,QSeparator,QCheckbox}  from 'quasar'
import {cvCaseFixer}                                    from 'crudvuel-tools/src/cvHelper'

export default {
  data () {
    return {
      localFilterQuery:{'cv_search': '','id': []}
    }
  },

  components: {
    QList,
    QIcon,
    QSeparator,
    QItemSection,
    QCheckbox
  },

  computed: {
    cAutoFilterLimit () {
      return 100
    },

    cAutoFilterLimitReached () {
      return this.cFixDataRef.length >= this.cAutoFilterLimit
    },

    cLocalFilterQuery () {
      return this.localFilterQuery
    },

    cFixDataRef () {
      return this[cvCaseFixer('camel',`cpDinIns ${this.cpStaInsResource.pluralName}`)]
    },

    cKeyName () {
      return this.cpStaInsResource.keyName
    }
  },

  methods: {
    mAddLocalFilterQuery () {
      if (this.cAutoFilterLimitReached)
        return

      let newLocalFilterQuery = {'cv_search': '','id': []}

        for (const item of this.cFixDataRef)
          newLocalFilterQuery[this.cKeyName].push({'lOp': 'and','eOp': '<>','value': item[this.cKeyName]})

      this.$set(this,'localFilterQuery',newLocalFilterQuery)
    },

    mRemoveLocalFilterQuery () {
      if (!this.cFixDataRef.length)
        return

      let newLocalFilterQuery = {'cv_search': '','id': []}

        for (const item of this.cFixDataRef)
          newLocalFilterQuery[this.cKeyName].push({'lOp': 'and','eOp': '<>','value': item[this.cKeyName]})

      this.$set(this,'localFilterQuery',newLocalFilterQuery)
    },

    mRemoveRow (row = null) {
      if (!row)
        return

      let newData = []

      for (const item of this.cFixDataRef) {
        if (item[this.cKeyName] !== row[this.cKeyName])
          newData.push(item)
      }

      this.emDinGenRowEmitter({
        inputSource : `${this.cpStaInsResource.singularName}.${this.cpStaInsResource.keyName}`,
        resource    : this.cpStaInsResource,
        row         : {[cvCaseFixer('snake',this.cpStaInsResource.pluralName)]: newData},
        uid         : this._uid,
        forceSync   : true
      })
    },

    mReplaceRow (row = null) {
      if (!row)
        return

      let newData = []

      for (const item of this.cFixDataRef) {
        if (item[this.cKeyName] !== row[this.cKeyName])
          newData.push(item)
        else
          newData.push(row)
      }

      this.emDinGenRowEmitter({
        inputSource : `${this.cpStaInsResource.singularName}.${this.cpStaInsResource.keyName}`,
        resource    : this.cpStaInsResource,
        row         : {[cvCaseFixer('snake',this.cpStaInsResource.pluralName)]: newData},
        uid         : this._uid,
        forceSync   : true
      })
    }
  },

  mounted () {
  }
}
</script>
