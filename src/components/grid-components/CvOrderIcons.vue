<template>
  <span>
    <slot
      name="orderable-icon"
      v-if="cpOrderBy != cpOrderIconsRowKey"
    >
      <span>ord</span>
    </slot>
    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cpOrderBy === cpOrderIconsRowKey && cpOrderIconsAscending"
      >
        <span>asc</span>
      </slot>
      <slot
        name="descending-icon"
        v-if="cpOrderBy === cpOrderIconsRowKey && !cpOrderIconsAscending"
      >
        <span>des</span>
      </slot>
    </template>
  </span>
</template>
<script>
import VueMirroring from 'crudvuel-tools/src/VueMirroring'
let vueMirroring = new VueMirroring('OrderIcons')
export default {
  mixins: [
    vueMirroring.fixProperties({
      'RowKey'    : {mode: 'branch',init: 'id'},
      'OrderBy'   : {mode: 'P',shared:true},
      'Ascending' : {mode: 'branch',init: true},
    },'OrderIcons')
  ],
  props:[
  ],
  computed:{
  }
}
</script>
