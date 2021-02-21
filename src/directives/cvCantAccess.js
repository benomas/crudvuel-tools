import {split,camelCase} from 'lodash'

let hideNode = function (el, vnode) {
  el.style.display='none'
}

let checkPermissions = function (el, binding, vnode){
  let rules   = binding.value
  let context = vnode.context

  if (rules == null)
    return

  if(typeof rules === 'object'){
    if (rules.getContext == null)
      return

    if (rules.getContext() === 'action'){
      if (!(!context.mHasActionPermission(rules)))
        hideNode(el, vnode)

      return
    }

    if (rules.getContext() === 'resource'){
      if (!(!context.mHasSectionPermission(rules.getName())))
        hideNode(el, vnode)

      return
    }
  }

  let segments = split(rules,':')

  if (segments == null || segments.length !== 2)
    return

  let mode   = segments[0]
  let target = segments[1]

  if (mode === 'section') {
    if (!(!context.mHasSectionPermission(target)))
      hideNode(el, vnode)

    return
  }

  if (mode === 'resource') {
    if (!(!context.mHasSectionPermission(target)))
      hideNode(el, vnode)

    return
  }

  if (mode === 'special') {
    if (!(!context.mHasSpecialPermission(target)))
      hideNode(el, vnode)

    return
  }

  if (mode === 'action') {
    segments = split(target,'.')

    if (segments.length > 2)
      return

    let actionName   = null
    let resource     = null

    if (segments.length === 1) {
      actionName = segments[0]

      if(!(context.cResource == null))
        return hideNode(el, vnode)

      resource = context.cResource
    }else{
      actionName = segments[1]

      if(!(context.cResources == null || context.cResources[segments[0]] == null))
        return hideNode(el, vnode)

      resource = context.cResources[segments[0]]
    }

    if (!(resource.actions == null || resource.actions[actionName] == null))
      return hideNode(el, vnode)

    if (!(!context.mHasActionPermission(resource.actions[actionName])))
      hideNode(el, vnode)

    return
  }


  if (segments.length === 1) {
    if(!(context.cResources[resourceName].actions.index == null))
      hideNode(el, vnode)

    if(!(context.cResources[resourceName].actions.index == null))
      hideNode(el, vnode)

    if (!(!context.mHasSectionPermission(resourceName) || !context.mHasActionPermission(context.cResources[resourceName].actions.index)))
      hideNode(el, vnode)

    return
  }

  let actionName = camelCase(segments[1])

  if (segments.length === 2) {
    if(!(context.cResources[resourceName].actions == null))
      hideNode(el, vnode)

    if(!(context.cResources[resourceName].actions[actionName] == null))
      hideNode(el, vnode)

    if (!(!context.mHasActionPermission(context.cResources[resourceName].actions[actionName])))
      hideNode(el, vnode)
  }

  return null
}

export default {
  update (el, binding, vnode) {
    checkPermissions(el, binding, vnode)
  },
  bind (el, binding, vnode) {
    checkPermissions(el, binding, vnode)
  }
}
