export default {
  // When the bound element is inserted into the DOM...
  inserted: function () {
  },
  bind (el, binding, vnode) {
    el.addEventListener('click', () => {
      vnode.context.emDinGenSortEmitter(binding.value)
    })
  },
  inserted () {

  },
  update () {

  },
  componentUpdated (el, binding, vnode) {

  },
  unbind (el, binding, vnode) {
    el.removeEventListener('click')
  }
}
