import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import { VuePluginContext } from '../aggregate';
import discover from '@/discover';

Vue.use(Vuex);

export default async (context: VuePluginContext) => {
  const axios = await context.axios;
  const schemaResponse = await axios.post('/graphql', {
    query: discover,
  });

  interface Notification {
    message: string;
    onClick: () => void;
  }

  interface State {
    notifications: Notification[];
    schema: any;
    isAlive: boolean;
  }

  const app = {
    state: (): State => ({
      notifications: [],
      schema: schemaResponse.data.data.discover,
      isAlive: true,
    }),
    namespaced: true,
    mutations: {
      setSchema: (state: State, schema: any) => {
        state.schema = schema;
      },
      notify: (state: State, notification: Notification) => {
        state.notifications.push(notification);
      },
      resurrectConnection: (state: State) => {
        state.isAlive = true;
      },
      killConnection: (state: State) => {
        state.isAlive = false;
      },
    },
  };

  return new Vuex.Store({
    modules: {
      app,
      login,
    },
  });
};
