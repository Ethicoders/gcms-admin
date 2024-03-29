import Vue from 'vue';
import Axios from 'axios';

const service = Axios.create({
  baseURL: 'http://localhost:4001',
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error),
);

const plugin = {
  install(Vue) {
    Vue.prototype.$axios = service;
  },
};

Vue.use(plugin);

export default () => service;
