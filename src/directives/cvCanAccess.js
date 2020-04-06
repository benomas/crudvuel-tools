import {split,camelCase} from 'lodash'

let checkPermissions = function (el, binding, vnode){
  let rules   = binding.value
  let context = vnode.context

  let segments = split(rules,':')

  if (segments == null || segments.length !== 2)
    return

  let mode   = segments[0]
  let target = segments[1]

  if (mode === 'section') {
    if (!context.hasSectionPermission(target))
      commentNode(el, vnode)

    return
  }

  if (mode === 'resource') {
    if (!context.hasResourcePermission(target))
      commentNode(el, vnode)

    return
  }

  if (mode === 'special') {
    if (!context.hasSpecialPermission(target))
      commentNode(el, vnode)

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

      if(context.cResource == null)
        return commentNode(el, vnode)

      resource = context.cResource
    }else{
      actionName = segments[1]

      if(context.cResources == null || context.cResources[segments[0]] == null)
        return commentNode(el, vnode)
      resource = context.cResources[segments[0]]
    }

    if (resource.actions == null || resource.actions[actionName] == null)
      return commentNode(el, vnode)


    if (!context.hasActionPermission(resource.actions[actionName]))
      commentNode(el, vnode)

    return
  }


  if (segments.length === 1) {
    if(context.cResources[resourceName].actions.index == null)
      commentNode(el, vnode)

    if(context.cResources[resourceName].actions.index == null)
      commentNode(el, vnode)

    if (!context.hasResourcePermission(resourceName) || !context.hasActionPermission(context.cResources[resourceName].actions.index))
      commentNode(el, vnode)

    return
  }

  let actionName = camelCase(segments[1])

  if (segments.length === 2) {
    if(context.cResources[resourceName].actions == null)
      commentNode(el, vnode)

    if(context.cResources[resourceName].actions[actionName] == null)
      commentNode(el, vnode)

    if (!context.hasActionPermission(context.cResources[resourceName].actions[actionName]))
      commentNode(el, vnode)
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
