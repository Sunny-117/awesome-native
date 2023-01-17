<template>
  <div class="container">
    <div class="tree-demo-2"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      treeDatas: [
        {
          title: '标题-1',
          expand: true,
          children: [
            {
              title: '标题-2',
              selected: true
            },
            {
              title: '标题-3',
              expand: true,
              children: [
                {
                  title: '标题-4'
                }
              ]
            },
            {
              title: '标题-5',
              expand: true,
              children: [
                {
                  title: '标题-6'
                },
                {
                  title: '标题-7'
                },
                {
                  title: '标题-8'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () {
    import('../../../dist/index.js').then(module => {
      const { Tree } = module
      new Tree({
        element: document.querySelector('.tree-demo-2'),
        data: this.treeDatas,
        multiple: true
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
