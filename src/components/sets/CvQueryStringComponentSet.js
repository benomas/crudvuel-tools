import VueMirroring  from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring().fixProperties({
      '[D]queryStringJson'              : null,
      '[P]staInsQueryStringEnabled'     : false,
      '[P]staInsActivatePopulationFlag' : 'auto-fill',
      '[P]staInsAutoPopulatedFields'    : {}
    })
  ],

  computed: {
  },

  methods:{
    mProccessQueryString(){
      if(!this.cpStaInsQueryStringEnabled)
        return this

      this.mLoadQueryString()

      if(this.cdQueryStringJson == null)
        return this

      if(
        this.cdQueryStringJson[this.cpStaInsActivatePopulationFlag] != null &&
        this.cdQueryStringJson[this.cpStaInsActivatePopulationFlag] !== 'false' &&
        this.cdQueryStringJson[this.cpStaInsActivatePopulationFlag] !== 0 &&
        this.cdQueryStringJson[this.cpStaInsActivatePopulationFlag] !== false
      )
        this.mAutoPopulateQueryString()

      return this
    },

    mAutoPopulateQueryString(){
      if (this.cpStaInsAutoPopulatedFields == null)
        return  this

      let keys = Object.keys(this.cpStaInsAutoPopulatedFields)

      if(!keys.length)
        return this

      for (const [queryProperty, def] of Object.entries(this.cdQueryStringJson)){
        if(this.cpStaInsAutoPopulatedFields[queryProperty] != null && this.cpStaInsAutoPopulatedFields[queryProperty] === true)
          this.mDirectInput(queryProperty,def)
      }
    },

    mLoadQueryString (){
      this.mSetQueryStringJson(this.$route.query)

      return this
    },

    mComponentBootFlow () {
      this.mComponentInitialize().then((startData = null) => {
        this.mProccessQueryString()
        this.mSetIsMounted(true)
      }).catch((exceptionData) => {
        this.mFailInitializeNotification().then(() => {
          this.mFinish('fail initialize')
        }).catch(() => {
          this.mFinish('fail notify')
        })
      })
    },
  }
}
