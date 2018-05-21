<script>
  import cvVueSetter from '../../cvVueSetter'
  export default{
    methods:{
      resourceAccessing: function (resource = null) {
        if (!resource){
          if (typeof this.resource !== 'undefined')
            return this.resource
          return null
        }
        if (typeof resource === 'string'){
          if (typeof this.resources[resource] !== 'undefined')
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
          return false;
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
        return this.resorceAction(action,resource).type || null;
      },
      actionPath:function(action,row,resource=null){
        return this.resorceAction(action,resource).getFixedPath(row) || null
      },
    },
    computed:{
      cDisableFields:function(){
        return this.cvDisableFields || (this.cAction && this.cAction.disableFields) || false;
      },
      cReady : function () {
        return this.cvReady || false
      },
      cSelfRef :  function () {
        return this
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
