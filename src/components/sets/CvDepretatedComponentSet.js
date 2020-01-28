//import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
//let vueMirroring = new VueMirroring()
export default{
  mixins: [
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cGetted: function () {
      return this.cRows || !this.cpStaGenAction.getService  || this.cHasRowKeyValue || false
    },
    cpDinInsShowHeader: function () {
      if (typeof this.cvShowHeader !== 'undefined')
        return this.cvShowHeader
      return true
    },
    cRowKey: function () {
      return this.cvRowKey || 'id'
    },
    cRowKeyRouteValue: function () {
      return this.$route.params.id  || null
    },
    cShowGetMessages: function () {
      return (this.cpStaGenAction && typeof this.cpStaGenAction.cvShowGetMessages !== 'undefined')
        ? this.cpStaGenAction.cvShowGetMessages : false
    },
    cShowSetMessages: function () {
      return (this.cpStaGenAction && typeof this.cpStaGenAction.cvShowSetMessages !== 'undefined')
        ? this.cpStaGenAction.cvShowSetMessages : true
    },
    cHasRowKeyValue: function () {
      return this.cRow && this.cRow[this.cRowKey]
    },
    cAutoload: function () {
      if (typeof this.cvAutoload !== 'undefined')
        return this.cvAutoload
      return true
    },
    cHasRowIdentifier: function () {
      return this.rowKeyValue || false
    },
    cIdentText: function () {
      return this.cHasRowIdentifier ? this.actionKeyMessage(this.row) : ''
    }
  },
  methods: {
    toSync (row,identifier) {
      this.cvSynchronizer.toSync(row,this.cRowKey,identifier)
    },
    synchronized (row,identifier) {
      this.cvSynchronizer.synchronized(row,this.cRowKey,identifier)
    },
    isSynchronizing (row,identifier) {
      return this.cvSynchronizer.isSynchronizing(row,this.cRowKey,identifier)
    },
    validIdentifier (identifier) {
      return this.cvSynchronizer.validIdentifier(identifier)
    },
    someSyncInProgress () {
      return this.cvSynchronizer.someSyncInProgress()
    }
  },
  created: function () {
  }
}
