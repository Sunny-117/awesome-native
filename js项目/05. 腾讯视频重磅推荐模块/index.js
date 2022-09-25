var data = [
    {
        title: "三十而已",
        desc: "话题爽剧！姐姐飒气挑战",
        img: "https://puui.qpic.cn/media_img/lena/PICgthm4a_580_1680/0",
        bg: "rgb(25,117,180)"
    },
    {
        title: "明子·更新",
        desc: "唢呐版《倍爽儿》超嗨",
        img: "https://puui.qpic.cn/media_img/lena/PICvqg2sg_580_1680/0",
        bg: "rgb(1, 9, 30)"
    },
    {
        title: "穿越火线",
        desc: "鹿晗吴磊电竞逐梦",
        img: "https://puui.qpic.cn/media_img/lena/PICjkg0v5_580_1680/0",
        bg: "rgb(0,0,0);"
    },
    {
        title: "青春环游记",
        desc: "贾玲爆笑模仿吉娜",
        img: "https://puui.qpic.cn/media_img/lena/PIC1ks92y_580_1680/0",
        bg: "rgb(170, 210, 184)"
    },
    {
        title: "认真的嘎嘎们",
        desc: "56进24",
        img: "https://puui.qpic.cn/vupload/0/1596170042239_fqsodx2hu8.jpg/0",
        bg: "rgb(28, 28, 28)"
    },
    {
        title: "特别有种：致命行动",
        desc: "战狼生死救援",
        img: "https://puui.qpic.cn/media_img/lena/PICoiqm2f_580_1680/0",
        bg: "rgb(105, 77, 56)"
    },
    {
        title: "经典用流传",
        desc: "汪苏泷演绎现代版《桃花扇》",
        img: "https://vfiles.gtimg.cn/vupload/20200801/1f99821596240701848.jpg",
        bg: "rgb(3, 4, 25)"
    },
    {
        title: "舞者",
        desc: "佟丽娅主持春晚只因胆子大",
        img: "https://puui.qpic.cn/vupload/0/1596284169509_0rc2ds8lrh8o.jpg/0",
        bg: "rgb(23,22,17)"
    },
    {
        title: "奔跑吧",
        desc: "凌潇肃沙溢泥潭打滚",
        img: "https://puui.qpic.cn/media_img/lena/PIC0vrw2o_580_1680/0",
        bg: "rgb(178, 195, 211)"
    }
];
var imgs = document.getElementById("imgs");
var select = document.getElementById("select");
var activeTitle = "";
var activeImg = "";
var titleDOM = [];
var imgDOM = [];
var t = null;
data.forEach(function(item, index) {
    var tagA = document.createElement("a");
    tagA.setAttribute("href", "#");
    var style =
        "background-color:" +
        item.bg +
        ";background-image:url(" +
        item.img +
        ")";
    tagA.setAttribute("style", style);
    imgs.appendChild(tagA);
    var tagA1 = document.createElement("a");
    tagA1.setAttribute("href", "#");
    tagA1.setAttribute("class", "nav");
    tagA1.setAttribute("title", item.title + "：" + item.desc);
    // var banners = item.title.split(":");
    tagA1.innerHTML = " <span>" + item.title + "</span> "  + item.desc  ;
    select.appendChild(tagA1);
    if (index == 0) {
        tagA.setAttribute("class", "active");
        tagA1.setAttribute("class", "active");
        activeImg = tagA;
        activeTitle = tagA1;
    }
    tagA1.onmouseenter = function() {
        activeImg.removeAttribute("class");
        activeTitle.setAttribute("class", "nav");
        tagA.setAttribute("class", "active");
        tagA1.setAttribute("class", "active");
        activeImg = tagA;
        activeTitle = tagA1;
        clearInterval(t);
    };
    titleDOM.push(tagA1);
    imgDOM.push(tagA);
    tagA1.onmouseleave = function() {
        t = setInterval(move, 3000);
    };
});
function move() {   
    activeImg.removeAttribute("class");
    activeTitle.setAttribute("class", "nav");
    var index = titleDOM.indexOf(activeTitle);
    if (index == titleDOM.length - 1) {
        activeTitle = titleDOM[0];
        activeImg = imgDOM[0];
    } else {
        activeImg = imgDOM[index + 1];
        activeTitle = titleDOM[index + 1];
    }
    activeImg.setAttribute("class", "active");
    activeTitle.setAttribute("class", "active");
}
t = setInterval(move, 3000);
