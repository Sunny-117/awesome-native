var tools = (function () {
  function digitalize(str) {
    return Number(str.replace(/\s+/g, "")) || 0;
  }
  function getTarget(ev) {
    var e = ev || window.event;
    return e.target || e.srcElement;
  }
  return {
    digitalize,
    getTarget,
  };
})();
