import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    vueMirroring.fixProperties({
      '[P|NN]staInsPagSelectQuery'  :  [],
      '[P|NN]staInsPagPage'         :  1,
      '[P|NN]staInsPagByColumn'     :  0,
      '[P|NN]staInsPagLimit'        :  10,
      '[P|NN]staInsPagOrderBy'      :  'id',
      '[P|NN]staInsPagAscending'    :  1,
      '[P|NN]staInsPagFilterQuery'  :  {},
      '[P|NN]staInsPagSearchMode'   :  'cv-simple-paginator',
      '[P|NN]staInsPagSearchObject' :  ''
    })
  ],
  data () {
    return {}
  },
  props: [
  ],
  computed: {
    cPaginator (){
      return {
        paginate :{
          selectQuery   : this.cdPagSelectQuery,
          page          : this.cdPagPage,
          byColumn      : this.cdPagByColumn,
          limit         : this.cdPagLimit,
          orderBy       : this.cdPagOrderBy,
          ascending     : this.cdPagAscending,
          filterQuery   : this.cdPagFilterQuery,
          searchMode    : this.cdPagSearchMode,
          searchObject  : this.cdPagSearchObject
        }
      }
    }
  },
  methods: {
  }
}
