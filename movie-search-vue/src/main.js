import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate';


Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://vue-project-7bc5e.firebaseio.com';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);



const router = new VueRouter({


  routes

});




new Vue({

  el: '#app',
  router,
  store,
  render: h => h(App),

})
