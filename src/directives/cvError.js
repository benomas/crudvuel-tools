let defaultClasses = [
  'w-100',
  'f-s12px',
  'txt-negative',
  'f-left',
  'q-pl-lg'
]

let errorWrapper = function (el, binding, vnode) {
  if (binding.value == null)
    return

  el.classList.add('w-100')
  el.classList.add('h-20px')
  el.classList.add('q-pt-xs')

  let field   = binding.value.field
  let context = vnode.context

  if (context.cErrors == null) {
    el.textContent = ''
    return
  }

  if (context.cErrors[field] == null) {
    el.textContent = ''
    return
  }

  let newDefaultClasses = binding.value.classes != null ? binding.value.classes : defaultClasses
  let errorClases = {}
  for (const defaultClass of newDefaultClasses)
    errorClases[defaultClass] = false

  for (const classDef of el.classList)
    if (errorClases[classDef] != null)
      errorClases[classDef] = true

  for (const [ClassDef, alreadyExist] of Object.entries(errorClases))
    if (!alreadyExist)
      el.classList.add(ClassDef)

  el.textContent = context.cErrors[field][0]
}

export default {
  update (el, binding, vnode) {
    errorWrapper(el, binding, vnode)
  },

  componentUpdated (el, binding, vnode) {
    errorWrapper(el, binding, vnode)
  },

  bind (el, binding, vnode) {
    errorWrapper(el, binding, vnode)
  },
}
