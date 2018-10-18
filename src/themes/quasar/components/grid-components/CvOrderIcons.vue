<template>
  <span v-if="cData && cKey">
    <slot
      name="orderable-icon"
      v-if="cData.cvParametrizer.getOrderBy()!=cKey"
    >
      <q-icon name="swap_vert" color="secondary"/>
    </slot>
    <template v-if="1">
      <slot
        name="ascending-icon"
        v-if="cData.cvParametrizer.getOrderBy()===cKey && cData.cvParametrizer.getAscending()"
      >
        <q-icon name="arrow_downward"  color="primary"/>
      </slot>
      <slot
        name="descending-icon"
        v-if="cData.cvParametrizer.getOrderBy()===cKey && !cData.cvParametrizer.getAscending()"
      >
        <q-icon name="arrow_upward"  color="positive"/>
      </slot>
    </template>
  </span>
</template>
<script>
import CvCustomExtender   from 'src/crudvuel/customs/components/grid-components/CvOrderIcons'
import {QIcon} from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    QIcon
  }
}
</script>
