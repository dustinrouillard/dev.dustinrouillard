<template>
  <div class="main">
    <video
      ref="videoPlayer"
      class="video-js"
      :style="{ 'pointer-events': !stream.online ? 'none' : ''  }"
    ></video>
    <div class="chat-sidebar">
      <div class="chat-header">
        <h3 class="chat-header-title">{{ stream.title }}</h3>
        <span class="chatters">{{ chattersCount }}</span>
      </div>
      <div class="chat-content">
        <Chat id="messageContainer" />
      </div>
      <div class="chat-footer">
        <div class="chat-box-outter">
          <ChatSend/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import Chat from "../components/Chat/Chat";
import ChatSend from "../components/Chat/ChatSend";

export default {
  name: "NDA",
  data() {
    return {
      ...this.mapData(core => ({
        stream: core.services.stream.stream
      })),
      message: "",
      ...this.mapData(core => ({
        lastMessage: core.messages.lastMessage,
        chatters: core.services.socket.chatters,
        chattersCount: core.services.socket.chattersCount
      })),
      player: null,
      options: {
        autoplay: true,
        muted: true,
        ...this.mapData(core => ({
          controls: core.services.stream.stream.online
        })),
        poster: "https://assets.notify.me/covers/2.png",
        ...this.mapData(core => ({
          suppressNotSupportedError: true,
          sources: [core.services.stream.stream.url]
        }))
      }
    };
  },
  components: {
    Chat,
    ChatSend
  },
  mounted() {
    this.$messages.populate();
    this.$services.socket.connect(this.$el.querySelector("#messageContainer"));

    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );

    console.log(this.stream, this.options);
    // this.player.on('')
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    async sendMessage() {
      if (this.message == "") return;

      this.$messages.send(this.message);
      this.message = "";
      setTimeout(() => {
        let container = this.$el.querySelector("#messageContainer");
        container.scrollTop = container.scrollHeight;
      }, 2);

      return true;
    },
    async scrollToEnd() {}
  }
};
</script>

<style lang="scss">
@import "../assets/css/video-js.min.css";

.video-js {
  display: flex;
  margin: auto;
  width: 77%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.chat-sidebar {
  display: flex;
  margin: auto;
  width: 23%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
  background-color: #1b1b1b;
  border-color: #bebebe00;
  border-left: 1px;
  border-left-style: inset;
}

.chat-content {
  width: -webkit-fill-available;
}

.chat-header {
  background-color: #0a0a0a;
  border-color: #bebebe00;
  border-bottom: 1px;
  z-index: 20000;
  border-bottom-style: outset;
  display: flex;
  margin: auto;
  width: 100%;
  height: 4%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.chat-header .chat-header-title {
  color: #ffffff;
  display: flex;
  margin: auto;
  font-size: 13px;
}

.chat-box {
  position: absolute;
  display: flex;
  max-height: 20px;
  height: 18%;
  width: 85%;
  margin-top: 13px;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 10%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #ffffff;
  background-color: #1d1d1d;
  border-color: #5252521f;
  border-style: solid;
  border-radius: 2px;
  padding: 10px 10px 10px 10px;
}

.chat-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12%;
  display: flex;
  border-color: #bebebe00;
  border-top: 1px;
  border-top-style: inset;
}

.chat-send {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 25px;
  width: 91%;
  background: #442dad;
  color: white;
  border: 0;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 3%;
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #2d1e70;
  }
  &:active {
    background-color: #2d1e70;
    box-shadow: 0 1px #2d1e70;
    transform: translateY(-0.9px);
  }
}

.chatters {
  margin-left: -15px;
  margin-right: 15px;
  margin-top: 12px;
  font-size: 14px;
}
</style>