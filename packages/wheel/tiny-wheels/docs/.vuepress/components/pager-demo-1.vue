<template>
  <div class="container">
    <div class="pager-demo-1">
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    import('../../../dist/index.js').then(module => {
      const { Pager } = module
      new Pager({
        element: document.querySelector('.pager-demo-1'),
        total: 200
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
