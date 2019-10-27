import Vue from 'vue';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:4001',
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error),
);

const plugin = {
  install() {
    Vue.prototype.$axios = instance;
    Vue.axios = instance;
  },
};

Vue.use(plugin);

export default instance;
