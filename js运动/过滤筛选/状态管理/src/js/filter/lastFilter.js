function combineFilterFunc (obj) {
    var combineFilterObj = obj;
    return function (arr) {
        var lastArr = arr;
        for (var prop in combineFilterObj) {
            lastArr = combineFilterObj[prop](store.getState()[prop], lastArr);
        }
        console.log(lastArr);
        return lastArr;
    }
}

var lastFilter = combineFilterFunc({text: filterByText, sex: filterBySex});