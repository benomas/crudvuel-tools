//use this function to extend other javascript clases, it is not necesary into the vue context
export default function (source,propertys) {
  if (typeof source === 'undefined')
    return null

  if (typeof source !== 'function' || typeof propertys !== 'object')
    return source

  let propertyKeys = Object.keys(propertys)

  if (typeof propertyKeys === 'undefined' || !propertyKeys || !propertyKeys.length)
    return source

  for (let i = 0; i < propertyKeys.length; i++) {
    source.prototype[propertyKeys[i]] = propertys[propertyKeys[i]]
  }

  return source
};
