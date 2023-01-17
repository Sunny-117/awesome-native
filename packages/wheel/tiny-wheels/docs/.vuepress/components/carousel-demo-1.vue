<template>
  <div class="container">
    <div class="carousel-demo-1">
      <div class="carousel-panel">
        <div class="demo-panel">0</div>
      </div>
      <div class="carousel-panel">
        <div class="demo-panel">1</div>
      </div>
      <div class="carousel-panel">
        <div class="demo-panel">2</div>
      </div>
      <div class="carousel-panel">
        <div class="demo-panel">3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    import('../../../dist/index.js').then(module => {
      const { Carousel } = module
      new Carousel({
        element: document.querySelector('.carousel-demo-1'),
        height: '200px'
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
.demo-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
