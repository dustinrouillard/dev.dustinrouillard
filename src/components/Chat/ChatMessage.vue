<template>
  <div class="chat-message" v-if="!message.system && message.author && !message.author.action">
    <span class="chat-timestamp">{{ new Date(message.date).toLocaleTimeString('en-US') }}</span>
    <span class="chat-author" :style="{ color: message.author.color }">{{ message.author.name }}</span>:
    <span
      class="chat-content"
      :class="{ failed: message.failed, 'fade-out': message.failed }"
    >{{ message.content }}</span>
  </div>
  <div
    class="chat-message action-message"
    v-else-if="message.author && message.author.action && !message.system"
  >
    <span class="chat-timestamp">{{ new Date(message.date).toLocaleTimeString('en-US') }}</span>
    <span
      class="chat-author space-right"
      :style="{ color: message.author.color }"
    >{{ message.author.name }}</span>
    <span
      class="chat-content"
      :class="{ failed: message.failed, 'fade-out': message.failed }"
    >{{ message.content }}</span>
  </div>
  <div class="chat-message system-chat" v-else-if="message.system">
    <span class="system-message">{{ message.content }}</span>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: ["message"]
};
</script>

<style lang="scss">
.chat-timestamp {
  font-size: 10px;
  color: #7c7c7c;
  margin-right: 10px;
}

.chat-author {
  font-size: 13px;
}

.chat-message {
  font-size: 14px;

  -webkit-animation: fadein 0.7s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.7s; /* Firefox < 16 */
  -ms-animation: fadein 0.7s; /* Internet Explorer */
  -o-animation: fadein 0.7s; /* Opera < 12.1 */
  animation: fadein 0.7s;

  .fade-out {
    -webkit-animation: fadeOut 5.2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeOut 5.2s; /* Firefox < 16 */
    -ms-animation: fadeOut 5.2s; /* Internet Explorer */
    -o-animation: fadeOut 5.2s; /* Opera < 12.1 */
    animation: fadeOut 5.2s;
  }

  word-wrap: break-word;

  &.system-chat {
    text-align: center;
  }

  .failed {
    color: #ff2525;
    opacity: 0.5;
  }
}

.space-right {
  margin-right: 8px;
}

.action-message {
  font-style: italic;
  color: #4283c0;
  &.chat-message {
    font-size: 13px;
  }
}

.system-message {
  font-size: 14px;
  left: 0;
  right: 0;
  position: relative;
  color: #ffffff80;

  -webkit-animation: fadein 0.7s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.7s; /* Firefox < 16 */
  -ms-animation: fadein 0.7s; /* Internet Explorer */
  -o-animation: fadein 0.7s; /* Opera < 12.1 */
  animation: fadein 0.7s;

  .fade-out {
    -webkit-animation: fadeOut 5.2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeOut 5.2s; /* Firefox < 16 */
    -ms-animation: fadeOut 5.2s; /* Internet Explorer */
    -o-animation: fadeOut 5.2s; /* Opera < 12.1 */
    animation: fadeOut 5.2s;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Internet Explorer */
@-ms-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Opera < 12.1 */
@-o-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
