(function (doc, tools, compute) {
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
    var tar = tools.getTarget(ev);
    tagName = tar.tagName.toLowerCase();
    if (tagName === "button") {
      var method = tar.getAttribute("data-method"),
        fVal = tools.digitalize(fInput.value);
      sVal = tools.digitalize(sInput.value);
      renderResult(compute[method](fVal, sVal));
    }
  }
  function renderResult(result) {
    oResult.innerHTML = result;
  }

  init();
})(document, tools, compute);
