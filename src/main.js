import Vue from 'vue';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/vuex';
import apolloProvider from './vue-apollo';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';

Vue.config.productionTip = false
Vue.use(VueLodash, { name: 'custom', lodash: lodash });
new Vue({
  vuetify,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
