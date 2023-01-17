<template>
  <div class="container">
    <div class="collapse-demo-2" data-collapse-active="2">
      <div data-collapse-name="折叠面板1" data-collapse-key="1">
        折叠内容
      </div>
      <div data-collapse-name="折叠面板2" data-collapse-key="2">
        折叠内容
      </div>
      <div data-collapse-name="折叠面板3" data-collapse-key="3">
        折叠内容
      </div>
      <div data-collapse-name="折叠面板4" data-collapse-key="4">
        折叠内容
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    import('../../../dist/index.js').then(module => {
      const { Collapse } = module
      new Collapse({
        element: document.querySelector('.collapse-demo-2')
      })
    })
  }
}
</script>

<style lang="scss">
.container {
  max-width: 800px;
  margin: 30px auto;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 16px;
}
</style>
