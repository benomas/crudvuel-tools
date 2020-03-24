<template>
  <div>
    <q-dialog
      :value="cpDinGenCreateDialog"
      @input="(()=>{this.emDinGenCreateDialogEmitter(false)})"
      full-height
      maximized
      :position="'right'"
      >
      <div v-if="cpDinGenCreateAction" class="h-100 bg-white" :style="{'min-width':cDialogMinWith,'margin-left':cDialogMargin}">
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
      '[P|EM]dinGenCreateDialog'     : false,
      '[P]dinGenCreateAction'        : null,
      '[P]dinGenDefaultMarginRatio'  : 0.15,
      '[P]dinGenDepthMarginRatioFix' : 0.05,
      '[EM]dinGenActionCanceled'     : null,
      '[EM]dinGenActionCompleted'    : null
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

  mounted () {
    //console.log(this.cDepthMarginRatio)
  }
}
</script>
