// 1. 获取外部大盒子
var contactList = document.querySelector("#contacts-list");
// 2. 获取固定用来展示标题的盒子
var fixedHeader = contactList.querySelector(".contacts-header");
// 3. 获取所有的联系人分组
var group = contactList.querySelectorAll(".contacts-group");
// 4. 获取所有的联系人分组的title
var groupTitle = contactList.querySelectorAll(".contacts-group-title");

// 声明一个数组，保存所有联系人分组的数据（高度，top值等等等）
var data = [];

// 遍历所有的联系人分组
for(var i = 0; i < group.length; i ++){
  data.push({
    // 当前组的组标题
    headerText: groupTitle[i].innerText,
    // 当前组的标题的高度
    headerHeight: groupTitle[i].offsetHeight,
    // 当前组的组标签（group)
    group: group[i],
    // 当前组的高度
    groupHeight: group[i].offsetHeight,
    // 当前组的top值
    groupOffsetTop: group[i].offsetTop,
    // 当前组的底边的位置
    groupBottom: group[i].offsetHeight + group[i].offsetTop
  })
}

// console.log(data);

// 给当前页面注册一个滚动事件
document.body.addEventListener("scroll", function(e){
  e.stopPropagation();

  // 在页面滚动的时候，我们需要判断当前是在哪个组的范围内
  // 判断出来之后，就把这个组的标题，设置给绝对定位的标题元素

  // 获取当前滚动条的位置
  var currentTop = document.body.scrollTop;
  // console.log(currentTop);

  // 声明一个变量，用来保存在范围内的组数据
  var currentData;
  // 挨个去找，看一下在谁的范围里面
  for(var i = 0; i < data.length; i ++){
    if(currentTop >= data[i].groupOffsetTop && currentTop <= data[i].groupBottom){
      currentData = data[i]
      break;
    }
  }

  // 检测一下下面的组的标题，是不是要和当前固定的标题贴住了
  // 如果贴住了，那就需要把固定的标题隐藏掉，把当前组的标题定位改到当前组的最下面

  if(currentTop >= currentData.groupBottom - currentData.headerHeight){
    // console.log("ok");
    // 1. 把固定的标题隐藏掉
    fixedHeader.className = "contacts-header is-hidden";
    // 2. 当前组的标题定位改到当前组的最下面
    currentData.group.className = "contacts-group is-animated";
  }else{
    // 不是贴住的情况
    fixedHeader.className = "contacts-header";
    currentData.group.className = "contacts-group";
  }

  // console.log(currentData);
  // 替换一下，固定的标题的内容
  fixedHeader.innerText = currentData.headerText;
})

// 点击导航按钮，滚动到指定的组位置
var nav = document.querySelector("#contacts-nav")

nav.addEventListener("click", function(event){

  // console.log(event.target.innerText);
  // 通过 event.target.innerText 获取到了组对应的名字
  

  // 声明一个变量，用来保存找到的对应的组数组
  var targetGroup;
  // 根据这个组名字，找到对应的组数据
  for(var i = 0; i < data.length; i ++){
    if(data[i].headerText == event.target.innerText){
      targetGroup = data[i];
      break;
    }
  }

  // console.log(targetGroup);
  // document.body.scrollTop = targetGroup.groupOffsetTop;

  var currentScrollTop = document.body.scrollTop;
  var initHeight = 0;
  var targetTop = targetGroup.groupOffsetTop - initHeight;
  var step = Math.abs(currentScrollTop - targetTop) / 30;

  function animate(){
    if(currentScrollTop > targetTop + 5){
      currentScrollTop -= step;
      document.body.scrollTop = currentScrollTop;
    }else if(currentScrollTop < targetTop - 5){
      currentScrollTop += step;
      document.body.scrollTop = currentScrollTop;
    }else{
      return false;
    }

    setTimeout(animate, 17)
  }

  animate();
 
})