import {camelCase,split,kebabCase,replace,union,startsWith,slice} from 'lodash'
export default class VueMirroring {
  constructor (parentPrefix = null) {
    this.parentPrefix     = parentPrefix
    this.components       = {}
    this.currentComponent = {}
    this.props            = []
    this.computed         = {}
    this.bindings         = {}
  }

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

  bindsMirroring () {
    for (const [key, currentComponent] of Object.entries(this.getComponents()))
      this.setCurrentComponent(currentComponent).bindMirroring().getComponents()[key] = this.getCurrentComponent()
    let methods = {}
    methods['mBinding'] = function (index = null) {
      if (!index || this.bindings == null || this.bindings[index] == null)
        return {}
      return this.bindings[index]
    }
    return {
      props    : this.props,
      computed : this.computed,
      methods  : methods
    }
  }

  bindMirroring () {
    let mirroring = {
      props    : [],
      computed : {},
      methods  : {}
    }
    var binding = {}
    if(this.getCurrentComponent().props){
      for (const [position, prop] of Object.entries(this.getCurrentComponent().props)) {
        if(!startsWith(prop,'cv')){
          this.getCurrentComponent().props.splice(position, 1)
          continue
        }
        let property = replace(`--${kebabCase(prop)}`,'--cv-','')
        let posfixedProperty = property
        if (this.getCurrentComponent().posFix && this.getCurrentComponent().posFix !== '')
          posfixedProperty += '-' + kebabCase(this.getCurrentComponent().posFix)
        let prefixedProperty = camelCase(`${this.getParentPrefix()}-${posfixedProperty}`)
        let cvProperty = camelCase('cv ' + prefixedProperty)
        let cpProperty = camelCase('cp ' + prefixedProperty)
        let match = false
        for (const prop of this.props)
          if(cvProperty === prop){
            match = true
            continue
          }
        if(!match)
          this.props.push(cvProperty)
        mirroring.props.push(cvProperty)
        this.computed[cpProperty] = function() {
          if (this[cvProperty] != null)
            return this[cvProperty]
          return null
        }
        binding[`cv-${property}`] = cpProperty
      }
    }
    let tag = kebabCase(`${this.getCurrentComponent().tag}`)
    if (this.getCurrentComponent().posFix && this.getCurrentComponent().posFix !== '')
      tag += '-' + kebabCase(this.getCurrentComponent().posFix)
    let callBack = function () {
      let fixedBinding = {}
      for (const [childProperty, parentComputed] of Object.entries(binding))
        fixedBinding[childProperty] = this[parentComputed]
      return fixedBinding
    }
    this.bindings[tag] = callBack
    this.getCurrentComponent().props = mirroring.props
    return this
  }

  mixinsMirroring () {
    for (const [key, currentComponent] of Object.entries(this.getComponents())){
      this.setCurrentComponent(currentComponent)
        .mixinMirroring(currentComponent.component)
        .getComponents()[key] = this.getCurrentComponent()
    }
    return this
  }

  mixinMirroring (component = null) {
    if (!component)
      return this
    if (component.props != null){
      for (const currentProp of component.props){
        let match = false
        if (this.getCurrentComponent().props == null)
          this.getCurrentComponent().props = []
        for (const prop of this.getCurrentComponent().props){
          if(currentProp === prop){
            match = true
            continue
          }
        }
        if(!match)
          this.getCurrentComponent().props.push(currentProp)
      }
    }
    if (component.mixins != null)
      for (let currentComponent of component.mixins)
        this.mixinMirroring(currentComponent)
    if (component.extends != null)
      this.mixinMirroring(component.extends)
    return this
  }

  getParentPrefix () {
    return this.parentPrefix || ''
  }
  getProps () {
    return this.props || []
  }
  getComponents () {
    return this.components || {}
  }
  getCurrentComponent () {
    return this.currentComponent || {}
  }

  setParentPrefix (parentPrefix = null) {
    this.parentPrefix = parentPrefix || ''
    return this
  }
  setProps (props = null) {
    this.props = props || []
    return this
  }
  setComponents (components) {
    this.components = components || {}
    return this
  }
  setCurrentComponent (currentComponent) {
    this.currentComponent = currentComponent || {}
    return this
  }
  loadComponents (...components) {
    let fixedComponents = {}
    for (let currentComponent of components){
      let tag = Object.keys(currentComponent)[0]
      let posFix = currentComponent.posFix != null ? currentComponent.posFix : ''
      fixedComponents[kebabCase(`${tag} ${posFix}`)]={
        tag       : tag,
        component : currentComponent[tag],
        posFix    : currentComponent.posFix != null ? currentComponent.posFix : '',
        props     : currentComponent.props != null ? currentComponent.props : []
      }
    }
    return this.setComponents(fixedComponents)
  }
}
