import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import colors from 'vuetify/lib/util/colors' 
import Mainpage from './pages/Mainpage.vue';
import 'babel-polyfill'
import ellipsis from '@hyjiacan/vue-ellipsis'
import VueI18n from 'vue-i18n'
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(ellipsis)
Vue.use(VueI18n)
Vue.component(VueCountdown.name, VueCountdown);

import en from './static/i18n/us.json';
import zh from './static/i18n/zh-tw.json';
import cn from './static/i18n/cn.json';
import jp from './static/i18n/jp.json';
import ru from './static/i18n/ru.json';
import es from './static/i18n/es.json';
import fr from './static/i18n/fr.json';

const messages = {
  'en-US': en,
  'zh-TW': zh,
  'zh-CN': cn,
  'ja-JP': jp,
  'ru-RU': ru,
  'cn': cn,
  'ja': jp,
  'en': en,
  'ru': ru,
  'es': es, 
  'es-ES': es, 
  'fr': fr, 
  'fr-FR': fr
}

const i18n = new VueI18n({
  locale: 'en-US', // set locale
 messages, // set locale messages
})
new Vue({ i18n }).$mount('#app')


Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  
  routes: [
    {
      path: '/mainpage',
      name: 'mainpage',
      component: Mainpage
    },

    {  path: '/*',
       name: 'root',
       component: Mainpage
    }

  ]
});

const opts = {

theme: {
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        background: colors.grey.lighten5, // Not automatically applied
        
      },
      dark: {
        primary: colors.blue.lighten3, 
        background: colors.grey.darkenen4, // If not using lighten/darken, use base to return hex
        
      },
    },
  },

}

new Vue({
  el: '#app',

  router,
  vuetify: new Vuetify(opts),
  i18n,  
  render: h => h( App )
});
