import {camelCase} from 'lodash'
export default class VueMirroring {
  fixProperty (property=null) {
    return {
      data () {
        return {
          [property]: null
        }
      },
      props: [camelCase('cv '+property)],
      computed: {
        [camelCase('c '+property)]:function () {
          return this[camelCase('cv '+property)]
        },
        [camelCase('cd '+property)]:function () {
          return this[property]
        }
      }
    }
  }
}
