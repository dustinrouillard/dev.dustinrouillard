<template>
  <div class="main">
    <div class="header">
      <img alt="avatar" class="avatar" src="../assets/logo.gif">
      <div class="info">
        <h1>Tetrabyte</h1>
        <h3>Fullstack Developer / System Administrator</h3>
      </div>
      <div class="button-container">
        <button class="big-button margin-right" @click="showModal('about')">About</button>
        <button class="big-button margin-right" @click="showModal('projects')">Projects</button>
        <button class="big-button" @click="showModal('contributions')">Contributions</button>
      </div>
      <Socials/>
    </div>
    <Modal v-if="show" :screen="screen" @close="hideModal" />
  </div>
</template>

<script>
import Socials from '@/components/items/Socials';
import Modal from '@/components/Modal';

export default {
  name: 'home',
  components: {
    Socials,
    Modal
  },
  data() {
    return {
      screen: '',
      show: false
    }
  },
  methods: {
    hideModal() {
      this.show = false;
      this.screen = '';
    },

    showModal(type) {
      this.show = true;
      this.screen = type;
    }
  }
}
</script>
