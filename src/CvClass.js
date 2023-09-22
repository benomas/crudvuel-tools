import cvDinDep from './cvDinDep'
export default class CvClass {
  constructor () {
    this.cvDinDep = cvDinDep
  }

  defError (message) {
    if (message !== undefined && message) {
      console.log(`Config error, ${message}`)
      return true
    }
  };

  setProperty (property,opts,defaultValue) {
    if (property === undefined || this[property]  === undefined)
      return this

    if (opts !== undefined && opts[property ] !== undefined) {
      this[property] = opts[property]
      return this
    }

    if (defaultValue === undefined)
      this[property] = defaultValue

    return this
  };

  getProperty (property) {
    if (property === undefined || this[property] === undefined)
      return null

    return this[property]
  };

  loadOptions (options) {
    let opts =  options

    if (typeof options === 'function')
      opts = options()

    if (typeof options === 'object') {
      let optionsKeys = Object.keys(options)

      for (let i = 0; i < optionsKeys.length; i++)
        this.setProperty(optionsKeys[i],options)
    }

    return this
  }

  autoGetters (props) {
    props.forEach(prop => {
      Object.defineProperty(this, prop, {
        get() {
          if (this.dinamics[prop] === undefined)
            return ''

          if (typeof this.dinamics[prop] === 'function')
            return this.dinamics[prop]()

          return this.dinamics[prop]
        },
        set(value) {
          if (this.dinamics === undefined)
            this.dinamics = {}

          this.dinamics[prop] = value

          return this
        },
        enumerable: true,
        configurable: true
      });
    })
  }
}
/*
*

  get rowLabel () {
    if (this.dinamics['rowLabel'] === undefined)
      return ''

    if (typeof this.dinamics['rowLabel'] === 'function')
      return this.dinamics['rowLabel']()

    return this.dinamics['rowLabel']
  }

  set rowLabel (rowLabel) {
    this.dinamics['rowLabel'] = rowLabel

    return this
  }
* */
