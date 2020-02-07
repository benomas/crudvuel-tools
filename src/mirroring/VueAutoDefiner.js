import {camelCase,split,kebabCase,lowerCase} from 'lodash'
export default class VueAutoDefiner {
  constructor (vueMirroring = null) {
    this.vueMirroring     = vueMirroring
    this.autoProps        = []
    this.autoComputed     = {}
    this.autoData         = {}
    this.autoMethods      = {}
    this.autoMounters     = []
    this.autoMounted      = {}
    this.resetAutoDefs()
    this.validScopes      = {gen:true,com:true,comf:true,comr:true,ins:true,insf:true,insr:true}//comf component fixed
    this.validModes       = {sta:true,din:true}
  }

  noTypes () {
    return {'D':false,'P':false,'EM':false,'M':false,'NN':false}
  }

  allTypes () {
    return {'D':true,'P':true,'EM':false,'M':true,'NN':true}
  }

  resetAutoDefs(){
    this.autoDefTypes    = this.noTypes()
    this.autoDefMode     = null//din(dinamic),sta(static)
    this.autoDefScope    = null//gen(general scope),com(component scope),ins(instance scope)
    this.autoDefName     = null
    this.autoDefInit     = null
    this.autoDefDataInit = null
    this.autoDefPropInit = null
    return this
  }

  getAutoDefConf () {
    return {
      types : this.autoDefTypes,
      mode  : this.autoDefMode,
      scope : this.autoDefScope,
      name  : this.autoDefName,
      def   : this.autoDefInit
    }
  }

  getAutos () {
    let currentData = this.autoData
    let parentPrefix  = this.getParentPrefix()
    return {
      data () {
        let data = {}
        for (const [dataItem, dataValue] of Object.entries(currentData))
          data[dataItem] = dataValue(this)
        return data
      },
      props    : this.autoProps,
      computed : this.autoComputed,
      methods  : this.autoMethods
    }
  }
  getAutoDefDataInit (){
    return this.autoDefDataInit
  }
  getAutoDefPropInit (){
    return this.autoDefPropInit
  }
  getAutoDefTypes () {
    return this.autoDefTypes
  }
  getAutoDefMode () {
    return this.autoDefMode
  }
  getAutoDefScope () {
    return this.autoDefScope
  }
  getAutoDefName () {
    return this.autoDefName
  }
  getAutoDefInit () {
    return this.autoDefInit
  }

  hasAutoData(){
    return this.getAutoDefTypes()['D']
  }
  hasAutoProp(){
    return this.getAutoDefTypes()['P']
  }
  hasAutoEmitter(){
    return this.getAutoDefTypes()['EM']
  }
  isNullable(){
    return !this.getAutoDefTypes()['NN']
  }
  setAutoDefDataInit (autoDefDataInit = null) {
    this.autoDefDataInit = autoDefDataInit
    return this
  }
  setAutoDefPropInit (autoDefPropInit = null) {
    this.autoDefPropInit = autoDefPropInit
    return this
  }
  setAutoDefTypes (autoDefTypes = null) {
    this.autoDefTypes = autoDefTypes
    return this
  }
  setAutoDefMode (autoDefMode = '') {
    this.autoDefMode = lowerCase(autoDefMode)
    return this
  }
  setAutoDefScope (autoDefScope = '') {
    this.autoDefScope = lowerCase(autoDefScope)
    return this
  }
  setAutoDefName (autoDefName = null) {
    this.autoDefName = camelCase(autoDefName)
    return this
  }
  setAutoDefInit (autoDefInit = null) {
    this.autoDefInit = autoDefInit
    return this
  }
  loadAutoDefTypes (source) {
    let cTypes = (source[2] == null || source[2] === '') ? ['D']:split(source[2],'|')
    let types = this.noTypes()
    for (const type of cTypes)
      if(types[type] != null)
        types[type] = true
    return this.resetAutoDefs().setAutoDefTypes(types)
  }
  loadAutoDefMode (source){
    if(source[3] == null)
      return this
    return this.setAutoDefMode(source[3])
  }
  loadAutoDefScope (source){
    if(source[4] == null)
      return this
    return this.setAutoDefScope(source[4])
  }
  definitionSplitter(definition = null){
    if (!definition)
      return this
    const found = [...definition.matchAll(/^(\[(\S+)\])?(sta|din)?(gen|com|ins)?(\w+)$/gi)]
    if (!found || found[0] == null || found[0][5] == null || found[0][5] === '')
      return this
    return this.loadAutoDefTypes(found[0]).loadAutoDefMode(found[0]).loadAutoDefScope(found[0]).setAutoDefName(found[0][5])
  }
  preCamel (prefix = '') {
    return camelCase(`${prefix} ${this.getAutoDefName()}`)
  }
  calAutoPropName(prefix = '') {
    let mode = this.getAutoDefMode() || ''
    let scope = this.getAutoDefScope() || ''
    return camelCase(`${prefix} ${mode} ${scope} ${this.getAutoDefName()}`)
  }
  calAutoDataName(prefix = '') {
    return camelCase(`${prefix} ${this.getAutoDefName()}`)
  }
/**
 * add data
 */
  addAutoData(){
    if (this.hasAutoData()){
      let dataName = this.calAutoDataName()
      if(this.hasAutoProp()){
        let defaultData = this.getAutoDefPropInit()
        let prop = this.calAutoPropName('cv')
        let isNullable = this.isNullable()
        this.autoData[dataName] = function(context) {
          if (isNullable || context[prop] != null)
            return context[prop]
          return defaultData
        }
      }else{
        let def = this.getAutoDefInit()
        this.autoData[dataName] = function(){
          return def
        }
      }
    }
    return this
  }
/**
 * add prop
 */
  addAutoProp(){
    if (this.hasAutoProp())
      this.autoProps.push(this.calAutoPropName('cv'))
    return this
  }
/**
 * add computed
 */
  addAutoComputed(){
    let name = this.calAutoDataName()
    if (this.hasAutoData()) {
      this.autoComputed[this.calAutoDataName('cd')] = function() {
        return this[name]
      }
    }
    if (this.hasAutoProp()) {
      let defaultComputedProp = this.getAutoDefPropInit()
      let propName = this.calAutoPropName('cv')
      this.autoComputed[this.calAutoPropName('cp')] = function() {
        let comp = this[propName]
        return comp != null ? comp : defaultComputedProp
      }
    }
    return this
  }
/**
 * add method
 */
  addAutoMethod(){
    if (this.hasAutoData()) {
      let name = this.calAutoDataName()
      this.autoMethods[this.calAutoDataName('m set')] = function(value = null) {
        this.$set(this,name,value)
        return this
      }
    }
    return this
  }
/**
 * add emitter
 */
  addAutoEmitter(){
    if (this.hasAutoEmitter()) {
      let name = this.calAutoPropName()
      this.autoMethods[camelCase(`em ${name} proccesor`)] = function(emitted = null) {
        return new Promise ((resolve, reject) => resolve(emitted))
      }
      let propName = this.calAutoPropName()
      if(this.autoMethods[camelCase(`em ${propName} emitter`)] == null)
        this.autoMethods[camelCase(`em ${propName} emitter`)] = function(emitted = null) {
          this[camelCase(`em ${propName} proccesor`)](emitted).then((proccesed = null) => {
            this.$emit(kebabCase(`em ${propName} event`), proccesed)
          }).catch(error=>error)
        }
    }
    return this
  }
/**
 * add mounter
 */
  addAutoMounter(){
    if (this.hasAutoProp() && this.getAutoDefMode() === 'sta') {
      let propName = this.calAutoDataName('cp')
      let dataName = this.calAutoDataName('m set')
      this.autoMounters.push(function (context) {
        context[dataName](context[propName])
      })
    }
    return this
  }
/**
 * add mounted
 */
  addAutoMounted(){
    this.autoMounted = (function(autoMounters){
      return function () {
        for (const mounter of autoMounters)
          mounter(this)
      }
    })(this.autoMounters)
    return this
  }
  complementDefinition () {
    if(this.getAutoDefMode() === 'sta'){
      this.setAutoDefPropInit(this.getAutoDefInit())
      this.getAutoDefTypes()['D']=true
      this.getAutoDefTypes()['P']=true
    }else{
      this.setAutoDefPropInit(!this.hasAutoData() ? this.getAutoDefInit() : null)
      this.setAutoDefPropInit(this.getAutoDefInit())
    }
    return this
  }
  validateDefinition () {
    if (!this.getAutoDefName())
      return false
    if(this.hasAutoProp() && (!this.getAutoDefMode() || !this.getAutoDefScope()))
      return false
    return true
  }
  /**
  * Mirroring property list
  * property has next structure {'property':{'init':initializationValue,'mode':'D|P|C|E|CD'}}
  * D(ata)
  * P(rops)
  * EM(miter)
  * undefined everything
  * @return vue structure
  */
  fixProperties (properties = null) {
    for (const [property, def] of Object.entries(properties)){
      if (this.definitionSplitter(property).setAutoDefInit(def).complementDefinition().validateDefinition())
        this.addAutoData().addAutoProp().addAutoComputed().addAutoMethod().addAutoEmitter()}
    return this.getAutos()
  }

  validPropertySegments (splitedProperty = []) {
    return this.validModes[splitedProperty[1]] != null && this.validScopes[splitedProperty[2]] != null
  }

  complementName (splited,from = 3){
    let complementedName = ''
    for (let i=from;i<splited.length; i++)
      complementedName += ` ${splited[i]}`
    return complementedName
  }

  fixPropertyName (splitedProperty = []) {
    let scope = splitedProperty[2]
    let mode  = splitedProperty[1]
    if(this.getVueComponentConnector().switchModeRequired(splitedProperty))
      mode = 'sta'
    switch(scope){
      case 'com':
        return camelCase(`${mode} comf ${this.getCurrentComponent().tag} ${this.complementName(splitedProperty)} `)
      case 'comf':
        return camelCase(`${mode} comf ${this.complementName(splitedProperty)} `)
      case 'ins':
        return camelCase(`${mode} insf ${this.getVueComponentConnector().getParentPrefix()} ${this.getCurrentComponent().insTag} ${this.getCurrentComponent().posFix} ${this.complementName(splitedProperty)}`)
      case 'insf':
        return camelCase(`${mode} insf ${this.getVueComponentConnector().getParentPrefix()}  ${this.getCurrentComponent().posFix} ${this.complementName(splitedProperty)}`)
    }
    return camelCase(`${mode} ${scope} ${this.complementName(splitedProperty)}`)
  }

  fixDataName (splitedProperty = []) {
    let scope = splitedProperty[2]
    let mode  = splitedProperty[1]
    switch(scope){
      case 'com':
        return camelCase(`${this.getCurrentComponent().tag} ${this.complementName(splitedProperty)} `)
      case 'comf':
        return camelCase(`${this.complementName(splitedProperty)} `)
      case 'ins':
        return camelCase(`${this.getParentPrefix()} ${this.getCurrentComponent().insTag} ${this.getCurrentComponent().posFix} ${this.complementName(splitedProperty)}`)
      case 'insf':
        return camelCase(`${this.getParentPrefix()} ${this.getCurrentComponent().posFix} ${this.complementName(splitedProperty)}`)
    }
    return camelCase(`${this.complementName(splitedProperty)}`)
  }

  validEmitterSegments (splitedEmitter = []) {
    return this.validModes[splitedEmitter[1]] != null && this.validScopes[splitedEmitter[2]] != null
  }

  fixEmitterName (splitedEmitter = []) {
    let scope = splitedEmitter[2]
    let mode  = splitedEmitter[1]
    if(this.getVueComponentConnector().switchModeRequired(splitedEmitter))
      mode = 'sta'
    switch(scope){
      case 'com':
        return camelCase(`${mode} comf ${this.getCurrentComponent().tag} ${this.complementName(splitedEmitter)} `)
      case 'comf':
        return camelCase(`${mode} comf ${this.complementName(splitedEmitter)} `)
      case 'ins':
        return camelCase(`${mode} insf ${this.getParentPrefix()} ${this.getCurrentComponent().insTag} ${this.getCurrentComponent().posFix} ${this.complementName(splitedEmitter)}`)
      case 'insf':
        return camelCase(`${mode} insf ${this.getParentPrefix()}  ${this.getCurrentComponent().posFix} ${this.complementName(splitedEmitter)}`)
    }
    return camelCase(`${mode} ${scope} ${this.complementName(splitedEmitter)}`)
  }

  getVueComponentConnector (){
    return this.vueMirroring.vueComponentConnector
  }

  getCurrentComponent (){
    return this.getVueComponentConnector().getCurrentComponent()
  }
  getParentPrefix () {
    return this.getVueComponentConnector().getParentPrefix()
  }
}
