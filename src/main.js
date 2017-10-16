// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Icon from 'vue-awesome/icons'
import io from 'socket.io-client'
import {listen} from './socket/listen.js'

import vuexI18n from 'vuex-i18n'
import en from '@/i18n/en.json'
import tw from '@/i18n/tw.json'
import jp from '@/i18n/jp.json'

const locales = {
  en: en,
  tw: tw
};

let socket = io.connect('http://localhost:8080');
store.state.socket = socket;
window.socket = socket;



Vue.config.productionTip = false
Vue.component('icon', Icon);
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', en);
Vue.i18n.add('tw', tw);
Vue.i18n.add('jp', jp);

Vue.i18n.set(store.state.lang);


/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')


listen();