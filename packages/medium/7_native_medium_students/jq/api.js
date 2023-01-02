// yapi  param
var data = Mock.mock({
    "result|100": [{
        "id": "@id",
        "name": "@cname",
        "birth": "@date('yyyy')",
        "sex|1": [0, 1],
        "sNo": "@integer(1000, 1000000)",
        "email": "@email",
        "phone": "@integer(12000000000, 19000000000)",
        "address": "@city(true)",
        "appkey": "@word(16)",
        "ctime": 1547190636,
        "utime": 1547190636
    }]
})
// yapi 测试工具
Mock.mock(RegExp('addStudent?[\w\W]*'), 'post', function (options) {
    console.log(options);
    var body = decodeURIComponent(options.body); //对body转码
    var student = formatQuery(body);
    data.result.push(student);
    return {
        "data": {},
        "status": "success",
        "msg": "新增成功"
    }
})

Mock.mock(RegExp('studentList?[\w\W]*'), 'get', function (options) {
    console.log(options)
    var queryStr = options.url.slice(options.url.indexOf('?') + 1);
    var queryObj = formatQuery(queryStr);
    console.log(queryObj)
    // 第一页  10条   0 - 9
    //  第二页  10条   10 - 19    10n -- 10n + 9
    //  n 页   10条   10 (n - 1)   --- 10 n
    //  n 页   m条    m (n - 1)  -- m n
    var result = data.result.filter(function (item, index) {
        return index >= queryObj.size * (queryObj.page - 1) && index < queryObj.size * queryObj.page;
    })

    return {
        "data": {
            total: data.result.length,
            result: result
        },
        "status": "success",
        "msg": "查询成功"
    }
})

Mock.mock('/updateStudent', 'get', {
    "data": {},
    "status": "success",
    "msg": "查询成功"
})

Mock.mock(RegExp('delBySno?[\w\W]*'), 'get', function (options) {
    var queryStr = options.url.slice(options.url.indexOf('?') + 1);
    var queryObj = formatQuery(queryStr);
    var sNo = queryObj.sNo;
    data.result = data.result.filter(function (item) {
        return item.sNo != sNo;
    })
    // 第一页  10条   0 - 9
    //  第二页  10条   10 - 19    
    //  n 页   10条   10 (n - 1)   --- 10 n
    //  n 页   m条    m (n - 1)  -- m n

    return {
        "data": {
            // total: data.result.length,
            // result: result
        },
        "status": "success",
        "msg": "删除成功"
    }
})

// 当前函数  是把字符串 key=value&key1=value1  ===》  {key: value, key1: value1}
function formatQuery(queryStr) {
    var queryArr = queryStr.split('&');
    var queryObj = {};
    for (var i = 0; i < queryArr.length; i++) {
        var key = queryArr[i].split('=')[0];
        var value = queryArr[i].split('=')[1];
        queryObj[key] = value;
    }
    return queryObj
}