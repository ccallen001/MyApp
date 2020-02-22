<template>
  <div class="component NavBar">
    <nav>
      <!-- not actually a router-link or any kind of actionable item -->
      <div class="router-link user">
        <p class="user-initial" v-if="userEmail">{{ userEmail.substring(0, 1) }}</p>
        <Icon name="fas fa-user-alt-slash" v-else />
      </div>
      <router-link class="router-link" to="/login" alt="Login" exact>
        <!-- Login -->
        <Icon name="fa fa-user" />
      </router-link>
      <router-link class="router-link" to="/" alt="Home" exact>
        <!-- Home -->
        <Icon name="fa fa-home" />
      </router-link>
      <router-link class="router-link" to="/dashboard" alt="Dashboard" exact>
        <!-- Dashboard -->
        <Icon name="fas fa-tachometer-alt" />
      </router-link>
      <router-link class="router-link" to="/chat" alt="Chat" exact>
        <!-- Chat -->
        <Icon name="fas fa-comment-alt" />
      </router-link>
      <!-- Sign Out -->
      <div class="router-link sign-out" v-if="userEmail">
        <div @click="signOut">
          <Icon name="fas fa-sign-out-alt" />
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import "@/main.scss";

.NavBar {
  height: $navBarHeight;
  background-color: $black;

  nav {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .router-link {
      padding: 0 8px;
      color: $gray;
      font-size: 28px;
      text-decoration: none;
      cursor: pointer;

      &.user {
        position: absolute;
        left: 0;

        .user-initial {
          color: $white;
          font-size: 40px;
          font-weight: bold;
          transform: translateY(-4px);
        }
      }

      &.sign-out {
        position: absolute;
        right: 0;
      }

      &[class*="router-link-exact-active"]/* , */
      /* &:hover:not(.sign-out) */ {
        color: $white;
      }
    }
  }
}
</style>

<script>
import Icon from "@/components/Icon";

import * as firebase from "firebase/app";
import 'firebase/auth';

export default {
  components: {
    Icon
  },
  computed: {
    userEmail() {
      return this.$store.state.user && this.$store.state.user.email;
    }
  },
  methods: {
    async signOut() {
      await firebase.auth().signOut();

      this.$showModal(`User "${this.userEmail}" successfully logged out.`);

      this.$store.commit("setUser", null);

      setTimeout(() => {
        this.$closeModal();
        if (this.$route.path !== "/login") {
          this.$router.replace("login");
        }
      }, 3000);
    }
  }
};
</script>