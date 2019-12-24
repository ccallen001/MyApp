<template>
  <div class="view Chat">
    <h2>Chat</h2>
    <v-list class="message-list" dense>
      <v-list-item v-for="message in messages" :key="message.date">
        <p class="author">{{ message.author }}</p>
        <p class="text">{{ message.text }}</p>
        <p class="time">{{ new Date(message.time) }}</p>
      </v-list-item>
    </v-list>
    <v-text-field
      class="user-message"
      label="Message"
      v-model="userMessage"
      @keypress.enter="postMessage"
    ></v-text-field>
  </div>
</template>

<style lang="scss">
.Chat {
  position: relative;
  height: 100%;

  .message-list {
    max-height: 50vh;
    overflow: auto;

    .v-list-item {
      display: block;
      margin-bottom: 8px;
      padding: 0;
      text-align: left;

      .author {
        font-size: 10px;
        font-weight: bold;
      }

      .time {
        font-size: 10px;
      }
    }
  }

  .user-message {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
}
</style>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return {
      messages: [],
      userMessage: ""
    };
  },
  computed: {
    userEmail() {
      return this.$store.state.user && this.$store.state.user.email;
    }
  },
  created() {
    firebase
      .firestore()
      .collection("messages")
      .onSnapshot(snapshot => {
        let messages = [];
        snapshot.forEach(doc => messages.push(doc.data()));
        this.messages = messages.sort((curr, prev) => {
          return curr.time <= prev.time
            ? curr.time !== prev.time
              ? -1
              : 0
            : 1;
        });
      });
  },
  methods: {
    postMessage() {
      if (this.userMessage) {
        firebase
          .firestore()
          .collection("messages")
          .add({
            author: this.userEmail,
            time: new Date().getTime(),
            text: this.userMessage
          });

        this.userMessage = "";
      }
    }
  }
};
</script>