import Vue from 'vue'
import Router from 'vue-router'
import Chatroom from '@/components/Chatroom'


Vue.use(Router)




// Object.keys(locales).forEach(function(lang) {
//   Vue.locale(lang, locales[lang]);
// });

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chatroom',
      component: Chatroom
    }
  ]
})
