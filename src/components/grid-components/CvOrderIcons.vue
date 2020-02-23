<template>
  <span>
    <slot
      name="orderable-icon"
      v-if="cpDinGenOrderBy != cpStaInsRowField"
    >
      <span>ord</span>
    </slot>
    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cpDinGenOrderBy === cpStaInsRowField && cpDinGenAscending"
      >
        <span>asc</span>
      </slot>

      <slot
        name="descending-icon"
        v-if="cpDinGenOrderBy === cpStaInsRowField && !cpDinGenAscending"
      >
        <span>des</span>
      </slot>
    </template>
  </span>
</template>
<script>
import CvComponentSet   from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring     from 'crudvuel-tools/src/mirroring/VueMirroring'
export default {
  mixins: [
    CvComponentSet,
    new VueMirroring('OrderIcons').fixProperties({
      '[P]staInsRowField'        : 'id',
      '[P]dinGenOrderBy'         : 'id',
      '[P]dinGenAscending'       : true,
      '[P]staComAccendingColor'  : 'primary',
      '[P]staComDeccendingColor' : 'positive',
      '[P]staComUnSortColor'     : 'secondary'
    })
  ]
}
</script>
