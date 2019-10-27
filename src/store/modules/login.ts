import Vue from 'vue';
import gql from 'graphql-tag';

const userModule = {
  state: {
    user: '',
    token: '',
    name: '',
    roles: [],
    settings: {},
  },

  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      state.token = token;
    },
    SET_SETTINGS: (state: any, settings: any) => {
      state.settings = settings;
    },
  },

  actions: {
    async login({ commit }, token: string) {
      commit('SET_TOKEN', token);

      localStorage.setItem('token', token);
    },
    async logOut({ commit, state }) {
      try {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        localStorage.removeItem('token');
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default userModule;
