//Edit this file to add logic in the heritage stairs
import {QUploader,date} from 'quasar'

export default {
  components:{
    QUploader,
    date
  },

  methods:{
    mDatePrefix (prefix = '',postfix = '') {
      return `${prefix}${date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')}${postfix}`
    }
  }
}
