//Global Dinamic dependencies
export default function () {
  this.globals = {}

  this.upperFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  this.lowerFirstLetter = function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
  }

  this.add = function (ClassConst,className,objectInstance) {
    if (typeof ClassConst === 'undefined' || typeof className === 'undefined')
      return false

    this.globals[this.upperFirstLetter(className)] = ClassConst
    if (typeof objectInstance !== 'undefined')
      this.globals[this.lowerFirstLetter(className)] = objectInstance
  }
};
