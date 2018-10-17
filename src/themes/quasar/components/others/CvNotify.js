import {Notify} from 'quasar'

let actions = [
  {
    icon    : 'fas fa-times-circle',
    handler : () => {
    }
  }
]
export default {

  createPositive: function (message) {
    Notify.create({
      message,
      type     : 'positive',
      position : 'bottom-right',
      icon     : 'fas fa-check-circle',
      actions
    })
  },
  createNegative: function (message) {
    Notify.create({
      message,
      type     : 'negative',
      position : 'bottom-right',
      icon     : 'fas fa-exclamation-triangle',
      actions
    })
  },
  createWarning: function (message) {
    Notify.create({
      message,
      type     : 'warning',
      position : 'bottom-right',
      icon     : 'fas fa-exclamation',
      actions
    })
  },
  createInfo: function (message) {
    Notify.create({
      message,
      type     : 'info',
      position : 'bottom-right',
      icon     : 'fas fa-info-circle',
      actions
    })
  }
}
