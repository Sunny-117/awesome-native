// combineFilterFunc合并
function combineFilterFunc(config) {
  return function (data) {
    var lastArr = data;
    for (const prop in config) {
      lastArr = config[prop](lastArr, state[prop]);
    }
    return lastArr;
  };
}
var lastFilterFunc = combineFilterFunc({
  text: filterArrByText,
  sex: filterArrBySex,
});
