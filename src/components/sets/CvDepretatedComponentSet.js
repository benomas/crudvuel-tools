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
    cGetted () {
      return this.cRows || !this.cpStaGenAction.getService  || this.cHasRowKeyValue || false
    },
    cpDinInsShowHeader () {
      if (typeof this.cvShowHeader !== 'undefined')
        return this.cvShowHeader
      return true
    },
    cRowKey () {
      return this.cvRowKey || 'id'
    },
    cRowKeyRouteValue () {
      return this.$route.params.id  || null
    },
    cShowGetMessages () {
      return (this.cpStaGenAction && typeof this.cpStaGenAction.cvShowGetMessages !== 'undefined')
        ? this.cpStaGenAction.cvShowGetMessages : false
    },
    cShowSetMessages () {
      return (this.cpStaGenAction && typeof this.cpStaGenAction.cvShowSetMessages !== 'undefined')
        ? this.cpStaGenAction.cvShowSetMessages : true
    },
    cHasRowKeyValue () {
      return this.cRow && this.cRow[this.cRowKey]
    },
    cAutoload () {
      if (typeof this.cvAutoload !== 'undefined')
        return this.cvAutoload
      return true
    },
    cHasRowIdentifier () {
      return this.rowKeyValue || false
    },
    cIdentText () {
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
  }
}
