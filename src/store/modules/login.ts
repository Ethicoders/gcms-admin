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
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_SETTINGS: (state, settings) => {
      state.settings = settings;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    async login({ commit }, token) {
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
