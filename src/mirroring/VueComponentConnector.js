import {camelCase,kebabCase,startsWith,endsWith,split,replace} from 'lodash'

export default class VueMirroring {
  constructor (vueMirroring = null,parentPrefix = null) {
    this.vueMirroring     = vueMirroring
    this.parentPrefix     = parentPrefix
    this.components       = {}
    this.currentComponent = {}
    this.data             = {}
    this.props            = []
    this.computed         = {}
    this.bindings         = {}
    this.methods          = {}
    this.ons              = {}
    this.mode             = 'normal'
  }

  preloadBindigs (bindings = {}) {
    this.bindings = bindings
    return this
  }

  preloadOns (ons = {}) {
    this.ons = ons
    return this
  }

  bindsMirroring () {
    for (const [key, currentComponent] of Object.entries(this.getComponents()))
      this.setCurrentComponent(currentComponent).bindMirroring().getComponents()[key] = this.getCurrentComponent()
    this.methods['mBinding'] = (function(bindings){
      return function (index = null) {
        if (bindings == null)
          return {}
        if (!index)
          return bindings
        if (bindings[index] == null)
          return {}
        return bindings[index](this)
      }
    })(this.bindings)

    this.methods['mOns'] = (function(ons){
      return function (index = null) {
        if (!index)
          return ons
        let events = {}

        if (index && ons != null && ons[index] != null)
          for (const [event, emitter] of Object.entries(ons[index]))
            events[event] = emitter(this)

        return events
      }
    })(this.ons)
    return this
  }

  binding (){
    let nData = this.data
    return {
      data () {
        let data = {}
        for (const [dataItem, dataValue] of Object.entries(nData)){
          if (dataValue != null)
            data[dataItem] = this[dataValue]
          else
            data[dataItem] = null
        }
        return data
      },
      props    : this.props,
      computed : this.computed,
      methods  : this.methods,
    }
  }

  validProperty (splitedProperty = []) {
    if (
      splitedProperty[0] == null ||
      splitedProperty[1] == null ||
      splitedProperty[2] == null ||
      splitedProperty[3] == null ||
      splitedProperty[0] !== 'cv'
    )
      return false
    return this.getVueAutoDefiner().validPropertySegments(splitedProperty)
  }

  validEmitter (splitedEmitter = []) {
    if (
      splitedEmitter[0] == null ||
      splitedEmitter[1] == null ||
      splitedEmitter[2] == null ||
      splitedEmitter[3] == null ||
      splitedEmitter[0] !== 'em' ||
      splitedEmitter[splitedEmitter.length-1] !== 'emitter'
    )
      return false
    return this.getVueAutoDefiner().validEmitterSegments(splitedEmitter)
  }

  fixPropertyName (splitedProperty = []) {
    return this.getVueAutoDefiner().fixPropertyName(splitedProperty)
  }

  fixDataName (splitedProperty = []) {
    return this.getVueAutoDefiner().fixDataName(splitedProperty)
  }

  fixEmitterName (splitedEmitter = []) {
    return this.getVueAutoDefiner().fixEmitterName(splitedEmitter)
  }

  complementName (splited,from = 3) {
    return this.getVueAutoDefiner().complementName(splited,from)
  }

  bindMirroring () {
    let localProps = []
    var binding    = {}
    let cvTag      = this.getCurrentComponent().cvTag
    if(this.getCurrentComponent().props){
      for (const [position, prop] of Object.entries(this.getCurrentComponent().props)) {
        let splitedProperty = split(kebabCase(prop),'-')
        if(!this.validProperty(splitedProperty)){
          this.getCurrentComponent().props.splice(position, 1)
          continue
        }

        let property = this.fixPropertyName(splitedProperty,this.getCurrentComponent().posFix,this.getParentPrefix())
        let cvProperty = camelCase(`cv ${property}`)
        let clProperty = camelCase(`cl ${property}`)
        let cpProperty = camelCase(`cp ${property}`)
        let match = false
        for (const prop of this.props)
          if(cvProperty === prop){
            match = true
            continue
          }
        if(!match)
          this.props.push(cvProperty)
        localProps.push(cvProperty)
        this.computed[cpProperty] = function() {
          if (this[cvProperty] != null)
            return this[cvProperty]
          if (this[clProperty] != null)
            return this[clProperty]
          return null
        }
        if(this.switchModeRequired(splitedProperty)){
          let dProperty  = camelCase(`${this.fixDataName(splitedProperty)}`)
          let cdProperty = camelCase(`cd ${dProperty}`)
          let mSetMethod = camelCase(`m set ${dProperty}`)
          if (this.getParentPrefix() === 'aIndex')
            console.log([
              cvTag,
              dProperty,
              cdProperty,
              mSetMethod
            ])
          if (this.getCurrentComponent().methods[mSetMethod] == null){
            this.methods[mSetMethod] = function(value = null) {
              this.$set(this,dProperty,value)
              return this
            }
          }
          if (this.getCurrentComponent().data[dProperty] == null)
            this.data[dProperty] = cvProperty
          this.computed[cdProperty] = function() {
            return this[dProperty]
          }
          binding[kebabCase(prop)] = cdProperty
        }
        else{
          binding[kebabCase(prop)] = cpProperty
        }
      }
    }
    let methodNames = Object.keys(this.getCurrentComponent().methods)
    if(methodNames.length){
      for (const [currentMethod, currentCallBack] of Object.entries(this.getCurrentComponent().methods)){
        let splitedEmitter = split(kebabCase(currentMethod),'-')
        if(!this.validEmitter(splitedEmitter))
          continue
        splitedEmitter.pop()

        let emitter          = this.fixEmitterName(splitedEmitter)
        let originalEmitter  = camelCase(this.complementName(splitedEmitter,1))
        let newProccesorName = camelCase(`em ${emitter} Proccesor`)
        let newEmitterName   = camelCase(`em ${emitter} Emitter`)
        let newEventName     = kebabCase(`em ${emitter} event`)
        let parentPrefix     = this.getParentPrefix()
        let setterFix        = ''
        let defFix           = ''
        if (splitedEmitter[2] === 'ins'){
          setterFix = this.getParentPrefix()
          defFix    = this.getCurrentComponent().insTag
        }
        if (splitedEmitter[2] === 'insf'){
          setterFix = this.getParentPrefix()
        }

        let setterName       = camelCase(`m set ${setterFix} ${defFix} ${this.complementName(splitedEmitter)}`)
        if(this.switchModeRequired(splitedEmitter)){
          if (parentPrefix === 'aIndex' && cvTag === 'cv-adaptive-grid-index')
            console.log([
              kebabCase(`em ${originalEmitter} event`),
              newEmitterName,
              parentPrefix,
              splitedEmitter,
              newProccesorName,
              setterName,
              newEmitterName,
              newEventName,
              originalEmitter
            ])
          this.methods[newProccesorName] = function(emitted = null) {
            return new Promise ((resolve, reject) => {
              //console.log([newProccesorName,splitedEmitter,parentPrefix,emitter,setterName,this[setterName]])
              if (this[setterName] != null)
                this[setterName](emitted)
              resolve(emitted)
            })
          }
          this.methods[newEmitterName] = (function(newProccesorName,newEventName){
            return function(emitted = null) {
              //console.log([newProccesorName,splitedEmitter,parentPrefix,emitter,setterName,this[setterName]])
              this[newProccesorName](emitted).then((proccesed = null) => {
                this.$emit(newEventName, proccesed)
              }).catch(error=>error)
            }
          })(newProccesorName,newEventName)
          if (this.ons[cvTag] == null)
            this.ons[cvTag] = {}
          this.ons[cvTag][kebabCase(`em ${originalEmitter} event`)]=(function(newEmitterName){
            return function(context){
              return context[newEmitterName]
            }
          })(newEmitterName)
        }
        else{
          this.methods[newProccesorName] = function(emitted = null) {
            //console.log([parentPrefix,newProccesorName])
            return new Promise ((resolve, reject) => resolve(emitted))
          }
          this.methods[newEmitterName] = (function(newProccesorName,newEventName){
            return function(emitted = null) {
              this[newProccesorName](emitted).then((proccesed = null) => {
                this.$emit(newEventName, proccesed)
              }).catch(error=>error)
            }
          })(newProccesorName,newEventName)
          if (this.ons[cvTag] == null)
            this.ons[cvTag] = {}
          this.ons[cvTag][kebabCase(`em ${originalEmitter} event`)]=(function(newEmitterName){
            return function(context){
              return context[newEmitterName]
            }
          })(newEmitterName)
        }
      }
    }
    this.bindings[cvTag] = (function(binding,cvTag,posFix){
      return function (context) {
        let fixedBinding = {}
        for (const [childProperty, parentComputed] of Object.entries(binding))
          fixedBinding[`${childProperty}`] = context[parentComputed]

        fixedBinding['ref'] = camelCase(`${cvTag} ${posFix} ref`)
        return fixedBinding
      }
    })(binding,cvTag,this.getCurrentComponent().posFix)

    this.getCurrentComponent().props = localProps
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
        if(!match){
          this.getCurrentComponent().props.push(currentProp)
        }
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
  isRoot(){
    if (this.getCurrentComponent().root === false)
      return false
    if (this.getCurrentComponent().root === true)
      return true
    return this.vueMirroring.root
  }
  fixedComponentTag (component = null){
    if (!component || component.__file == null)
      return ''

    const found = [...component.__file.matchAll(/^.*?(Cv|cv|cV)(\w+)\.(js|vue)$/g)]
    if (found[0] == null || found[0][2] == null)
      return ''
    return kebabCase(found[0][2])
  }
  loadComponents (...components) {
    let fixedComponents = {}
    for (let currentComponent of components){
      let tag    = Object.keys(currentComponent)[0]
      let posFix = currentComponent.posFix != null ? currentComponent.posFix : ''
      //let cvTag  = kebabCase(`${tag} ${posFix}`)
      let cvTag  = kebabCase(`${tag}`)
      let insTag = replace(cvTag,'cv-','')
      fixedComponents[kebabCase(`${tag} ${posFix}`)]={
        tag,
        cvTag,
        insTag,
        component : currentComponent[tag],
        posFix    : currentComponent.posFix != null ? currentComponent.posFix   : '',
        root      : currentComponent.root != null ? currentComponent.root       : null,
        props     : currentComponent.props != null ? currentComponent.props     : [],
        data      : currentComponent.data != null ? currentComponent.data       : {},
        methods   : currentComponent.methods != null ? currentComponent.methods : {}
      }
    }
    return this.setComponents(fixedComponents)
  }

  getVueAutoDefiner (){
    return this.vueMirroring.vueAutoDefiner
  }

  switchModeRequired(splited){
    return this.isRoot() && splited[1] === 'din'
  }
}
