import CvSkeletonController  from 'crudvuel-tools/src/themes/quasar/components/resource/CvSkeletonController'

export default {
  mixins  : [CvSkeletonController],
  methods : {
    emStaGenRowProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mInyectSegment(emitted)
        resolve(emitted)
      })
    }
  }
}
