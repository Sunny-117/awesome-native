const axios = require("axios");
const cheerio = require("cheerio");
/**
 * 得到所有电影的html字符串
 */
async function getMoviesHtml() {
    const resp = await axios.get("https://movie.douban.com/chart")
    return resp.data;
}

/**
 * 获取所有电影数据
 */
async function getMoviesData() {
    const html = await getMoviesHtml();
    const $ = cheerio.load(html);
    var trs = $("tr.item") // 关键 tr标签 类名item
    // console.log(trs.length);10部电影
    var movies = [];
    for (let i = 0; i < trs.length; i++) {
        var tr = trs[i]; // 拿到了每一个tr   
        //分析每个tr的数据，得到一部电影对象
        var m = getMovie($(tr)); // DOM对象转成jq对象
        movies.push(m);
    }
    return movies;
}

/**
 * 分析tr，得到一部电影对象
 * @param {*} tr 
 */
function getMovie(tr) {
    var name = tr.find("div.pl2 a").text();
    name = name.replace(/\s/g, ""); //去掉空白字符
    name = name.split("/")[0]; // 拿到电影名字
    var imgSrc = tr.find("a.nbg img").attr("src");
    var detail = tr.find("div.pl2 p.pl").text();
    return {
        name,
        imgSrc,
        detail
    }
}

module.exports = getMoviesData; // 只需要导出这个模块