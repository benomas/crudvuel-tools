<script>
import CvCore from '../CvCore'
import {mySubString,myReplace,cvF,cvFixDotDepth} from '../../cvHelper'
export default{
  extends : CvCore,
  methods : {
    setReady: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick().then(() => {
          this.ready = true
          resolve()
        }).catch(()=> {
          reject()
        })
      })
    },
    setUnReady: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick().then(() => {
          this.ready = false
          resolve()
        }).catch(()=> {
          reject()
        })
      })
    },
    setParentReady: function () {
      if (this.cParentRef)
        this.cParentRef.setReady()
    },
    setParentUnReady: function () {
      if (this.cParentRef)
        this.cParentRef.setUnReady()
    }
  },
  computed:{
    cDisableFields:function(){
      return this.cvDisableFields || (this.cAction && this.cAction.disableFields) || false
    },
    cReady : function () {
      return this.cvReady || false
    },
    cShowOwnSpinner : function() {
      if (typeof this.cvShowOwnSpinner !== 'undefined')
        return this.cvShowOwnSpinner
      return true
    },
  },
  props:[
    "cvDisableFields",
    "cvReady",
    "cvShowOwnSpinner"
  ]
}
</script>
