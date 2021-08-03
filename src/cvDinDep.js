//Dinamic dependencies

var upperFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

var lowerFirstLetter = function (string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export default function (ClassName,globals) {
  if (typeof ClassName === 'undefined' || typeof globals === 'undefined')
    return null

  let objectName = lowerFirstLetter(ClassName)

  if (typeof globals[objectName] !== 'undefined')
    return globals[objectName]

  if (typeof globals[ClassName] !== 'undefined')
    return new globals[ClassName]()

  return null
};
