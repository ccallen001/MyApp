import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserPhotoURL(state, photoURL) {
      firebase
        .firestore()
        .collection('users')
        .doc(state.user.uid)
        .update({ photoURL })
        .then(() => {
          state.user.photoURL = photoURL;
        });
    }
  },
  actions: {
  },
  modules: {
  }
});
