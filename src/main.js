import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { BootstrapVue } from 'bootstrap-vue'

import messages from './translations/translations'
import buildRouter from './router'
import buildStore from './store/store'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)

const i18n = new VueI18n({ locale: 'es', messages, fallbackLocale: 'es' })

new Vue({
  render: h => h(App),
  router: buildRouter(),
  i18n,
  store: buildStore()
}).$mount('#app')
