// 交互
var titles = document.querySelectorAll('.menu h2'); // 获取所有的标题元素
var itemHeight = 30; // 每个子菜单的高度
var totalMS = 300; // 动画播放的总时长

for (var i = 0; i < titles.length; i++) {
  titles[i].onclick = function () {
    // 收起其他所有菜单
    var beforeOpened = document.querySelector('.submenu[status=opened]');
    if (beforeOpened) {
      closeSubmenu(beforeOpened);
    }
    toggleSubmenu(this.nextElementSibling);
  };
}

// 打开子菜单
function openSubmenu(subMenu) {
  // 子菜单是有状态（关闭、打开、正在播放动画）
  // 通过自定义属性status，判定它的状态
  var status = subMenu.getAttribute('status');
  if (status !== 'closed' && status) {
    // 不是关闭状态
    return; // 啥也不干
  }
  subMenu.setAttribute('status', 'playing');
  // 将子菜单的高度从0变到？（子项数量*itemHeight）
  createAnimation({
    from: 0,
    to: itemHeight * subMenu.children.length,
    totalMS: totalMS,
    onmove: function (n) {
      subMenu.style.height = n + 'px';
    },
    onend: function () {
      subMenu.setAttribute('status', 'opened');
    },
  });
}

// test
var testMenu = document.querySelector('.submenu');

// 关闭子菜单
function closeSubmenu(subMenu) {
  // 子菜单是有状态（关闭、打开、正在播放动画）
  // 通过自定义属性status，判定它的状态
  var status = subMenu.getAttribute('status');

  if (status !== 'opened') {
    // 不是打开状态
    return; // 啥也不干
  }
  subMenu.setAttribute('status', 'playing');
  // 将子菜单的高度从0变到？（子项数量*itemHeight）
  createAnimation({
    from: itemHeight * subMenu.children.length,
    to: 0,
    totalMS: totalMS,
    onmove: function (n) {
      subMenu.style.height = n + 'px';
    },
    onend: function () {
      subMenu.setAttribute('status', 'closed');
    },
  });
}

// 切换子菜单
function toggleSubmenu(subMenu) {
  var status = subMenu.getAttribute('status');
  if (status === 'playing') {
    // 正在播放动画
    return;
  } else if (status === 'opened') {
    closeSubmenu(subMenu);
  } else {
    openSubmenu(subMenu);
  }
}
