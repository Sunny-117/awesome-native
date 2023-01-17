import '../../style/collapse.scss'

const mergeStyle = ($node, style) => Object.assign($node.style, style)

class Collapse {
  constructor (options) {
    const defaultOptions = {
      element: '',
      callback: () => {},
      accordion: false
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.$container = this.options.element
    this.initCollapse()
    this.setCollapse()
    this.bindCollapse()
  }

  initCollapse () {
    this.$container.classList.add('tiny-collapse')
    this.initCollapsePanels()
    this.initCollapseItems()
  }

  initCollapsePanels () {
    const $$collapsePanels = this.$container.children
    this.$$collapsePanels = [...$$collapsePanels]
    this.$$collapsePanels.forEach($panel =>
      $panel.setAttribute('class', 'collapse-panel')
    )
  }

  initCollapseItems () {
    this.$$collapsePanels.forEach($panel => {
      const $collapseItem = document.createElement('div')
      $collapseItem.setAttribute('class', 'collapse-item')
      const $collapseHeader = this.initCollapseHeader($panel)
      $collapseItem.appendChild($collapseHeader)
      $collapseItem.appendChild($panel)
      this.$container.appendChild($collapseItem)
    })
  }

  initCollapseHeader ($panel) {
    const $collapseHeader = document.createElement('div')
    $collapseHeader.setAttribute('class', 'collapse-header')
    $collapseHeader.innerText = $panel.dataset.collapseName
    return $collapseHeader
  }

  setCollapse () {
    this.$$collapseItems = this.$container.querySelectorAll('.collapse-item')
    this.setCollapseItem()
    this.setCollapsePanels()
  }

  setCollapseItem () {
    let collapseKeys = this.$container.dataset.collapseActive
    if (collapseKeys) {
      collapseKeys = collapseKeys.split(',')
      this.$$collapsePanels.forEach(($panel, index) => {
        if (collapseKeys.indexOf($panel.dataset.collapseKey) !== -1) {
          this.$$collapseItems[index].classList.add('active')
        }
      })
    }
  }

  setCollapsePanels () {
    this.panelsHeight = []
    this.$$collapsePanels.forEach(($panel, index) => {
      this.panelsHeight.push($panel.offsetHeight)
      if (this.$$collapseItems[index].classList.contains('active')) {
        mergeStyle($panel, { height: `${$panel.offsetHeight}px` })
      } else {
        mergeStyle($panel, { height: '0', paddingBottom: '0' })
      }
      setTimeout(() => {
        $panel.classList.add('animate')
      })
    })
  }

  bindCollapse () {
    this.bindCollapseItems()
    this.bindCollapsePanels()
  }

  bindCollapseItems () {
    this.$$collapseItems.forEach(($item, index) => {
      $item.addEventListener('click', () => {
        if (this.options.accordion) {
          this.clearCollapse($item)
        }
        this.toggleCollapse($item, index)
        const collapseKey = this.$$collapsePanels[index].dataset.collapseKey
        const collapseActiveKeys = this.getCollapseActiveKeys()
        this.options.callback.call(null, $item, collapseKey, collapseActiveKeys)
      })
    })
  }

  bindCollapsePanels () {
    this.$$collapsePanels.forEach($panel => {
      $panel.addEventListener('click', e => {
        e.stopPropagation()
      })
    })
  }

  clearCollapse ($bindItem) {
    this.$$collapseItems.forEach(($item, index) => {
      if ($item !== $bindItem) {
        $item.classList.remove('active')
        mergeStyle(this.$$collapsePanels[index], { height: '0', paddingBottom: '0' })
      }
    })
  }

  toggleCollapse ($bindItem, index) {
    const $panel = this.$$collapsePanels[index]
    if ($bindItem.classList.contains('active')) {
      $bindItem.classList.remove('active')
      mergeStyle($panel, { height: '0', paddingBottom: '0' })
    } else {
      $bindItem.classList.add('active')
      mergeStyle($panel, { height: `${this.panelsHeight[index]}px`, paddingBottom: '' })
    }
  }

  getCollapseActiveKeys () {
    const collapseActiveKeys = []
    this.$$collapseItems.forEach(($item, index) => {
      if ($item.classList.contains('active')) {
        collapseActiveKeys.push(
          this.$$collapsePanels[index].dataset.collapseKey
        )
      }
    })
    return collapseActiveKeys
  }
}

export default Collapse
