<template>
  <form class="login" @submit.prevent="login">
    <span class="input-text">Username:</span>
    <input class="username box" v-model="username" type="username" />
    <span class="password-text input-text">Password:</span>
    <input class="password box" v-model="password" type="password" />
    <span class="code-text input-text">Code:</span>
    <input class="code box" v-model="code" type="code" />
    <input class="submit" value="Login" type="submit" />
  </form>
</template>

<script>
export default {
  name: "ndalogin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await this.$accounts.register(
        this.username,
        this.password,
        this.code,
        this.$router
      );
    }
  }
};
</script>

<style lang="scss">
.login {
  margin: auto;
  position: absolute;
  width: 300px;
  height: 180px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1d1d1d;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.input-text {
  left: 0;
  margin-top: 5px;
  margin-left: 15px;
  position: absolute;
  color: #ffffff;
}

.box {
  position: absolute;
  width: 200px;
  height: 25px;
  padding: 5px;
  border-radius: 3px;
  color: #ffffff;
  border-color: #000000;
  background-color: #1b1b1b;
}

.username {
}

.submit {
  margin-bottom: 15px;
  bottom: 0;
  position: absolute;
  border: none;
  color: #ffffff;
  padding: 8px;
  width: 90%;
  border-radius: 4px;
  background-color: #4c27b3;
}

.code-text {
  margin-top: 112px;
}

.password-text {
  margin-top: 62px;
}

.password {
  margin-top: 55px;
}

.code {
  margin-top: 105px;
}
</style>