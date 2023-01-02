module.exports = {
    /**
     * 将一个数组的内容打乱
     * @param {*} arr 数组
     */
    sortRandom: function (arr) {
        arr.sort(function (a, b) {
            return Math.random() - 0.5;
        })
    },
    /**
     * 打印一个扑克牌的数组
     * @param {*} pokers 
     */
    print: function (pokers) {
        var str = "";
        for (var i = 0; i < pokers.length; i++) {
            var p = pokers[i];
            str += p.toString() + "   ";
        }
        console.log(str);
    }
}