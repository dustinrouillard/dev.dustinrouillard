<template>
  <div class="main">
    <span class="view-source" title="View Source Code" v-tippy="{ placement: 'bottom' }">
      <a href="https://github.com/dustinrouillard/dev.dustinrouillard" target="_blank">
        <fa class="view-source-icon" :icon="['fas', 'code-branch']" />
      </a>
    </span>
    <div class="header">
      <img alt="avatar" class="avatar" src="../../assets/avatar.jpg" />
      <Info />
      <div class="button-container">
        <button class="big-button margin-right" @click="showModal('about')">About</button>
        <button class="big-button margin-right" @click="showModal('domains')">Domains</button>
        <button class="big-button margin-right" @click="showModal('projects')">Projects</button>
        <button class="big-button" @click="showModal('contributions')">Contributions</button>
      </div>
      <Socials />
    </div>
    <Modal v-if="show" :screen="screen" @close="hideModal" />
  </div>
</template>

<script>
import Socials from "@/components/items/Socials";
import Modal from "@/components/Modal";
import Info from "@/components/modules/Info";

export default {
  name: "home",
  components: {
    Socials,
    Modal,
    Info
  },
  data() {
    return {
      screen: "",
      show: false
    };
  },
  methods: {
    hideModal() {
      this.show = false;
      this.screen = "";
    },

    showModal(type) {
      this.show = true;
      this.screen = type;
    }
  }
};
</script>
