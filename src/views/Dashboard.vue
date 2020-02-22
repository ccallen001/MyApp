<template>
  <div class="view About">
    <h2>Dashboard</h2>
    <div v-if="user.photoURL">
      <h4>{{ user.email }}</h4>
      <img :src="user.photoURL" />
    </div>
    <div>
      <input ref="fileInput" type="file" accept="image/*" capture="user" @input="handleInput" />
      <div @click="$refs.fileInput.click()">
        <Icon name="fas fa-camera" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.About {
  input[type="file"] {
    display: none;
  }

  .fas.fa-camera {
    font-size: 32px;
    cursor: pointer;
  }

  h2 {
    margin-bottom: 32px;
  }

  h4 {
    margin-bottom: 8px;
  }

  img {
    width: 200px;
  }
}
</style>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

import Icon from "@/components/Icon";

export default {
  components: {
    Icon
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async handleInput({ srcElement }) {
      const _this = this;

      const file = srcElement.files[0];

      const arrayBuffer = await file.arrayBuffer();
      const base64Str = window.btoa(
        new Uint8Array(arrayBuffer).reduce(
          (str, byte) => str + String.fromCharCode(byte),
          ""
        )
      );

      const img = document.createElement("img");
      img.src = `data:image/jpeg;base64,${base64Str}`;

      img.onload = () => {
        const targetWidth = 600;
        img.width = targetWidth;
        img.height = (targetWidth / img.naturalWidth) * img.naturalHeight;

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/jpeg");

        firebase
          .firestore()
          .collection("users")
          .doc(this.user.uid)
          .update({ photoURL: dataURL })
          .then(() => this.$store.commit("setUserPhotoURL", dataURL));
      };
    }
  }
};
</script>
