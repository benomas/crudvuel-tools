<script>
export default {
  props: [
    'cvParentRef',
    'cvDisableFields'
  ],
  methods: {
    keyed:function(key){
      if (typeof key === 'undefined' || !key || typeof key.keyCode === 'undefined')
        return false

      switch(key.keyCode){
        case 27:
          if(this.cSimpleFilterRef)
            this.cSimpleFilterRef.clear()
          break
      }
    },
    mySubString: function (subject,patter) {
      let regexString = "(.|\s)*" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + "(.|\s)*"
      let patt = new RegExp(regexString,"i")
      return patt.test(subject)
    },
    myReplace: function(subject,patter,replace){
      let regexString = "(" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + ")"
      let patt = new RegExp(regexString,"ig")
      let fixDataType = subject
      if(typeof fixDataType === 'boolean' || typeof fixDataType === 'number')
        fixDataType=fixDataType.toString()
      return fixDataType.replace(patt,replace)
    },
    prepareToFindSource:function(search){
      this.processList()
      this.$set(this,'disableList',false)
      return false
    }
  },
  computed:{
    cSimpleFilterRef: function () {
      return this.$refs.cvSimpleFilterRef || null
    },
    cInputRef: function() {
      return this.cSimpleFilterRef.cInputRef || null
    },
    cParentRef: function() {
      return this.cvParentRef || null
    },
    cDisableFields:function(){
      return this.cvDisableFields || false
    }
  }
}
</script>
