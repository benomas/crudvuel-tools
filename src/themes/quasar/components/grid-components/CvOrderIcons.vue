<template>
  <span >
    <slot
      name="orderable-icon"
      v-if="cpDinGenOrderBy != cpStaInsRowField"
    >
      <q-icon name="fas fa-arrows-alt-v" color="secondary"/>
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
import CvOrderIcons from 'crudvuel-tools/src/components/grid-components/CvOrderIcons'
import {QIcon} from 'quasar'
import VueMirroring from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('OrderIcons')
export default {
  mixins: [
    CvOrderIcons,
    vueMirroring.fixProperties({
      '[P]staComAccendingColor'  : 'primary',
      '[P]staComDeccendingColor' : 'positive',
      '[P]staComUnSortColor'     : 'secondary'
    })
  ],
  components : {
    QIcon
  },
  methods:{
  },
  mounted () {
  }
}
</script>
