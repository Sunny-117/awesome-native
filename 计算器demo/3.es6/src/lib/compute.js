export default (target) => {
  target.prototype.plus = function (a, b) {
    return a + b;
  };
  target.prototype.minus = function (a, b) {
    return a - b;
  };
  target.prototype.mul = function (a, b) {
    return a * b;
  };
  target.prototype.div = function (a, b) {
    return a / b;
  };
};
