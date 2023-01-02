var compute = (function () {
  function plus(a, b) {
    return a + b;
  }
  function minus(a, b) {
    return a - b;
  }
  function mul(a, b) {
    return a * b;
  }
  function div(a, b) {
    return a / b;
  }
  return {
    plus,
    minus,
    mul,
    div,
  };
})();
