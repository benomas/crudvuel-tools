<template>
  <span class="fs-2 t-top" style="margin-left:-4px;">
    <slot
      name="orderable-icon"
      v-if="cpDinGenOrderBy != cpStaInsRowField"
    >
      <q-icon name="fas fa-arrows-alt-v" color="secondary" class="my-auto"/>
    </slot>

    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cpDinGenOrderBy === cpStaInsRowField && cpDinGenAscending"
      >
        <q-icon name="fas fa-sort-amount-down-alt"  color="primary" class="my-auto"/>
      </slot>

      <slot
        name="descending-icon"
        v-if="cpDinGenOrderBy === cpStaInsRowField && !cpDinGenAscending"
      >
        <q-icon name="fas fa-sort-amount-up"  color="positive" class="my-auto"/>
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
