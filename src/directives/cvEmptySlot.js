export default {
  /*
  inserted () {},
  update () {},
  componentUpdated () {},
  */
  bind (el, binding, vnode) {
    let slotName   = binding.value
    let context = vnode.context
    context.$set(context,slotName,true)
  },

  unbind (el, binding, vnode) {
  }
}
