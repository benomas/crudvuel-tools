<script>
import CvCustomExtender           from 'src/crudvuel/customs/components/resource/CvBaseCrud.vue'
import CvActionContainer          from './CvActionContainer.vue'
import CvButtons                  from '../others/CvButtons.vue'
import CvToggle                   from '../others/CvToggle.vue'
import CvNotify                   from '../others/CvNotify.js'
import CvSpinner                  from '../grid-components/CvSpinner'
import {QIcon,QField,QInput,QBtn} from 'quasar'
export default {
  extends    : CvCustomExtender,
  components : {
    CvActionContainer,
    CvButtons,
    QBtn,
    QField,
    QIcon,
    QInput,
    CvToggle,
    CvSpinner
  },
  methods: {
    successNotification: function () {
      if (this.successNotificationMessages) {
        CvNotify.createPositive(this.successNotificationMessages)
        this.successNotificationMessages = null
      }
    },
    errorNotification: function () {
      if (this.errorNotificationMessages) {
        CvNotify.createNegative(this.errorNotificationMessages)
        this.errorNotificationMessages = null
      }
    },
    cancelNotification: function () {
      if (this.cancelNotificationMessages) {
        CvNotify.createInfo(this.cancelNotificationMessages)
        this.cancelNotificationMessages = null
      }
    },
    infoNotification: function () {
      if (this.infoNotificationMessages) {
        CvNotify.createWarning(this.infoNotificationMessages)
        this.infoNotificationMessages = null
      }
    }
  },
  mounted: function () {
    if (!this.cAutoload)
      return false
    if (this.rowKeyValue)
      this.getService()
    else
      this.setReady()
  }
}
</script>
