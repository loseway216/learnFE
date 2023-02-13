const registerRouter = require("./backend/router");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";`,
      },
    },
  },
  devServer: {
    port: 9999,
    onBeforeSetupMiddleware(devServer) {
      registerRouter(devServer.app);
    },
  },
});
