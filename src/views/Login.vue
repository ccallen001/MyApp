<template>
  <div class="view Login">
    <h2>Login</h2>
    <div>
      <form>
        <v-text-field
          type="email"
          label="Email"
          v-model="email"
          autocomplete="email"
          @keypress.enter="logInOrSignUp"
        />
        <div class="password-container">
          <v-text-field
            :type="passwordFieldType"
            label="Password"
            autocomplete="current-password"
            v-model="password"
            @keypress.enter="logInOrSignUp"
          />
          <div class="hide-show" @click="togglePassword">
            <Icon :name="iconName" />
          </div>
        </div>
      </form>
      <p class="err-msg">{{ errMsg }}</p>
      <v-btn @click="logInOrSignUp">{{ is === 'login' ? 'Log In' : 'Sign Up' }}</v-btn>
      <p>
        Or
        <a href="#" @click="toggleIs">{{ is === 'login' ? 'Sign Up' : 'Log In' }}</a>
        if you {{ is === 'login' ? "don't" : '' }} already have an account.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Login {
  .password-container {
    position: relative;

    .hide-show {
      position: absolute;
      right: 4px;
      bottom: 26px;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
  }

  .err-msg {
    color: red;
  }

  .v-btn {
    margin: 32px 0;
  }
}
</style>

<script>
import Icon from "@/components/Icon";

import * as firebase from "firebase/app";
import 'firebase/app';
import 'firebase/firestore';

export default {
  components: {
    Icon
  },
  data() {
    return {
      iconName: "fas fa-eye-slash",
      passwordFieldType: "password",
      email: "",
      password: "",
      errMsg: "",
      is: "login"
    };
  },
  methods: {
    toggleIs() {
      this.is = this.is === "login" ? "signup" : "login";
    },
    togglePassword() {
      this.iconName =
        this.iconName === "fas fa-eye-slash"
          ? "fas fa-eye"
          : "fas fa-eye-slash";
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    goToDashBoard(action) {
      this.$showModal(
        `Yay! User "${this.$store.state.user.email}" successfully ${action}.`
      );

      setTimeout(() => {
        this.$closeModal();
        this.$router.replace("dashboard");
      }, 3000);
    },
    logInOrSignUp() {
      this.is === "login" ? this.logIn() : this.signUp();
    },
    async logIn() {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

        this.errMsg = "";

        this.$store.commit("setUser", user);

        this.goToDashBoard("logged in");
      } catch (err) {
        this.errMsg = `${err.code}: ${err.message}`;
        console.error(err);
      }
    },
    async signUp() {
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const uid = user.uid;

        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            uid,
            email: user.email
          });

        this.$store.commit("setUser", user);

        this.errMsg = "";

        this.goToDashBoard("signed up");
      } catch (err) {
        this.errMsg = `${err.code}: ${err.message}`;
        console.error(err);
      }
    }
  }
};
</script>