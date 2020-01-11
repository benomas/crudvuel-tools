<script>
import CvBaseCrud                 from '../../../../components/resource/CvBaseCrud'
import CvDefiner                  from './CvDefiner'
import CvActionContainer          from './CvActionContainer'
import CvButtons                  from '../others/CvButtons'
import CvToggle                   from '../others/CvToggle'
import CvNotify                   from '../others/CvNotify.js'
import CvSpinner                  from 'src/customs/crudvuel/themes/quasar/components/grid-components/CvSpinner'
import {QIcon,QField,QInput,QBtn,colors} from 'quasar'
export default {
  mixins: [
    CvBaseCrud,
    CvDefiner
  ],
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

    if(this.cAutoFill){
      console.log(
        '%c Autofill function is enabled'+
        '%c every create component now autofill his fields with 1,' +
        '%c this behaivor can be changed in .env file',
        'font-weight: bold; background: ' + colors.getBrand('white') + '; color: ' + colors.getBrand('info'),
        'background: ' + colors.getBrand('white') + '; color: ' + colors.getBrand('warning'),
        'background: ' + colors.getBrand('white') + '; color: ' + colors.getBrand('negative')
      );
    }
  }
}
</script>
