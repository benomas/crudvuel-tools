<script>
import CvCustomExtender           from 'src/crudvuel/customs/components/resource/CvBaseCrud'
import CvActionContainer          from './CvActionContainer'
import CvButtons                  from '../others/CvButtons'
import CvToggle                   from '../others/CvToggle'
import CvNotify                   from '../others/CvNotify.js'
import CvSpinner                  from 'src/crudvuel/customs/themes/quasar/components/grid-components/CvSpinner'
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
