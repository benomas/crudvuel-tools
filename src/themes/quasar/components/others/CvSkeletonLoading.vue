<template>
  <div class="row w-100 h-100 mnh-500px q-pa-md">
    <div class="w-100">
      <q-skeleton width="100%" height="20%" class="q-mb-md bg-grey-l-96"/>
      <q-skeleton width="100%" height="10%" class="q-mb-md bg-grey-l-96"/>
      <div class="q-pa-sm">
        <q-skeleton width="100%" height="5%" class="q-mb-md bg-grey-l-90"/>
        <q-skeleton width="100%" height="5%" class="q-mb-md bg-grey-l-90"/>
        <q-skeleton width="100%" height="5%" class="q-mb-md bg-grey-l-90"/>
        <q-skeleton width="100%" height="5%" class="q-mb-md bg-grey-l-90"/>
        <q-skeleton width="100%" height="5%" class="q-mb-md bg-grey-l-90"/>
        <q-skeleton width="100%" height="5%" class="q-mb-md bg-grey-l-90"/>
      </div>
      <q-skeleton width="100%" height="10%" class="q-mb-md bg-grey-l-96"/>
    </div>
  </div>
</template>
<script>
import {QSkeleton} from 'quasar'
export default {
  components: {
    QSkeleton
  }
}
</script>
