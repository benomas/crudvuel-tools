<template>
  <div class="cv-spinner" :style="{'width': cFixedWidth,'height': cFixedHeight}">
    <div
      class="animation-container"
      v-if="cdIsMounted"
      :style="{
        'width'       :cAnimationFixedWidth,
        'height'      :cAnimationFixedHeight,
        'margin-left' :cFixedAnimationMarginLeft,
        'margin-top'  :cFixedAnimationMarginTop
      }"
    >
      <slot>
        <img class="animation-img" src="../../assets/spinner.gif">
      </slot>
    </div>
  </div>
</template>
<script>
import CvComponentSet from 'crudvuel-tools/src/components/sets/CvComponentSet'

export default {
  mixins: [
    CvComponentSet
  ],

  data () {
    return {
      isMounted:false
    }
  },

  props:[
    'cvTag',
    'cvWidth',
    'cvHeight',
    'cvTarget',
    'cvScale',
  ],

  computed:{
    cTag: function () {
      return this.cvTag || ''
    },

    cTarget: function () {
      if(this.cvTarget && this.cvTarget.$el)
        return this.cvTarget.$el

      return this.cvTarget || null
    },

    cWidth: function () {
      if(this.cvWidth)
        return this.cvWidth
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
      if(this.cvHeight)
        return this.cvHeight
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
      return this.$el.offsetWidth * this.cScale
    },

    cAnimationFixedWidth: function () {
      if(!this.cAnimationWidth)
        return null
      return this.cAnimationWidth + 'px'
    },

    cAnimationHeight: function () {
      return this.$el.offsetHeight * this.cScale
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
    },

    cScale: function () {
      return this.cvScale || 0.20
    },

    cSelfRef :  function () {
      return this
    },

    cdIsMounted: function () {
      return this.isMounted || false
    }
  },

  mounted: function () {
    this.isMounted=true
  }
}
</script>
