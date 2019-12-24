<template>
  <div class="component Modal">
    <div class="modal-blackout" v-if="modalIsShowing" @click="close">
      <div class="modal" ref="modal">
        <header>
          <span>Header</span>
          <div @click="close" ref="modalClose">
            <Icon id="modal-close" name="fa fa-times" />
          </div>
        </header>
        <main>
          <p>{{ modalText }}</p>
        </main>
        <footer>
          <span>footer</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/main.scss";

.Modal {
  .modal-blackout {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    .modal {
      display: flex;
      flex-direction: column;
      margin: auto;
      padding: 8px;
      width: 50vw;
      min-width: 300px;
      height: 300px;
      background-color: $white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      header {
        display: flex;
        padding: 8px;
        height: $navBarHeight / 1.5;
        background-color: $black;
        color: $white;

        span {
          margin: auto;
        }

        #modal-close {
          cursor: pointer;
        }
      }

      main {
        flex: auto;
        padding: 8px;
      }

      footer {
        display: flex;
        height: $navBarHeight / 2;
        background-color: $black;
        color: $white;

        span {
          margin: auto;
        }
      }
    }
  }
}
</style>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon
  },
  created() {
    this.$root.$on("showModal", text => {
      this.modalText = text;
      this.modalIsShowing = true;
    });

    this.$root.$on("closeModal", () => {
      this.modalText = "";
      this.modalIsShowing = false;
    });

    window.addEventListener(
      "keyup",
      ({ key }) => key === "Escape" && this.close(null, true)
    );
  },
  data() {
    return {
      modalIsShowing: false,
      modalText: ""
    };
  },
  methods: {
    close(ev, wasEscaped) {
      const path = (ev && ev.path) || null;

      if (
        (path && !path.includes(this.$refs.modal)) ||
        (path && path.includes(this.$refs.modalClose)) ||
        wasEscaped
      ) {
        this.modalIsShowing = false;
        this.modalText = "";
      }
    }
  }
};
</script>