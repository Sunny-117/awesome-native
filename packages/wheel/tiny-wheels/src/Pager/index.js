import '../../style/pager.scss'

class Pager {
  constructor (options) {
    const defaultOptions = {
      element: null,
      total: 0,
      size: 10,
      current: 1,
      callback: () => {}
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.initPager()
    this.setPager()
  }

  initPager () {
    const $container = document.createElement('ul')
    $container.setAttribute('class', 'tiny-pager')
    this.options.element.appendChild($container)
    this.$container = $container
    this.pageCurrent = this.options.current
    this.pageCount = this.getpageCount()
  }

  getpageCount () {
    const total = this.options.total
    const size = this.options.size
    let count = 0
    if (total % size === 0) {
      count = total / size
    } else {
      count = (total - (total % size)) / size + 1
    }
    return count
  }

  setPager () {
    const pageItems = this.getPager()
    this.removePager()
    this.renderPager(pageItems)
    this.bindPager()
  }

  getPager () {
    const pages = [
      1,
      this.pageCount,
      this.pageCurrent,
      this.pageCurrent - 1,
      this.pageCurrent - 2,
      this.pageCurrent + 1,
      this.pageCurrent + 2
    ]
    const pageNumbers = [
      ...new Set(
        pages.filter(n => n >= 1 && n <= this.pageCount).sort((a, b) => a - b)
      )
    ]
    const pageItems = pageNumbers.reduce((items, current, index, array) => {
      items.push(current)
      if (array[index + 1] && array[index + 1] - array[index] > 1) {
        items.push('···')
      }
      return items
    }, [])
    return pageItems
  }

  renderPager (pageItems) {
    // console.log(pageItems)
    this.renderPagerPrev()
    pageItems.forEach(pageItem => {
      this.renderPagerItem(pageItem)
    })
    this.renderPagerNext()
  }

  removePager () {
    while (this.$container.firstChild) {
      this.$container.removeChild(this.$container.firstChild)
    }
  }

  renderPagerPrev () {
    const $pagerPrev = document.createElement('li')
    $pagerPrev.setAttribute('class', 'pager-prev')
    if (this.pageCurrent === 1) {
      $pagerPrev.classList.add('disabled')
    }
    $pagerPrev.innerText = '<'
    this.$container.appendChild($pagerPrev)
  }

  renderPagerNext () {
    const $pagerNext = document.createElement('li')
    $pagerNext.setAttribute('class', 'pager-next')
    if (this.pageCurrent === this.pageCount) {
      $pagerNext.classList.add('disabled')
    }
    $pagerNext.innerText = '>'
    this.$container.appendChild($pagerNext)
  }

  renderPagerItem (pageItem) {
    const $pagerItem = document.createElement('li')
    if (pageItem === this.pageCurrent) {
      $pagerItem.setAttribute('class', 'pager-item')
      $pagerItem.classList.add('active')
    } else if (pageItem === '···') {
      $pagerItem.setAttribute('class', 'pager-more')
    } else {
      $pagerItem.setAttribute('class', 'pager-item')
    }
    $pagerItem.innerText = pageItem
    this.$container.appendChild($pagerItem)
  }

  bindPager () {
    this.bindPagerNav()
    this.bindPagerItem()
  }

  bindPagerNav () {
    const $pagerPrev = document.querySelector('.pager-prev')
    const $pagerNext = document.querySelector('.pager-next')
    $pagerPrev.addEventListener('click', () => {
      if (!$pagerPrev.classList.contains('disabled')) {
        this.pageCurrent -= 1
        this.setPager()
        this.options.callback.call(null, this.pageCurrent)
      }
    })
    $pagerNext.addEventListener('click', () => {
      if (!$pagerNext.classList.contains('disabled')) {
        this.pageCurrent += 1
        this.setPager()
        this.options.callback.call(null, this.pageCurrent)
      }
    })
  }

  bindPagerItem () {
    const $$pageItems = document.querySelectorAll('.pager-item')
    $$pageItems.forEach($item => {
      $item.addEventListener('click', () => {
        if (!$item.classList.contains('active')) {
          this.pageCurrent = parseInt($item.innerText)
          this.setPager()
          this.options.callback.call(null, this.pageCurrent)
        }
      })
    })
  }
}

export default Pager
