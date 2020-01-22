<template>
  <div class="chat-message">
    <span class="chat-timestamp">{{ new Date(message.date).toLocaleTimeString('en-US') }}</span>
    <span class="chat-author" :style="{ color: message.author.color }">{{ message.author.name }}</span>:
    <span class="chat-content">{{ message.content }}</span>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: ["message"]
};
</script>

<style>
.chat-timestamp {
  font-size: 10px;
  color: #7c7c7c;
  margin-right: 10px;
}

.chat-author {
  font-size: 13px;
}

.chat-message {
  margin-bottom: 14px;
  font-size: 16px;

  -webkit-animation: fadein 0.7s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.7s; /* Firefox < 16 */
  -ms-animation: fadein 0.7s; /* Internet Explorer */
  -o-animation: fadein 0.7s; /* Opera < 12.1 */
  animation: fadein 0.7s;
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
</style>
