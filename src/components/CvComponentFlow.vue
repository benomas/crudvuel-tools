<script>
import VueMirroring from '../VueMirroring'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    vueMirroring.fixProperties({
      'prepared'  : {init:false,mode:'D|CD|M'},
      'preparing' : {init:false,mode:'D|CD'},
      'row'       : {init:{}},
    }),
  ],
  data (){
    return {
    }
  },
  methods : {
    mActionInitialize: function () {
      return new Promise((resolve, reject) => {
        alert('initialized')
        this.$nextTick(()=>{
          resolve()
        })
      })
    },
    mInitialize: function () {
      return new Promise((resolve, reject) => {
        this.mPrepareAction().then((prepareActionData = null ) => {
          resolve(prepareActionData)
        }).catch((prepareActionData = null ) => {
          reject(prepareActionData)
        })
      })
    },
    mFailInitializeNotification: function () {
      return new Promise((resolve, reject) => {
        alert('action fail')
        this.$nextTick(()=>{
          resolve(prepareActionData)
        })
      })
    },
    mFinish: function () {

    },
    mSetPreparing: function (value = null) {
      this.$set(this,'preparing',value)
      return this
    }
  },
  computed:{
  },
  props:[
  ],
  mounted: function () {
    if(!this.cdPreparing){
      console.log(this.preparing)
      this.preparing =  true
      this.mSetPreparing(true).mActionInitialize().then((startData = null) => {
        this.mSetPrepared(true)
      }).catch((exceptionData) => {
        this.mFailInitializeNotification().then(()=>{
          this.mFinish()
        })
      })
    }
  }
}
</script>
