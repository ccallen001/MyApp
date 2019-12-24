<template>
  <div id="app">
    <NavBar />
    <h1 id="app-title">My App</h1>
    <img
      id="app-logo"
      alt="App logo"
      src="@/assets/images/logo.png"
      @click="$showModal('Welcome to the App!')"
    />
    <router-view />
    <Modal />
  </div>
</template>

<style lang="scss" scoped>
@import "@/main.scss";

#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  #app-title {
    margin-top: 16px;
  }

  #app-logo {
    width: 80px;
    cursor: pointer;
  }
}
</style>

<script>
import Modal from "@/components/modals/Modal";
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar,
    Modal
  }
};
</script>
