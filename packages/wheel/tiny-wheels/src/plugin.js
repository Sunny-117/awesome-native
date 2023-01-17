{
  class Plugin {
    constructor ($container) {
      this.$container = $container
    }
  }
  // 如果不使用 webpack 打包就直接挂载到全局对象上 暴露给外部使用
  window.Plugin = Plugin
}
