import {camelCase,capitalize,kebabCase,
  lowerCase,lowerFirst,snakeCase,split,
  toLower,toUpper,trim,trimEnd,
  trimStart,truncate,upperCase,upperFirst,startCase,replace} from 'lodash'

var cvAuthHelper = (context) => {
  var parentContext = context
  const authCallError = response => {
    parentContext.CvNotify.createNegative(parentContext.globals.cvComunicator.router.VueRouter.app.$tc('crudvuel.labels.needToLogin'))
    parentContext.globals.cvComunicator.router.VueRouter.cvPassport.destroyAutentication()
    return parentContext.globals.cvComunicator.unloguedStart()
  }

  const authNoPermmission = response => {
    parentContext.CvNotify.createNegative(parentContext.globals.cvComunicator.router.VueRouter.app.$tc('crudvuel.labels.noAccessAllowed'))
    parentContext.globals.store.commit('setUnauthorizedInteractions',response.data)
    return parentContext.globals.cvComunicator.loguedStart()
  }

  const authValidation = response => {
    parentContext.globals.cvComunicator.router.resources.permissions.crudServices.unauthorizedPermissions()
      .then(authNoPermmission)
      .catch(authCallError)
  }
  return {
    authCallError,
    authNoPermmission,
    authValidation
  }
}

const mySubString = function (subject,patter) {
  let regexString = "(.|\s)*" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + "(.|\s)*"
  let patt = new RegExp(regexString,"i")
  return patt.test(subject)
}

const myReplace = function (subject,patter,replace) {
  let regexString = "(" + String(patter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + ")"
  let patt = new RegExp(regexString,"ig")
  let fixDataType = subject

  if(typeof fixDataType === 'boolean' || typeof fixDataType === 'number')
    fixDataType=fixDataType.toString()

  return fixDataType.replace(patt,replace)
}

const cvF = function (container = null, property = null) {
  if ( container == null || property == null)
    return null
  return container[property] == null ? null : container[property]
}

const cvFixDotDepth = function (container = null, dotString = null, defValue) {
  if ( container == null || dotString == null)
    return null
  if (typeof dotString === 'object')
    return dotString
  let dotSegments = dotString.split('.')
  var fixedContainer = container
  for (let i = 0; i < dotSegments.length; i++){
    if(typeof fixedContainer[dotSegments[i]] === 'undefined')
      container.$set(fixedContainer,dotSegments[i],{})
    if (typeof defValue !== 'undefined' && i === dotSegments.length - 1)
      container.$set(fixedContainer,dotSegments[i],defValue)

    fixedContainer = fixedContainer[dotSegments[i]]
    if (typeof fixedContainer === 'undefined')
      return null
  }
  return fixedContainer
}

const  cvBase64 = {

  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode : function (input) {
    var output = ""
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0

    input = cvBase64._utf8_encode(input)

    while (i < input.length) {

      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)

      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63

      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }

      output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)

    }

    return output
  },

  // public method for decoding
  decode : function (input) {
    var output = ""
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++))
      enc2 = this._keyStr.indexOf(input.charAt(i++))
      enc3 = this._keyStr.indexOf(input.charAt(i++))
      enc4 = this._keyStr.indexOf(input.charAt(i++))

      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4

      output = output + String.fromCharCode(chr1)

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3)
      }

    }

    output = Base64._utf8_decode(output)

    return output

  },

  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n")
    var utftext = ""

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n)

      if (c < 128) {
        utftext += String.fromCharCode(c)
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }

    }

    return utftext
  },

  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    var string = ""
    var i = 0
    var c = c1 = c2 = 0

    while ( i < utftext.length ) {

      c = utftext.charCodeAt(i)

      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      }
      else {
        c2 = utftext.charCodeAt(i+1)
        c3 = utftext.charCodeAt(i+2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }

    }

    return string
  }

}

const cvCamelCase = function (text = '') {
  return camelCase(text)
}

const cvSlugCase = function (text = '') {
  return kebabCase(text)
}

const cvKebabCase = function (text = '') {
  return kebabCase(text)
}

const cvSnakeCase = function (text = '') {
  return snakeCase(text)
}

const cvStudlyCase = function (text = '') {
  return replace(startCase(text),' ','')
}

const cvSingularCase = function (resource = null) {
  if (resource != null && resource.singularName)
    return resource.singularName

  return resource
}

const cvPluralCase = function (resource = null) {
  if (resource != null && resource.pluralName)
    return resource.pluralName

  return resource
}

const cvLowerCase = function (text = '') {
  return lowerCase(text)
}

const cvUpperCase = function (text = '') {
  return upperCase(text)
}

const cvUcfirstCase = function (text = '') {
  return upperFirst(text)
}

const cvTitleCase = function (text = '') {
  return upperFirst(text)
}

const cvCaseFixer = function(path,text = '') {

  for (const stringCase of split(path,'|')){
    let newStringcase = cvCamelCase(`cv ${stringCase} Case`)
    if(eval("typeof " + newStringcase) === 'function'){
      text = eval(newStringcase)(text)
    }
  }

  return text
}

export {cvAuthHelper,mySubString,myReplace,cvF,cvFixDotDepth,cvBase64,
  cvCamelCase,cvSlugCase,cvKebabCase,cvSnakeCase,cvStudlyCase,cvSingularCase,
  cvPluralCase,cvLowerCase,cvUpperCase,cvUcfirstCase,cvTitleCase,cvCaseFixer}
