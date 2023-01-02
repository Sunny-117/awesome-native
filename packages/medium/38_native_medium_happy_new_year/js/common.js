function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function $$$(tagName) {
  return document.createElement(tagName);
}

// 阻止 touchstart 事件的默认行为
document.body.addEventListener(
  "touchstart",
  function (e) {
    if (e.target.dataset.default) {
      // 该元素要保留默认行为
      return;
    }
    if (e.cancelable) {
      e.preventDefault();
    }
  },
  { passive: false }
);

// 阻止 touchmove 事件的默认行为
document.body.addEventListener(
  "touchmove",
  function (e) {
    if (e.target.dataset.default) {
      // 该元素要保留默认行为
      return;
    }
    if (e.cancelable) {
      e.preventDefault();
    }
  },
  { passive: false }
);

// 显示加载中...
function showLoading() {
  // 看看目前有没有loading的div
  var divModal = $("#loadingModal");
  if (divModal) {
    return;
  }
  divModal = $$$("div");
  divModal.id = "loadingModal";
  divModal.className = "g-modal";
  divModal.innerHTML = `<div class="g-loading">
  <img src="./assets/loading.svg" alt="" />
</div>`;
  document.body.appendChild(divModal);
}

// 关闭加载中...
function hideLoading() {
  var divModal = $("#loadingModal");
  if (divModal) {
    divModal.remove();
  }
}
