//use this function to extend other javascript clases, it is not necesary into the vue context
export default function (errors,property,mode) {
  if (typeof mode === 'undefined')
    mode = 'message'

  if (typeof errors === 'undefined' || !errors || typeof property === 'undefined' || !property) {
    if (mode === 'message')
      return null

    if (mode === 'boolean')
      return false
  }

  if (mode === 'message')
    return typeof errors[property] !== 'undefined' ? errors[property][0] : null

  if (mode === 'boolean')
    return typeof errors[property] !== 'undefined'
};
