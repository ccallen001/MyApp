import Vue from 'vue';

import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';

import * as firebase from 'firebase/app';
import firebaseConfig from './firebase.config';

import App from './App.vue';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './registerServiceWorker';

let _this;
let appHasMounted = false;

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

Vue.mixin({
  created() {
    _this = this;
  },
  methods: {
    $showModal(text) {
      this.$root.$emit('showModal', text);
    },
    $closeModal() {
      this.$root.$emit('closeModal');
    }
  }
});

firebase
  .auth()
  .onAuthStateChanged(() => {
    if (!appHasMounted) {
      router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(({ meta }) => meta.requiresAuth);
        const currentUser = firebase.auth().currentUser;

        store.commit('setUser', currentUser);

        if (requiresAuth && !currentUser) {
          const isLoginPage = from.path === '/login';

          _this && _this.$showModal(!isLoginPage ? 'Redirecting to login page...' : `You need to log in to see the ${to.name} page!`);

          setTimeout(() => {
            _this && _this.$closeModal();
            !isLoginPage && next('/login');
          }, 3000);
        } else {
          next();
        }
      });

      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app');
    }

    appHasMounted = true;
  });