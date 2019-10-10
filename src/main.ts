import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './quasar';
import { createProvider } from './vue-apollo';
import discover from './discover';
console.log('in');

Vue.config.productionTip = false;

(async () => {
  const schemaResponse = await Vue.axios.post('/graphql', {
    query: discover,
  });

  store.state.schema = schemaResponse.data.data.discover;
  new Vue({
    router,
    store,
    i18n,
    apolloProvider: createProvider(),
    render: (h) => h(App),
  }).$mount('#app');
})();
