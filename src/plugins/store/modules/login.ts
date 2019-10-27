import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module
export default class Login extends VuexModule {
  public user = '';
  public token = '';
  public name = '';
  public roles: string[] = [];
  public settings = {};

  @Mutation
  public setToken(token: string) {
    this.token = token;
  }
  @Mutation
  public setSettings(settings: any) {
    this.settings = settings;
  }

  @Mutation
  public setName(name: string) {
    this.name = name;
  }

  @Mutation
  public setRoles(roles: string[]) {
    this.roles = roles;
  }

  @Action({ commit: 'setToken' })
  public async login(token: string) {
    localStorage.setItem('token', token);
    return token;
  }

  @Action({ commit: 'setToken' })
  public async logOut() {
    localStorage.removeItem('token');
    return '';
  }
}

// const userModule = {
//   state: {
//     user: '',
//     token: '',
//     name: '',
//     roles: [],
//     settings: {},
//   },

//   mutations: {
//     SET_TOKEN: (state, token) => {
//       state.token = token;
//     },
//     SET_SETTINGS: (state, settings) => {
//       state.settings = settings;
//     },
//     SET_NAME: (state, name) => {
//       state.name = name;
//     },
//     SET_ROLES: (state, roles) => {
//       state.roles = roles;
//     },
//   },

//   actions: {
//     async login({ commit }, token) {
//       commit('SET_TOKEN', token);

//       localStorage.setItem('token', token);
//     },
//     async logOut({ commit, state }) {
//       try {
//         commit('SET_TOKEN', '');
//         commit('SET_ROLES', []);
//         localStorage.removeItem('token');
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
// };

// export default userModule;
