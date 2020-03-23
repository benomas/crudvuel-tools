<template>
  <div>
    <q-dialog
      :value="cpDinGenCreateDialog"
      @input="(()=>{this.emDinGenCreateDialogEmitter(false)})"
      full-height
      maximized
      :position="'right'"
      >
      <div v-if="cpDinGenCreateAction" class="w-80 ml-20 h-100 bg-white" :style="{'min-width':cpDinGenMinWidth}">
        <component
          v-bind:is="cpDinGenCreateAction.component"
          :cv-sta-gen-action="cpDinGenCreateAction"
          :cv-din-gen-action-mode="'dialog'"
          @action-canceled="emDinGenActionCanceledEmitter"
          @action-completed="emDinGenActionCompletedEmitter"
        ></component>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import CvComponentSet         from 'crudvuel-tools/src/themes/quasar/components/sets/CvComponentSet'
import CvResourceComponentSet from 'crudvuel-tools/src/themes/quasar/components/sets/CvResourceComponentSet'
import VueMirroring           from 'crudvuel-tools/src/mirroring/VueMirroring'
let vueMirroring = new VueMirroring('ActionDialog')
import {
  QDialog,
  ClosePopup
} from 'quasar'

export default {
  mixins: [
    CvComponentSet,
    CvResourceComponentSet,
    vueMirroring.fixProperties({
      '[P|EM]dinGenCreateDialog'  : false,
      '[P]dinGenCreateAction'     : null,
      '[P]dinGenMinWidth'         : '320px',
      '[EM]dinGenActionCanceled'  : null,
      '[EM]dinGenActionCompleted' : null
    })
  ],

  data () {
    return  {
      createDialog:false
    }
  },

  components: {
    QDialog
  },

  directives: {
    ClosePopup
  },

  mounted () {
    console.log(this)
  }
}
</script>
