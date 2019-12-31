<template>
  <div class="view four0four">
    <h2>404</h2>
    <img src="@/assets/images/404.gif" />
  </div>
</template>

<style lang="scss">
.four0four {
  img {
    border-radius: 8px;
  }
}
</style>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$showModal(`Wait... where am I?? Redirecting to Home page.`);

      setTimeout(() => {
        this.$closeModal();
        this.$router.replace("/");
      }, 3000);
    }, 1000);
  }
};
</script>