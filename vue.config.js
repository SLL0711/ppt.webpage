const { defineConfig } = require('@vue/cli-service')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new UglifyJsPlugin(),
      new webpack.BannerPlugin("最终版权归Wingtech BG5SW所有")
    ]
  }
})
