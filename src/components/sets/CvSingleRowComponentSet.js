import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring().fixProperties({
      '[P]dinGenKeyName'      : 'id',
      '[P]dinGenKeyValue'     : null,
      '[P]staInsRow'          : {},
      '[P]staInsErrors'       : {},
      '[D]disableActionReady' : false
    })
  ],

  computed: {
    cdDinGenKeyValue () {
      if (this.cvDinGenKeyValue != null)
        return this.cvDinGenKeyValue

      if (
        this.$route == null ||
        this.$route.params == null ||
        this.$route.params[this.cpDinGenKeyName] == null
      )
        return null

      return this.$route.params[this.cpDinGenKeyName]
    },

    cFixedErrors () {
      let errors = {}
      let subErrors

      if (this.cdErrors != null) {
        for (const [field, message] of Object.entries(this.cdErrors)) {
          let fieldSegments = field.split('.')
          subErrors = errors
          for (let i = 0;i < fieldSegments.length;i++){
            let segment = fieldSegments[i]
            if (i === fieldSegments.length -1)
              subErrors[segment] = message
            else{
              if (subErrors[segment] === undefined)
                subErrors[segment] = {}
              subErrors = subErrors[segment]
            }
          }
        }

        return errors
      }
    },

    cActionReady () {
      if(this.cdDisableActionReady)
        return false

      if (this.cdAction.name === 'create')
        return true

      if ((this.cRow != null && this.cRow.id) || (this.cdRow != null && this.cdRow.id))
        return true

      return false
    }
  }
}
