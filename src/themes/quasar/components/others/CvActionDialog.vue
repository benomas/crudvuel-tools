<template>
  <div>
    <q-dialog
      :ref="'action-dialog-ref'"
      :value="cpDinGenShowActionDialog"
      @input="(()=>{this.emDinGenShowActionDialogEmitter(false)})"
      @hide="(()=>{this.emDinGenActionCanceledEmitter()})"
      full-height
      maximized
      :position="'right'"
      >
      <div v-if="cpDinGenDialogAction" class="h-100 bg-white" :style="{'min-width':cDialogMinWith,'margin-left':cDialogMargin}">
        <component
          v-bind:is="cpDinGenDialogAction.component"
          :cv-sta-gen-action="cpDinGenDialogAction"
          :cv-din-gen-action-mode="'dialog'"
          :cv-din-gen-key-value="cpDinGenKeyValue"
          :cv-din-gen-action-params="cpDinGenDialogActionParams"
          @action-canceled="mHide"
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
      '[P|EM]dinGenShowActionDialog' : false,
      '[P]dinGenDialogAction'        : null,
      '[P]dinGenKeyValue'            : null,
      '[P]dinGenDialogActionParams'  : null,
      '[P]dinGenDefaultMarginRatio'  : 0.15,
      '[P]dinGenDepthMarginRatioFix' : 0.05,
      '[EM]dinGenActionCanceled'     : null,
      '[EM]dinGenActionCompleted'    : null,
      '[D|M]cancelInProgress'        : false
    })
  ],

  components: {
    QDialog
  },

  directives: {
    ClosePopup
  },

  computed: {
    cDialogDepth () {
      let parent =  null
      let depth = 0
      parent = this
      do{
        parent = parent.$parent
        if (
          parent.$vnode != null &&
          parent.$vnode.componentOptions != null &&
          parent.$vnode.componentOptions.tag != null
        ){
          if(parent.$vnode.componentOptions.tag === 'cv-action-dialog')
            depth ++
        }
      }while(parent.$parent != null)

      return depth
    },

    cDepthMarginRatio () {
      return this.cpDinGenDefaultMarginRatio + this.cpDinGenDepthMarginRatioFix * this.cDialogDepth
    },

    cDialogMinWith () {
      if (this.cLtsm)
        return this.cWindowsWidth + 'px'

      return this.cWindowsWidth *  (1 - this.cDepthMarginRatio) + 'px'
    },

    cDialogMargin () {
      if (this.cLtsm)
        0

      return (this.cWindowsWidth * this.cDepthMarginRatio) + 'px'
    }
  },

  methods: {
    mHide(){
      this.$refs['action-dialog-ref'].hide()
    }
  }
}
</script>
