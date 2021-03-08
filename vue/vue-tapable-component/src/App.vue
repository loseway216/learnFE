<template>
  <div id="app">
    <select-user :plugin="SelectUserPlugin"></select-user>
  </div>
</template>

<script>
import SelectUser from './components/SelectUser'
import SelectUserPlugin from './plugins/SelectUserPlugin'

export default {
  name: 'App',
  components: {
    SelectUser
  },
  data() {
    return {
      SelectUserPlugin: new SelectUserPlugin()
    }
  },
  mounted() {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
