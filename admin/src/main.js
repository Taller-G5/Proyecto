
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import 'font-awesome/css/font-awesome.css';  
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import Truncate from 'lodash.truncate';
import HighchartsVue from 'highcharts-vue'
// Helpers
Vue.config.productionTip = false;
Vue.config.devtools=false
Vue.config.debug = false
Vue.config.silent = true
// Global filters
Vue.filter('truncate', Truncate);
Vue.use(HighchartsVue)
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(Vuetify, {
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
