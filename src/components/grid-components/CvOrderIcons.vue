<template>
  <span>
    <slot
      name="orderable-icon"
      v-if="cpDinGenOrderBy != cdStaGenRowKey"
    >
      <span>ord</span>
    </slot>
    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cpDinGenOrderBy === cdStaGenRowKey && cpDinGenAscending"
      >
        <span>asc</span>
      </slot>
      <slot
        name="descending-icon"
        v-if="cpDinGenOrderBy === cdStaGenRowKey && !cpDinGenAscending"
      >
        <span>des</span>
      </slot>
    </template>
  </span>
</template>
<script>
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('OrderIcons')
export default {
  mixins: [
    vueMirroring.fixProperties({
      '[P]staGenRowKey'    : 'id',
      '[P]dinGenOrderBy'   : 'id',
      '[P]dinGenAscending' : true,
    })
  ],
  props:[
  ],
  computed:{
  }
}
</script>
