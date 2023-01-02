(function (doc) {
  var oCalculator = doc.getElementsByClassName("J_calculator")[0],
    oResult = oCalculator.getElementsByClassName("result")[0],
    fInput = oCalculator.getElementsByTagName("input")[0],
    sInput = oCalculator.getElementsByTagName("input")[1],
    oBtnGroup = oCalculator.getElementsByClassName("btn-group")[0];
  var init = function () {
    bindEvent();
  };
  function bindEvent() {
    oBtnGroup.addEventListener("click", onBtnClick, false);
  }
  function onBtnClick(ev) {
    var e = ev || window.event,
      tar = e.target || e.srcElement,
      tagName = tar.tagName.toLowerCase();
    if (tagName === "button") {
      var method = tar.getAttribute("data-method"),
        fVal = Number(fInput.value.replace(/\s+/g, "")) || 0,
        sVal = Number(sInput.value.replace(/\s+/g, "")) || 0;
      renderResult(compute(method, fVal, sVal));
    }
  }
  function renderResult(result) {
    oResult.innerHTML = result;
  }
  function compute(method, val1, val2) {
    switch (method) {
      case "plus":
        return val1 + val2;
      case "minus":
        return val1 - val2;
      case "mul":
        return val1 * val2;
      case "div":
        return val1 / val2;
      default:
        break;
    }
  }
  init();
})(document);
