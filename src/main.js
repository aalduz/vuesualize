import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import Vuex from 'vuex';
import App from '@/App.vue';
import { routes } from '@/routes';
import { store } from '@/store/store'

Vue.use(VueFire);
Vue.use(VueRouter);

Vue.config.keyCodes.comma = 188;

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    return {
      x: 0,
      y: 0
    };
  }
});

// Route Guards: Avoid leaving without confirmation for certain routes.
router.beforeEach((to, from, next) => {
  next();
});

export const helpers = Object.freeze({
    object: {
      copy: function (object) {
        return JSON.parse(JSON.stringify(object));
      }
    }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
