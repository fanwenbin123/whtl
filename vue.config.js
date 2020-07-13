module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  // devServer: {
  //   hot: true,
  //   // 设置端口
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // },

  // configureWebpack: {
  //   devServer: {
  //       proxy: {
  //           //名字可以自定义，这里我用的是api
  //           '/api': {
  //             target: 'http://119.96.152.198:39001',
  //             changeOrigin: true,//这里设置是否跨域
  //             pathRewrite: {
  //               '^/api': ''
  //             }
  //           }
  //       }

  //     }
  // }
}