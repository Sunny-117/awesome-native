//弹出层抽奖
$(document).ready(function () {
  var $rotaryArrow = $("#rotaryArrow");
  var $close = $(".close");
  var $raotary_looper = $(".rotary_box");
  var $rotary_wrap = $(".rotary_wrap");
  var $result = $(".result");
  var $rotary_fuzhu = $(".rotary_fuzhu");
  var $resultTxt = $("#resultTxt");
  var $resultTxt1 = $("#resultTxt1");
  var $resultBtn = $("#resultBtn");
  var $rotaryNot = $("#rotaryNot");
  var $submit = $(".submit");
  var $looper_close = $(".looper_close");
  if ($.cookie("rotary_time_hzh") == null) {
    setTimeout(function () {
      $raotary_looper.fadeIn(200);
      $rotary_wrap.fadeIn(200);
    }, 2000);
  } else {
    if ($.cookie("rotary_text_hzh") != null) {
      if ($.cookie("rotary_result_hzh") == null) {
        setTimeout(function () {
          $raotary_looper.fadeIn(200);
          $rotary_wrap.fadeIn(200);
          $resultTxt.val($.cookie("rotary_text_hzh"));
          $resultTxt1.val($.cookie("rotary_text_hzh"));
          $result.fadeIn(250);
        }, 2000);
      }
    }
  }
  //设置关闭按钮
  $close.click(function () {
    $raotary_looper.fadeOut(200);
    $rotary_wrap.fadeOut(200);
  });
  //抽奖开始
  $rotaryArrow.click(function () {
    if ($.cookie("rotary_time_hzh") == null) {
      //如果cookie为空，即没有抽过
      var data = [0, 1, 2, 3, 4, 5, 6, 7];
      //再在此生成IP-cookie
      var $time = new Date();
      var $_COOKIE = $.cookie("rotary_time_hzh", $time, {
        expires: 24,
        path: "/",
      });
      data = data[Math.floor(Math.random() * data.length)];
      /*奖品概率*/
      if (data == 1) {
        // Math.floor(Math.random()*(10-4+1)+4)
        data = Math.random() < 0.1 ? 1 : Math.floor(Math.random() * 6 + 2);
      } else if (data == 2) {
        data = Math.random() < 0.1 ? 2 : Math.floor(Math.random() * 6 + 2);
      } else if (data == 3) {
        data = Math.random() < 0.1 ? 3 : Math.floor(Math.random() * 6 + 2);
      } else if (data == 4) {
        data = Math.random() < 0.1 ? 4 : Math.floor(Math.random() * 7 + 2);
      } else if (data == 5) {
        data = Math.random() < 0.9 ? 5 : Math.floor(Math.random() * 7 + 2);
      } else if (data == 6) {
        data = Math.random() < 0.6 ? 6 : Math.floor(Math.random() * 4 + 4);
      } else if (data == 7) {
        data = Math.random() < 0.1 ? 7 : Math.floor(Math.random() * 4 + 4);
      }
      //对应奖品
      switch (data) {
        case 1:
          rotateFunc(1, 130, "恭喜您获得了时尚水杯一个");
          break;
        case 2:
          rotateFunc(2, 225, "恭喜您获得了报销来程路费资格");
          break;
        case 3:
          rotateFunc(4, 0, "恭喜您获得了900元学费减免券");
          break;
        case 4:
          rotateFunc(3, 180, "恭喜您获得了平安银行就业保险一份");
          break;
        case 5:
          rotateFunc(5, 85, "恭喜您获得了免费试学7天资格");
          break;
        case 6:
          rotateFunc(6, 40, "恭喜您获得了价值1000元学习卡一张");
          break;
        case 7:
          rotateFunc(7, 315, "恭喜您获得了500元学费减免券");
          break;
        default:
          rotateFunc(0, 270, "很遗憾，本次未能中奖");
      }
    } else {
      //判断cookie
      if ($.cookie("rotary_text_hzh") == null) {
        alert("每个人只能抽一次哦！");
      } else {
        //如果cookie存在，点击抽奖按钮显示结果栏
        if ($result.is(":hidden") == true) {
          //显示结果栏时给input绑定cookie
          $resultTxt.val($.cookie("rotary_text_hzh"));
          $resultTxt1.val($.cookie("rotary_text_hzh"));
          $result.fadeIn(200);
        } else {
          $result.fadeOut(200);
        }
      }
    }
  });
  //用户信息操作
  $("form").submit(function () {
    var tel = document.getElementById("tel").value;
    var name = document.getElementById("name").value;
    var $time = new Date();
    var $_COOKIE = $.cookie("rotary_time_hzh", $time, {
      expires: 24,
      path: "/",
    });
    if (tel == "" || name == "") {
      alert("属性不能为空");
      return false;
    } else if (
      tel.search(/^(((1[3578]{1}[0-9]{1})|(15[0-9]{1}))+\d{8})$/) == -1
    ) {
      alert("手机号码有误，请重新输入");
      return false;
    } else if (name.search(/^([\u4e00-\u9fa5]{2,6})$/) == -1) {
      alert("姓名有格式不对，请重新输入");
      return false;
    }
    //判断是否提交,生成提交cookie
    $.cookie("rotary_result_hzh", name, { expires: 24, path: "/" });
    $result.fadeOut(200);
    $raotary_looper.fadeOut(200);
    $rotary_wrap.fadeOut(200);
  });
  //回调函数
  var rotateFunc = function (awards, angle, text) {
    $rotaryArrow.stopRotate();
    $rotaryArrow.rotate({
      angle: 0,
      duration: 5000,
      animateTo: angle + 1800,
      callback: function () {
        //完成时生成text-cookie
        var $_COOKIE = $.cookie("rotary_text_hzh", text, {
          expires: 24,
          path: "/",
        });
        $resultTxt.val(text);
        $resultTxt1.val(text);
        $result.fadeIn(350);
      },
    });
  };
  $looper_close.click(function () {
    $raotary_looper.css({
      "background-image": "url(images/rotary_min.png)",
      opacity: "1",
      "background-color": "rgba(0,0,0,0)",
      "background-size": "100% auto",
      "background-repeat": "no-repeat",
      "background-position": "center center",
    });
    $raotary_looper.animate(
      {
        width: "100px",
        height: "100px",
      },
      200
    );
    $rotary_fuzhu.show(200);
    $rotary_wrap.hide();
  });
  $rotary_fuzhu.click(function () {
    $raotary_looper.css({
      "background-color": "#000",
      opacity: "0.6",
      "background-image": "none",
    });
    $raotary_looper.animate(
      {
        width: "100%",
        height: "100%",
      },
      10
    );
    $(this).hide();
    $rotary_wrap.fadeIn(100);
  });
  //关闭按钮
  $resultBtn.click(function () {
    $result.fadeOut(300);
  });
});
