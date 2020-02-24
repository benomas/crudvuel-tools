//Edit this file to add logic in the heritage stairs
import CvNotify             from 'crudvuel-tools/src/themes/quasar/components/others/CvNotify'

export default {
  methods: {
    mSuccessNotification (message) {
      CvNotify.createPositive(message)
      return this
    },

    mErrorNotification (message) {
      CvNotify.createNegative(message)
      return this
    },

    mCancelNotification (message) {
      CvNotify.createWarning(message)
      return this
    },

    mInfoNotification (message) {
      CvNotify.createInfo(message)
      return this
    }
  }
}
