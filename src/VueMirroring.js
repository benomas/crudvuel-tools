import {camelCase,split,kebabCase,replace,union,startsWith,endsWith,words} from 'lodash'
export default class VueMirroring {
  constructor (parentPrefix = null) {
    this.parentPrefix     = parentPrefix
    this.components       = {}
    this.currentComponent = {}
    this.props            = []
    this.computed         = {}
    this.bindings         = {}
    this.methods          = {}
    this.ons              = {}
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
  fixProperties (properties = null, prefix='') {
    let data     = {}
    let props    = []
    let computed = {}
    let methods  = {}
    let cModes
    for (const [property, configuration] of Object.entries(properties)) {
      let fixedProperty=camelCase(`${prefix} ${property}`)
      cModes = {'D':false,'P':false,'C':false,'E':false,'EM':false,'M':false}
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
      if(mode === '*' || cModes['P']){
        props.push(camelCase(`cv ${fixedProperty}`))
        let defaultComputed = null
        if(mode !== '*' && !cModes['D'])
          defaultComputed = init
        computed[camelCase(`cp ${fixedProperty}`)] = function() {
          let comp = this[camelCase(`cv ${fixedProperty}`)]
          return comp != null ? comp : defaultComputed
        }
      }
      if(mode === '*' || cModes['D']){
        data[fixedProperty]=init
        computed[camelCase(`cd ${fixedProperty}`)] = function() {
          return this[fixedProperty]
        }
      }
      if(mode === '*' || cModes['M'])
        methods[camelCase(`m set ${fixedProperty}`)] = function(value = null) {
          this.$set(this,fixedProperty,value)
          return this
        }
      if(cModes['EM']){
        methods[camelCase(`em ${fixedProperty} proccesor`)] = function(emitted = null) {
          return new Promise ((resolve, reject) => resolve(emitted))
        }
        if(methods[camelCase(`em ${fixedProperty} emitter`)] == null)
          methods[camelCase(`em ${fixedProperty} emitter`)] = function(emitted = null) {
            this[camelCase(`em ${fixedProperty} proccesor`)](emitted).then((proccesed = null) => {
              this.$emit(kebabCase(`em ${fixedProperty} event`), proccesed)
            }).catch(error=>error)
          }
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
    this.methods['mBinding'] = (function(bindings){
      return function (index = null) {
        if (!index || bindings == null || bindings[index] == null)
          return {}
        return bindings[index](this)
      }
    })(this.bindings)

    this.methods['mOns'] = (function(ons){
      return function (index = null) {
        let events = {}

        if (index && ons != null && ons[index] != null)
          for (const [event, emitter] of Object.entries(ons[index]))
            events[event] = emitter(this)

        return events
      }
    })(this.ons)

    return {
      props    : this.props,
      computed : this.computed,
      methods  : this.methods
    }
  }

  bindMirroring () {
    let mirroring = {
      props    : [],
      computed : {},
      methods  : {}
    }
    var binding = {}
    let tag = kebabCase(`${this.getCurrentComponent().tag}`)
    if (this.getCurrentComponent().posFix && this.getCurrentComponent().posFix !== '')
      tag += '-' + kebabCase(this.getCurrentComponent().posFix)
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
    let methodNames = Object.keys(this.getCurrentComponent().methods)
    if(methodNames.length){
      for (const [currentMethod, currentCallBack] of Object.entries(this.getCurrentComponent().methods)){
        if(!startsWith(currentMethod,'em') || !endsWith(currentMethod,'Emitter'))
          continue
        const found = [...currentMethod.matchAll(/^em([A-Z]\w*)?Emitter$/g)]
        if (found[0] == null || found[0][1] == null)
          continue

        let fixedEmitterName = found[0][1]
        if (this.getCurrentComponent().posFix && this.getCurrentComponent().posFix !== '')
          fixedEmitterName += '-' + kebabCase(this.getCurrentComponent().posFix)
        let prefixedEmitterName = camelCase(`${this.getParentPrefix()}-${fixedEmitterName}`)

        let newProccesorName = camelCase(`em ${prefixedEmitterName} Proccesor`)
        let newEmitterName  = camelCase(`em ${prefixedEmitterName} Emitter`)
        let newEventName    = kebabCase(`em ${prefixedEmitterName} event`)

        this.methods[newProccesorName] = function(emitted = null) {
          return new Promise ((resolve, reject) => resolve(emitted))
        }
        this.methods[newEmitterName] = (function(newProccesorName,newEventName){
          return function(emitted = null) {
            this[newProccesorName](emitted).then((proccesed = null) => {
              this.$emit(newEventName, proccesed)
            }).catch(error=>error)
          }
        })(newProccesorName,newEventName)
        if (this.ons[tag] == null)
          this.ons[tag] = {}
        if(kebabCase(`em ${fixedEmitterName} event`) === 'em-simple-filter-go-to-find-event')
          console.log(newProccesorName)
        this.ons[tag][kebabCase(`em ${fixedEmitterName} event`)]=(function(newEmitterName){
          return function(context){
            return context[newEmitterName]
          }
        })(newEmitterName)
      }
    }
    this.bindings[tag] = (function(binding){
      return function (context) {
        let fixedBinding = {}
        for (const [childProperty, parentComputed] of Object.entries(binding))
          fixedBinding[childProperty] = context[parentComputed]
        return fixedBinding
      }
    })(binding)

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
            break
          }
        }
        if(!match)
          this.getCurrentComponent().props.push(currentProp)
      }
    }
    if (component.methods != null){
      for (const [currentMethod, currentCallBack] of Object.entries(component.methods)){
        if(!startsWith(currentMethod,'em') || !endsWith(currentMethod,'Emitter'))
          continue

        let match = false
        if (this.getCurrentComponent().methods == null)
          this.getCurrentComponent().methods = {}
          for (const [method, callBack] of Object.entries(this.getCurrentComponent().methods)){
            if(currentMethod === method){
              match = true
              break
            }
        }
        if(!match)
          this.getCurrentComponent().methods[currentMethod] = currentCallBack
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
        props     : currentComponent.props != null ? currentComponent.props   : [],
        methods   : currentComponent.methods != null ? currentComponent.methods   : {}
      }
    }
    return this.setComponents(fixedComponents)
  }
}
