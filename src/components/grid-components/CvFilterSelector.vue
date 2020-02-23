<template>
  <div >
  <!--
    TODO:no dependencies template need to be defined
  -->
  </div>
</template>
<script>
import CvComponentSet           from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring             from 'crudvuel-tools/src/mirroring/VueMirroring'
export default {
  mixins: [
    CvComponentSet,
    new VueMirroring('FilterSelector').fixProperties({
      '[P|EM]dinInsCurrentFilter'       : 'cv-simple-paginator',
      '[P]staComSimpleFilterLabel'      : '',
      '[P]staComSimpleFilterIcon'       : 'fas fa-search',
      '[P]staComCombinayoryFilterLabel' : '',
      '[P]staComCombinayoryFilterIcon'  : 'fas fa-search-plus'
    }),
  ]
}
</script>
