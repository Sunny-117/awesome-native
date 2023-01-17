import '../../style/tab.scss'

class Tabs {
  constructor (options) {
    const defaultOptions = {
      element: '',
      callback: () => {},
      animated: true
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.$container = this.options.element
    this.initTabs()
    this.setTabs()
    this.bindTabs()
  }

  initTabs () {
    this.$container.classList.add('tiny-tabs')
    this.$tabPanelContainer = this.initTabPanels()
    const $tabHeader = this.initTabHeader()
    this.$container.insertBefore($tabHeader, this.$tabPanelContainer)
  }

  initTabPanels () {
    const $tabPanelContainer = document.createElement('div')
    const $$tabPanels = this.$container.children
    this.$$tabPanels = [...$$tabPanels]
    $tabPanelContainer.setAttribute('class', 'tab-panels')
    this.$$tabPanels.forEach($panel => {
      $panel.setAttribute('class', 'tab-panel')
      $tabPanelContainer.appendChild($panel)
    })
    this.$container.appendChild($tabPanelContainer)
    return $tabPanelContainer
  }

  initTabHeader () {
    const $tabHeader = document.createElement('div')
    $tabHeader.setAttribute('class', 'tab-header')
    this.$$tabPanels.forEach($panel => {
      const $tabItem = this.initTabItem($panel)
      $tabHeader.appendChild($tabItem)
    })
    const $tabLine = this.initTabLine()
    $tabHeader.appendChild($tabLine)
    return $tabHeader
  }

  initTabItem ($panel) {
    const $tabItem = document.createElement('span')
    $tabItem.setAttribute('class', 'tab-item')
    $tabItem.innerText = $panel.dataset.tabName
    return $tabItem
  }

  initTabLine () {
    const $tabLine = document.createElement('span')
    $tabLine.setAttribute('class', 'tab-line')
    return $tabLine
  }

  setTabs () {
    this.$$tabItems = this.$container.querySelectorAll('.tab-item')
    this.$tabLine = this.$container.querySelector('.tab-line')
    this.setTabStatus()
    const tabIndex = this.getTabIndex() ? this.getTabIndex() : 0
    if (this.$$tabItems[tabIndex]) {
      const { offsetWidth, offsetLeft } = this.$$tabItems[tabIndex]
      this.setTabItem(this.$$tabItems[tabIndex])
      this.setTabLine(offsetWidth, offsetLeft)
      this.setTabPanel(this.$$tabPanels[tabIndex], tabIndex)
    }
  }

  getTabIndex () {
    const tabKey = this.$container.dataset.tabActive
    let tabIndex = tabKey
    if (tabKey) {
      this.$$tabPanels.forEach(($panel, index) => {
        if ($panel.dataset.tabKey === tabKey) {
          tabIndex = index
        }
      })
    }
    return tabIndex
  }

  bindTabs () {
    this.$$tabItems.forEach($tab => {
      $tab.addEventListener('click', () => {
        if (!$tab.classList.contains('disabled')) {
          const index = [...this.$$tabItems].indexOf($tab)
          this.setTabItem($tab)
          this.setTabLine($tab.offsetWidth, $tab.offsetLeft)
          this.setTabPanel(this.$$tabPanels[index], index)
          this.options.callback.call(null, $tab, this.$$tabPanels[index].dataset.tabKey)
        }
      })
    })
  }

  setTabStatus () {
    const tabKey = this.$container.dataset.tabDisabled
    if (tabKey) {
      this.$$tabPanels.forEach(($panel, index) => {
        if ($panel.dataset.tabKey === tabKey) {
          this.$$tabItems[index].classList.add('disabled')
        }
      })
    }
  }

  setTabItem ($tab) {
    this.$$tabItems.forEach($tab => $tab.classList.remove('active'))
    $tab.classList.add('active')
  }

  setTabPanel ($panel, index) {
    this.$tabPanelContainer.style.transform = `translateX(-${index * 100}%)`
    this.$$tabPanels.forEach($panel => $panel.classList.remove('active'))
    $panel.classList.add('active')
    setTimeout(() => {
      if (this.options.animated) {
        this.$tabPanelContainer.classList.add('animated')
      }
    })
  }

  setTabLine (width, left) {
    this.$tabLine.style.width = `${width}px`
    this.$tabLine.style.transform = `translateX(${left}px)`
  }
}

export default Tabs
