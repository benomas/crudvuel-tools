import {camelCase,split} from 'lodash'
export default class VueMirroring {

  fixProperty (property = null) {
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
  /**
  * Mirroring property list
  * property has next structure {'property':{'init':initializationValue,'mode':'D|P|C|E|CD'}}
  * D(ata)
  * P(rops)
  * C(omputed)
  * E(miter)
  * C(omputed)D(ata)
  * '*' everything
  * undefined everything
  * @return vue structure
  */
  fixProperties (properties = null) {
    let data     = {}
    let props    = []
    let computed = {}
    let methods  = {}
    let cModes
    for (const [property, configuration] of Object.entries(properties)) {
      cModes = {'D':false,'P':false,'C':false,'E':false,'CD':false,'M':false}
      let init,mode,modes
      if (configuration.init === undefined)
        init = null
      else
        init = configuration.init
      if (configuration.mode === undefined)
        mode = '*'
      else
        mode = configuration.mode
      if (mode !== '*'){
        modes = split(mode,'|')
        for (let i=0; i < modes.length; i++)
          if (cModes[modes[i]] !== undefined)
            cModes[modes[i]] = true
      }
      if(mode === '*' || cModes['D'])
        data[property]=init
      if(mode === '*' || cModes['P'])
        props.push(camelCase('cv ' + property))
      if(mode === '*' || cModes['C']){
        let defaultComputed = null
        if(mode !== '*' && !cModes['D'])
          defaultComputed = init
        computed[camelCase('c ' + property)] = function() {
          let comp = this[camelCase('cv ' + property)]
          return comp != null ? comp : defaultComputed
        }
      }
      if(mode === '*' || cModes['CD'])
        computed[camelCase('cd ' + property)] = function() {
          return this[property]
        }
      if(mode === '*' || cModes['M'])
        methods[camelCase('m set ' + property)] = function(value = null) {
          this.$set(this,property,value)
          return this
        }
    }
    return {
      data () {
        return data
      },
      props,
      computed,
      methods
    }
  }
}
