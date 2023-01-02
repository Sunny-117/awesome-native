// 该文件实现登录框的显示和隐藏


// 等待 .header .login 被点击，点击了之后，显示出 .login-area
var divLogin = document.querySelector(".header .login");
// divLogin.onclick： 当点击的时候
divLogin.onclick = function () {
  // 点击之后，会运行这里的代码
  // 显示出 .login-area
  var divLoginArea = document.querySelector(".login-area");
  // 设置divLoginArea的display样式为block
  divLoginArea.style.display = "block";
};

// 当点击.login-area .close的时候，把.login-area隐藏
var divClose = document.querySelector(".login-area .close");
divClose.onclick = function (e) {
  e.preventDefault(); //阻止a元素跳转页面
  var divLoginArea = document.querySelector(".login-area");
  divLoginArea.style.display = "none";
};
