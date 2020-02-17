import {Notify} from 'quasar'

let actions = [
  {
    icon    : 'fas fa-times-circle',
    color   : 'white',
    handler : () => {
    }
  }
]
export default {

  createPositive: function (message) {
    Notify.create({
      message,
      color     : 'positive',
      position : 'bottom-right',
      icon     : 'fas fa-check-circle',
      actions
    })
  },
  createNegative: function (message) {
    Notify.create({
      message,
      color     : 'negative',
      position : 'bottom-right',
      icon     : 'fas fa-exclamation-triangle',
      actions
    })
  },
  createWarning: function (message) {
    Notify.create({
      message,
      color     : 'warning',
      position : 'bottom-right',
      icon     : 'fas fa-exclamation',
      actions
    })
  },
  createInfo: function (message) {
    Notify.create({
      message,
      color     : 'info',
      position : 'bottom-right',
      icon     : 'fas fa-info-circle',
      actions
    })
  }
}
