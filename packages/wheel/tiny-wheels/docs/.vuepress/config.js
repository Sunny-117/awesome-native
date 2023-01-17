module.exports = {
  title: 'tiny-wheels',
  description: '一套基于原生JavaScript开发的组件库，无依赖、体积小、简单易用',
  base: '/tiny-wheels/',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: 'Github', link: 'https://github.com/csdoker/tiny-wheels' }
    ],
    sidebar: [
      {
        title: '使用',
        collapsable: false,
        children: ['/get-started/']
      },
      {
        title: '组件',
        collapsable: false,
        children: ['/components/collapse', '/components/tabs', '/components/pager', '/components/carousel', '/components/tree']
      }
    ]
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-task-lists'))
    }
  }
}
