export default {
  /*
  inserted () {},
  update () {},
  componentUpdated () {},
  */
  bind (el, binding, vnode) {
    let field   = binding.value
    let context = vnode.context
    for (const elClass of el.classList){
      if (elClass === 'cv-selectable')
        context.selectables[field] = true
      if (elClass === 'cv-orderable')
        context.orderables[field] = true
      if (elClass === 'cv-filterable')
        context.filterables[field] = true
    }

    if (context.mIsOrderable(field))
      el.addEventListener('click', () => {
        context.emDinGenSortEmitter(field)
      })
  },
  unbind (el, binding, vnode) {
    let field  = binding.value
    let context = vnode.context
    if (context.mIsOrderable(field))
      el.removeEventListener('click')
  }
}
