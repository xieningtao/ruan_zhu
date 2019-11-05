import Vue from 'vue'
import App from './views/Main.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false


// Vue.use(axios)
Vue.prototype.$http = axios

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
