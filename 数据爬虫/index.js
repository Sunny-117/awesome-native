var getMovies = require("./getMovies")
var fs = require("fs");


getMovies().then(movies => {
    var json = JSON.stringify(movies);
    fs.writeFile("movie.json", json, function () { // 三个参数：文件名 写什么数据 书写完调用的函数
        console.log("成功！")
    });
})


// getMovies().then(movies => {
//     for (var i = 0; i < movies.length; i++) {
//         console.log(movies[i].name);
//     }
// })



// const axios = require('axios');
// async function test() {
//     // 不跨域，跨域是浏览器端的
//     const resp = await axios.get("https://movie.douban.com/chart");
//     const body = resp.data;
//     console.log(body);
//     // console.log(typeof body);
// }
// test()

// 看这文档编程