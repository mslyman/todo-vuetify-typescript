module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  // baseUrl: '',
  // outputDir: '../wwwroot',
  configureWebpack: {
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    }
  }
}
