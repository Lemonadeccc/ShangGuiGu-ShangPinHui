const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      //代理服务器解决跨域
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        pathRewrite: { "^/api": "" },
      },
    },
  },

});
