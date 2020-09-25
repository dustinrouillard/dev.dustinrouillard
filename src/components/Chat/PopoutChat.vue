<template>
  <div class="chat-messages">
    <div class="message" v-for="message in messages" :key="message.id">
      <ChatMessage :id="message.id" :message="message" />
    </div>
  </div>
</template>

<script>
import ChatMessage from "./ChatMessage";

export default {
  name: "Chat",
  components: {
    ChatMessage
  },
  data() {
    return {
      ...this.mapData(core => ({
        messages: core.messages["chat-messages"]
      }))
    };
  }
};
</script>

<style>
.chat-messages {
  overflow-x: auto;
  margin-top: 5%;
  margin-left: 1%;
  margin-right: 1%;
  max-height: 43vw;
  bottom: 0;
}

.chat-messages::-webkit-scrollbar {
  display: none;
  overflow: hidden;
}

.message {
  margin-bottom: 13px;
}
</style>