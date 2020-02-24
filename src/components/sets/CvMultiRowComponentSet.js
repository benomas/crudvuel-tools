import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    new VueMirroring('MultiRowComponentSet').fixProperties({
      '[P]dinGenKeyName' : 'id'
    })
  ]
}
