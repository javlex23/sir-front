import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import VueMask from 'v-mask'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import VueClipboard from 'vue-clipboard2'

const datepickerOptions = {
  sundayFirst: false,
  days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  daysShort: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  colors: {
    selected: '#2b5b72',
    inRange: '#8eb9ce',
    selectedText: '#fff',
    text: '#565a5c',
    inRangeBorder: '#395f72',
    disabled: '#fff',
  },
  texts: {
    apply: 'Aplicar',
    cancel: 'Cancelar',
    keyboardShortcuts: 'Keyboard Shortcuts',
  },
}

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueMask);
Vue.use(AirbnbStyleDatepicker, datepickerOptions)
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true

Vue.config.productionTip = false

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://10.21.51.126:8082'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8082'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
