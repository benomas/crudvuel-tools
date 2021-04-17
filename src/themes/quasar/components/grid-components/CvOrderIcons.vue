<template>
  <span class="fs-2" style="z-index: 999; margin-left: 0px; margin-top: -6px; position: absolute;">
    <slot
      name="orderable-icon"
      v-if="cpDinGenOrderBy != cpStaInsRowField"
    >
      <q-icon name="fas fa-arrows-alt-v" color="secondary" />
    </slot>

    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cpDinGenOrderBy === cpStaInsRowField && cpDinGenAscending"
      >
        <q-icon name="fas fa-sort-amount-down-alt"  color="primary"/>
      </slot>

      <slot
        name="descending-icon"
        v-if="cpDinGenOrderBy === cpStaInsRowField && !cpDinGenAscending"
      >
        <q-icon name="fas fa-sort-amount-up"  color="positive"/>
      </slot>
    </template>
  </span>
</template>
<script>
import CvOrderIcons         from 'crudvuel-tools/src/components/grid-components/CvOrderIcons'
import CvComponentExtraSet  from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentExtraSet'
import {QIcon}              from 'quasar'
export default {
  mixins: [
    CvOrderIcons,
    CvComponentExtraSet
  ],

  components : {
    QIcon
  }
}
</script>
