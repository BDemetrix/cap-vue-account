const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "My office",
    themeColor: "#488FC2"
  }
})
