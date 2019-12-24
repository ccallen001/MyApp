<template>
  <div class="component Icon">
    <i :class="name"></i>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>