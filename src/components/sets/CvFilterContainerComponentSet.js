export default {
  data () {
    return {
      action: 'filter-container'
    }
  },

  computed: {
    cdAction: function () {
      return this.action
    },

    cSimpleFilterFields () {
      return {
      }
    },

    cSpecialFilterFields () {
      return {
      }
    },

    cSimpleFilters () {
      return this.mFilterFixer(this.cSimpleFilterFields)
    },

    cSpecialFilters () {
      return this.mFilterFixer(this.cSpecialFilterFields)
    },

    cCurrenFilters () {
      return {
        simpleFilters  : this.cSimpleFilters,
        specialFilters : this.cSpecialFilters
      }
    }
  },

  methods: {
    mFilterFixer (cSource = null) {
      if (cSource == null || !Object.keys(cSource).length)
        return {}

      return Object.keys(cSource).reduce((ff, field) => {
        if (this.cdRow != null && this.cdRow[field] != null) {
          if (typeof cSource[field] === 'object') {
            if (cSource[field]['index'] != null) {
              if (typeof cSource[field]['cbValue'] === 'function') {
                ff[cSource[field]['index']] = cSource[field]['cbValue'](this.cdRow[field])

                return ff
              }

              ff[cSource[field]['index']] = this.cdRow[field]

              return ff
            }
          }

          ff[cSource[field]] = this.cdRow[field]
        }

        return ff
      },{})
    },

    emStaGenRowEmitter (emitted) {
      this.emStaGenRowProccesor(emitted).then((proccesed = null) => {
        this.$emit('em-sta-gen-row-event', proccesed)
      }).catch(error => error)
    },

    emStaGenRowProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mInyectSegment(emitted)
        this.$emit('em-filters-event', this.cCurrenFilters)
        resolve(emitted)
      })
    }
  }
}
