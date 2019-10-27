import Vue from 'vue';
import App from './App.vue';
import './quasar';
import { createProvider } from './vue-apollo';
import './styles/quasar.styl';
import getPlugins from './plugins';

Vue.config.productionTip = false;

(async () => {
  const plugins = await getPlugins();

  new Vue({
    ...plugins,
    apolloProvider: createProvider(),
    render: (h) => h(App),
  }).$mount('#app');
})();
