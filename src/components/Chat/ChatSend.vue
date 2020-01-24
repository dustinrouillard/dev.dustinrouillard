<template>
  <div>
    <div class="suggested" ref="suggested">
      <div
        v-for="(item, i) in commandSuggested"
        :key="i"
        class="suggested-item"
        @click="SelectSuggested(item)"
      >
        <p>{{ item }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input
        v-model="message"
        @keyup.esc="message = ''"
        @keyup.up="message = lastMessage"
        class="chat-box"
      />
      <input class="chat-send" value="Send" type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      commands: ["ping", "me"],
      commandSuggested: []
    };
  },
  methods: {
    SelectSuggested(cmd) {
      this.message = "/" + cmd;
    },
    async sendMessage() {
      if (this.message == "") return;

      this.$messages.send(this.message);
      this.message = "";
      // setTimeout(() => {
      //   let container = this.$refs.$scrollTop
      //   console.log(container)
      //   container.scrollTop = container.scrollHeight;
      // }, 2);

      return true;
    },
    async scrollToEnd() {}
  },
  watch: {
    message() {
      let m = this.message;

      if (m.startsWith("/")) {
        m = m.replace("/", "");

        // If the word is already fully typed
        if (this.commands.includes(m)) return (this.commandSuggested = []);

        // Return a list with commands that will be suggested
        this.commandSuggested = this.commands.filter(v => v.includes(m));
      } else if (this.commandSuggested.length > 0) this.commandSuggested = [];
    }
  }
};
</script>


<style lang="scss">
.suggested {
  z-index: 999;
  position: absolute;
  top: -200px;
  width: 100%;

  p {
    margin: 0;
  }

  .suggested-item {
    width: 100%;
    background: rgb(32, 32, 32);
    cursor: pointer;
    padding: 5px 0;
    padding-left: 15px;
    font-style: italic;
    bottom: 100%;

    &:hover {
      background: black;
      text-decoration: underline;
    }
    p {
      vertical-align: bottom;
    }
  }
}
</style>