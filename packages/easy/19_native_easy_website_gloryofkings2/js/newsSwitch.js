// 切换新闻
// 切换到第 n 个新闻， n从0开始
function switchNews(n) {
  var value = -n * 100 + "%"; //计算它最终的margin-left
  var divNews = document.querySelector(".news-banner .news-blocks");
  divNews.style.marginLeft = value;

  //去掉之前的active
  var before = document.querySelector(
    ".news-container .title-container .active"
  );
  before.className = "";
  //给相应的li加上类样式
  var newsUl = document.querySelector(".news-container .title-container");

  newsUl.children[n].className = "active";
}

var ulTitles = document.querySelector(".news-container .title-container");
ulTitles.onmouseover = function (e) {
  if (e.target.tagName != "LI") {
    return; //如果你移入的不是LI，我啥都不做
  }
  // 代码到了这里，一定是一个LI
  var children = Array.from(ulTitles.children);
  var index = children.indexOf(e.target);
  if (index >= 5) {
    //超过了新闻版面的数量
    //目前移入的这个li是最后一个
    return;
  }
  switchNews(index);
};
