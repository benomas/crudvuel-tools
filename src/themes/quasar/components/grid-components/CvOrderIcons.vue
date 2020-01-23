<template>
  <span >{{cpOrderBy}}--{{cpOrderIconsRowKey}}--{{cpOrderBy != cpOrderIconsRowKey}}
    <slot
      name="orderable-icon"
      v-if="cpOrderBy != cpOrderIconsRowKey"
    >
      <q-icon name="fas fa-arrows-alt-v" color="secondary"/>
    </slot>
    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cpOrderBy === cpOrderIconsRowKey && cpOrderIconsAscending"
      >
        <q-icon name="fas fa-sort-amount-down-alt"  color="primary"/>
      </slot>
      <slot
        name="descending-icon"
        v-if="cpOrderBy === cpOrderIconsRowKey && !cpOrderIconsAscending"
      >
        <q-icon name="fas fa-sort-amount-up"  color="positive"/>
      </slot>
    </template>
  </span>
</template>
<script>
import CvOrderIcons from 'crudvuel-tools/src/components/grid-components/CvOrderIcons'
import {QIcon} from 'quasar'
export default {
  extends    : CvOrderIcons,
  components : {
    QIcon
  },
  methods:{
  },
  mounted () {
  }
}
</script>
