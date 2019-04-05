<script>
  import cvVueSetter from '../../cvVueSetter'
  import {mySubString,myReplace,cvF} from '../../cvHelper'
  export default{
    methods:{
      openFile: function (path) {
        window.open(path)
      },
      resourceAccessing: function (resource = null) {
        if (!resource){
          if (typeof this.resource !== 'undefined')
            return this.resource
          return null
        }
        if (typeof resource === 'string'){
          if (this.resources != null && this.resources[resource] != null)
            return this.resources[resource]
          return null
        }
        return resource
      },
      actionAccessing: function (action = null,resource=null) {
        if (!action){
          if (typeof this.action !== 'undefined')
            return this.action
          return null
        }
        if (typeof action === 'string'){
          if (typeof this.resourceAccessing(resource).actions[action] !== 'undefined')
            return this.resourceAccessing(resource).actions[action]
          return null
        }
        return action
      },
      vueSetter: function (source = null) {
        if(!source || typeof source.row==="undefined" || typeof source.cvColumnMap==="undefined")
          return false
        let destination = source.destination || 'row'
        let mapKeys = Object.keys(source.cvColumnMap)
        for (let i=0; i<mapKeys.length; i++) {
          if(source.row && typeof source.row[mapKeys[i]]!=="undefined")
            this.$set(this[destination], source.cvColumnMap[mapKeys[i]], source.row[mapKeys[i]])
          else
            this.$set(this[destination], source.cvColumnMap[mapKeys[i]], null)
        }
      },
      resorceAction:function(action=null,resource=null){
        return this.actionAccessing(action,resource)
      },
      actionType:function(action=null,resource=null){
        return this.resorceAction(action,resource).type || null
      },
      actionPath:function(action,row,resource=null){
        return this.resorceAction(action,resource).getFixedPath(row) || null
      },
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
      },
      mySubString,
      myReplace,
      cvF
    },
    computed:{
      cDisableFields:function(){
        return this.cvDisableFields || (this.cAction && this.cAction.disableFields) || false
      },
      cReady : function () {
        return this.cvReady || false
      },
      cSelfRef :  function () {
        return this
      },
      cParentRef :  function () {
        return this.cvParentRef || null
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
      "cvShowOwnSpinner",
      "cvParentRef"
    ]
  }
</script>
