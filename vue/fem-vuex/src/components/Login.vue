<template>
  <div>
    <button @click="handleLogin">登录</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleLogin() {
      this.$store.dispatch("login").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
