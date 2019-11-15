<template>
  <div class="main">
    <Main />
  </div>
</template>

<script>
import Main from '@/components/sections/Main';

export default {
  name: 'home',
  components: {
    Main
  },
  data() {},
  methods: {}
}
</script>
<style scoped>
.tab {
  margin-right: 15px;
}
@media only screen and (max-width: 768px) {
  .center {
    text-align: center;
  }
  .tab {
  margin-right: unset;
  }
}

</style>