function filterBySex(sexStr, arr) {
    if (sexStr == 'a') {
        // html里自定义属性
        return arr;
    } else {
        return arr.filter(function (ele, index) {
            if (sexStr.indexOf(ele.sex) != -1) {
                return true;
            }
        })
    }
};