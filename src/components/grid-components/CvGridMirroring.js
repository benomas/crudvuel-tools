export default {
  data () {
    return {
      gridCurrentFilter : null
    }
  },
  props:[
    'cvGridCurrentFilter',
  ],
  computed:{
    cGridCurrentFilter: function () {
      return this.cvGridCurrentFilter
    },
    cdGridCurrentFilter: function () {
      return this.gridCurrentFilter || 'simple-filters'
    }
  },
  methods:{
    mGridSwitchFilterEmiter: function (gridCurrentFilter = null) {
      this.gridCurrentFilter = gridCurrentFilter
      this.$emit('grid-filter-switched',gridCurrentFilter)
    },
    mGridSwitchFilterStartEmiter: function (){
      this.$nextTick().then(() => {
        this.mGridSwitchFilterEmiter(this.cdGridCurrentFilter)
      })
    },
    bGridBind: function () {
      let def =  {
        'cv-grid-current-filter':this.cGridCurrentFilter
      }
      return def
    },
    bGridOn: function () {
      let def =  {
        'grid-filter-switched':this.mGridSwitchFilterEmiter
      }
      return def
    }
  }
}
