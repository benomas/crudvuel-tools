export default {
  data () {
    return {
      combinatorySearchTriggeredMessage : null,
      simpleFilters                     : {},
      specialFilters                    : {}
    }
  },

  computed: {
    cFixedSimpleFiltersQuery () {
      if (this.simpleFilters == null)
        return {}

      return this.simpleFilters
    },

    cFixedSpecialFiltersQuery () {
      if (this.specialFilters == null)
        return {}

      return this.specialFilters
    },

    cFixedPagFilterQuery () {
      let newFilters = {}
      for (const [prop, value] of Object.entries(this.cdPagFilterQuery)) {
        if (value == null) {
          if (this.cFixedSimpleFiltersQuery[prop] != null)
            newFilters[prop] = this.cFixedSimpleFiltersQuery[prop]

          continue
        }

        if (value === '') {
          if (this.cFixedSimpleFiltersQuery[prop] != null)
            newFilters[prop] = this.cFixedSimpleFiltersQuery[prop]
          else
            newFilters[prop] = ''
          continue
        }

        if (this.mIsArray(value)) {
          if (this.cFixedSimpleFiltersQuery[prop] != null)
            newFilters[prop] = [...value,...this.cFixedSimpleFiltersQuery[prop]]
          else
            newFilters[prop] = value

          continue
        }

        if (this.cFixedSimpleFiltersQuery[prop] != null) {
          newFilters[prop] = [...[value],...this.cFixedSimpleFiltersQuery[prop]]
        } else
          newFilters[prop] = value
      }

      for (const [prop, value] of Object.entries(this.cFixedSimpleFiltersQuery)) {
        if (newFilters[prop] == null)
          newFilters[prop] = value
      }

      return newFilters
    },

    cIsSimpleFilter () {
      return true
    },

    cEnableSimpleFieldFilter () {
      return true
    }
  },

  methods: {
    //filter methods
    emFiltersCollector (filters = null) {
      if (filters == null)
        return this.mSync()

      if (filters.specialFilters != null)
        this.$set(this,'specialFilters',{...filters.specialFilters})

      if (filters.simpleFilters != null) {
        let pagSimpleFilters = {}

        for (const [prop, value] of Object.entries(filters.simpleFilters)) {
          pagSimpleFilters[prop] = []
          pagSimpleFilters[prop].push({'lOp': 'and','eOp': '=','value': value})
        }

        this.$set(this,'simpleFilters',{...pagSimpleFilters})
      }

      return this.mSync()
    },

    mPaginatorInterceptor () {
      let customPaginate = {
        collectionsExcludes: [
          'cv_has_files',
          'cv_has_code_hook'
        ],
        specialFilterQuery: {...this.cFixedSpecialFiltersQuery}
      }

      if (this.cIsSimpleFilter && this.cFixedPagFilterQuery)
        customPaginate['filterQuery'] = {...this.cFixedPagFilterQuery}

      return customPaginate
    },

    mComponentInitialize () {
      this.mSetPagPage(1).mSetPagOrderBy(this.cKeyName).mSetPagAscending(1)
      this.mSetPagFilterQuery().mSetPagSelectQuery().mSetPagLimit(8)
      this.mSetIndexAdaptiveGridIndexGridSimpleFilterSearch('')
      this.mSetIndexAdaptiveGridIndexGridCombinatoryFilterSearch('')

      return new Promise((resolve, reject) => {
        this.mSync().then(() => {
          this.emStaInsfIndexAdaptiveGridIndexGridFilterSelectorCurrentFilterEmitter('cv-simple-paginator')
          resolve()
        }).catch(reject)
      })
    },

    emStaInsfIndexAdaptiveGridIndexGridFilterSelectorCurrentFilterProccesor (emitted) {
      return new Promise((resolve, reject) => {
        if (emitted === 'cv-combinatory-paginator') {
          reject(emitted)
          if (this.combinatorySearchTriggeredMessage)
            this.mErrorNotification(this.combinatorySearchTriggeredMessage)
          else
            this.combinatorySearchTriggeredMessage = this.$tc('crudvuel.labels.paginate.dinamicSearchModeDisabled')
        } else
          resolve(emitted)
      })
    }
  }
}
