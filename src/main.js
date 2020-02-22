import Vue from 'vue';

import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
  .onAuthStateChanged(async () => {
    if (!appHasMounted) {
      const currentUser = firebase.auth().currentUser;
      // const user = await firebase.firestore().collection('users').where('uid', '==', currentUser.uid).get();
      firebase.firestore().collection("users").where('uid', '==', currentUser.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const user = doc.data();

          store.commit('setUser', user);

          router.beforeEach((to, from, next) => {
            const requiresAuth = to.matched.some(({ meta }) => meta.requiresAuth);

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

          appHasMounted = true;
        });
      });
    }
  });