<template>
  <div class="cv-spinner" :style="{'width': cFixedWidth,'height': cFixedHeight}">
    <div
      class="animation-container"
      v-if="cdReady"
      :style="{
        'width'       :cAnimationFixedWidth,
        'height'      :cAnimationFixedHeight,
        'margin-left' :cFixedAnimationMarginLeft,
        'margin-top'  :cFixedAnimationMarginTop
      }">
      <slot>
        <img class="animation-img" :src="require('crudvuel-tools/src/assets/spinner.gif')">
      </slot>
    </div>
  </div>
</template>
<script>
import CvComponentSet from 'crudvuel-tools/src/components/sets/CvComponentSet'
import VueMirroring   from 'crudvuel-tools/src/mirroring/VueMirroring'

export default {
  mixins: [
    CvComponentSet,
    new VueMirroring('Spinner').fixProperties({
      '[P]dinInsScale'    : 0.20,
      '[P]dinInsHeight'   : null,
      '[P]dinInsWidth'    : null,
      '[P]dinInsLineSize' : 9,
      '[P]dinInsSpeed'    : 1.0,
      '[P]dinInsXsSize'   : 70,
      '[P]dinInsSmSize'   : 75,
      '[P]dinInsMdSize'   : 80,
      '[P]dinInsLgSize'   : 90,
      '[P]dinInsXlSize'   : 90,
    })
  ],

  data () {
    return {
      isMounted:false
    }
  },

  props:[
    'cvTarget',
  ],

  computed:{
    cLoadingLabel () {
      let trans = this.mComLang('loadingLabel')
      if (trans !== '')
        return trans
      return 'Cargando'
    },

    cTarget: function () {
      if(this.cvTarget && this.cvTarget.$el)
        return this.cvTarget.$el

      return this.cvTarget || null
    },

    cWidth: function () {
      if(this.cpDinInsWidth)
        return this.cpDinInsWidth
      if(this.cTarget && this.cTarget.offsetWidth)
        return this.cTarget.offsetWidth
      return null
    },

    cFixedWidth: function () {
      if(!this.cWidth)
        return '100%'
      return this.cWidth + 'px'
    },

    cHeight: function () {
      if(this.cpDinInsHeight)
        return this.cpDinInsHeight
      if(this.cTarget && this.cTarget.offsetHeight)
        return this.cTarget.offsetHeight
      return null
    },

    cFixedHeight: function () {
      if(!this.cHeight)
        return '80%'
      return this.cHeight + 'px'
    },

    cAnimationWidth: function () {
      return this.$el.offsetWidth * this.cpDinInsScale
    },

    cAnimationFixedWidth: function () {
      if(!this.cAnimationWidth)
        return null
      return this.cAnimationWidth + 'px'
    },

    cAnimationHeight: function () {
      return this.$el.offsetHeight * this.cpDinInsScale
    },

    cAnimationFixedHeight: function () {
      if(!this.cAnimationHeight)
        return null
      return this.cAnimationHeight + 'px'
    },

    cAnimationMarginLeft: function () {
      if(!this.cWidth || !this.cAnimationWidth)
        return null
      return this.cWidth * 0.5 - this.cAnimationWidth * 0.5
    },

    cFixedAnimationMarginLeft: function () {
      if(!this.cAnimationMarginLeft)
        return null
      return this.cAnimationMarginLeft + 'px'
    },

    cAnimationMarginTop: function () {
      if(!this.cHeight || !this.cAnimationHeight)
        return null
      return this.cHeight * 0.5 - this.cAnimationHeight * 0.5
    },

    cFixedAnimationMarginTop: function () {
      if(!this.cAnimationMarginTop)
        return null
      return this.cAnimationMarginTop + 'px'
    }
  }
}
</script>
