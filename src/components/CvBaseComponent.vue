<script>
import {mySubString,myReplace,cvF,cvFixDotDepth} from '../cvHelper'
import VueMirroring from '../VueMirroring'
let vueMirroring = new VueMirroring()
export default{
  mixins: [
    vueMirroring.fixProperties({
      'parentRef'      : {mode:'P|C'},
      'ready'          : {init:false,mode:'P|C'},
      'action'         : {init:null,mode:'P|C'},
      'resource'       : {init:null,mode:'P|C'},
      'isMounted'      : {init:false,mode:'D|CD'}
    }),
  ],
  methods:{
    mOpenFile: function (path) {
      window.open(path)
    },
    mResourceAccessing: function (resource = null) {
      if (!resource){
        if (this.cResource != null)
          return this.cResource
        return null
      }
      if (typeof resource === 'string'){
        if (this.resources != null && this.resources[resource] != null)
          return this.resources[resource]
        return null
      }
      return resource
    },
    mActionAccessing: function (action = null,resource=null) {
      if (!action)
        return this.cpStaGenAction

      if (typeof action === 'string'){
        if (typeof this.mResourceAccessing(resource).actions[action] !== 'undefined')
          return this.mResourceAccessing(resource).actions[action]
        return null
      }
      return action
    },
    mVueSetter: function (source = null) {
      if(!source || typeof source.row==="undefined" || typeof source.cvColumnMap==="undefined")
        return false
      let destination = source.destination || 'row'
      if (typeof destination === 'string')
        destination = cvFixDotDepth(this,destination)

      let mapKeys = Object.keys(source.cvColumnMap)
      for (let i=0; i<mapKeys.length; i++) {
        if(source.row && typeof source.row[mapKeys[i]]!=="undefined")
          this.$set(destination, source.cvColumnMap[mapKeys[i]], source.row[mapKeys[i]])
        else
          this.$set(destination, source.cvColumnMap[mapKeys[i]], null)
      }
    },
    mResorceAction:function(action=null,resource=null){
      return this.mActionAccessing(action,resource)
    },
    mActionType:function(action=null,resource=null){
      return this.mResorceAction(action,resource).type || null
    },
    mActionPath:function(action,row,resource=null){
      return this.mResorceAction(action,resource).getFixedPath(row) || null
    },
    mySubString,
    myReplace,
    mCvF:cvF,
    mSetReady: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick().then(() => {
          this.ready = true
          resolve()
        }).catch(()=> {
          reject()
        })
      })
    },
    mSetUnReady: function () {
      return new Promise((resolve, reject) => {
        this.$nextTick().then(() => {
          this.ready = false
          resolve()
        }).catch(()=> {
          reject()
        })
      })
    },
    mSetParentReady: function () {
      if (this.cParentRef)
        this.cParentRef.mSetReady()
    },
    mSetParentUnReady: function () {
      if (this.cParentRef)
        this.cParentRef.mSetUnReady()
    }
  },
  computed: {
    cSelfRef: function () {
      return this
    },
    cResource:function(){
      return (this.cpStaGenAction && this.cpStaGenAction.resource)? this.cpStaGenAction.resource:null
    },
    cDisableFields:function(){
      return this.cvDisableFields || (this.cpStaGenAction && this.cpStaGenAction.disableFields) || false
    },
    cReady : function () {
      return this.cvReady || false
    }
  }
}
</script>
