import Vue from 'vue';
import Router, { Route } from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import System from '@/views/System.vue';
import RemotePluginList from '@/views/RemotePluginList.vue';
import GetListResource from '@/components/GetListResource.vue';
// import ManageResource from './components/ManageResource.vue';
import CreateResource from '@/components/createResource';
import UpdateResource from '@/components/updateResource';
import UpdatePlugin from '@/components/updatePlugin';
import GetListPlugin from '@/components/GetListPlugin.vue';
import { VuePluginContext } from './aggregate';

const LOGIN_PATH = '/login';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: LOGIN_PATH,
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: {
            menu: {
              icon: 'home',
            },
          },
        },
        {
          path: 'system',
          name: 'system',
          component: System,
          meta: {
            menu: {
              icon: 'settings_applications',
            },
          },
        },
        {
          path: 'Plugin/install',
          name: 'remotePluginList',
          component: RemotePluginList,
        },
        {
          path: 'Plugin/:name',
          name: 'updatePlugin',
          component: UpdatePlugin,
        },
        {
          path: 'Plugin',
          name: 'listPlugin',
          component: GetListPlugin,
        },
        {
          path: ':resource/create',
          name: 'createResource',
          component: CreateResource,
        },
        {
          path: ':resource/:id',
          name: 'updateResource',
          component: UpdateResource,
        },
        {
          path: ':resource',
          name: 'listResource',
          component: GetListResource,
        },
      ],
    },
  ],
});

Vue.use(Router);
export default async (context: VuePluginContext) => {
  const store = await context.store;
  router.beforeEach((to: Route, from: Route, next) => {
    if (!store.state.login.token && to.path !== LOGIN_PATH) {
      router.replace(LOGIN_PATH);
    } else {
      next();
    }
  });

  return router;
};
