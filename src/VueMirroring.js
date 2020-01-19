import {camelCase,split,kebabCase,replace} from 'lodash'
export default class VueMirroring {
  /**
  * Mirroring property list
  * property has next structure {'property':{'init':initializationValue,'mode':'D|P|C|E|CD'}}
  * D(ata)
  * P(rops)
  * C(omputed)
  * E(miter)
  * C(omputed)D(ata)
  * C(omputed)P(roperty)
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
      cModes = {'D':false,'P':false,'C':false,'E':false,'CD':false,'CP':false,'M':false}
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
      if(mode === '*' || cModes['CP']){
        let defaultComputed = null
        if(mode !== '*' && !cModes['D'])
          defaultComputed = init
        computed[camelCase('cp ' + property)] = function() {
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
  bindMirroring (childProps = null,parentPrefix = '') {
    let mirroring = {
      props    : [],
      computed : {},
      methods  : {}
    }
    var binding = {}
    for (let i = 0; i < childProps.length; i++){
      let property = replace(`--${kebabCase(childProps[i])}`,'--cv-','')
      let prefixedProperty = camelCase(`${parentPrefix}-${property}`)
      let cvProperty = camelCase('cv ' + prefixedProperty)
      let cpProperty = camelCase('cp ' + prefixedProperty)
      mirroring.props.push(cvProperty)
      mirroring.computed[cpProperty] = function() {
        if (this[cvProperty] != null)
          return this[cvProperty]
        return null
      }
      binding[`cv-${property}`] = cpProperty
    }
    mirroring.methods[camelCase(`m ${parentPrefix}Bind`)] = function () {
      let fixedBinding = {}
      for (const [childProperty, parentComputed] of Object.entries(binding))
        fixedBinding[childProperty] = this[parentComputed]
      console.log(fixedBinding,'asdasd')
      return fixedBinding
    }
    return mirroring
  }
}
