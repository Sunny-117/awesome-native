(function () {
  /* 程序入口 */
  var tempArrId = null;
  var init = function () {
    renderTable();
    initEvent();
  };

  /* 事件入口函数 */
  var initEvent = function () {
    saveBtn.addEventListener("click", onSaveBtnClick);
    tbody.addEventListener("click", onItemBtnClick);
  };

  /* 点击删除或修改某一项数据 */
  var onItemBtnClick = function (e) {
    if (
      e.target.className !== "delete-btn" &&
      e.target.className !== "update-btn"
    )
      return;
    tempArrId = e.target.getAttribute("uId");
    if (e.target.className === "delete-btn") {
      deleteItem();
    } else {
      updateItem();
    }
  };

  /* 删除处理函数 */
  var deleteItem = function () {
    var arr = JSON.parse(localStorage.getItem("phoneList"));
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === tempArrId) {
        arr.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("phoneList", JSON.stringify(arr));
    renderTable();
  };

  var updateItem = function () {
    var arr = JSON.parse(localStorage.getItem("phoneList"));
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === tempArrId) {
        userName.value = arr[i].userName;
        userMobile.value = arr[i].userMobile;
        userAddress.value = arr[i].userAddress;
        break;
      }
    }
    saveBtn.innerHTML = "修改";
    saveBtn.setAttribute("data", "update");
  };
  /* 修改处理函数 */

  /* 保存用户信息电话本 */
  var onSaveBtnClick = function () {
    var type = this.getAttribute("data");
    var arr = JSON.parse(localStorage.getItem("phoneList")) || [];
    if (
      !userName.value.trim() ||
      !userMobile.value.trim() ||
      !userAddress.value.trim()
    )
      return;
    var phoneList = {
      userName: userName.value,
      userMobile: userMobile.value,
      userAddress: userAddress.value,
      // id: Date.now() + Math.random().toString().slice(2, 5)
    };
    if (type === "add") {
      phoneList.id = Date.now() + Math.random().toString().slice(2, 5);
      arr.push(phoneList);
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === tempArrId) {
          phoneList.id = tempArrId;
          arr.splice(i, 1, phoneList);
          break;
        }
      }
    }
    localStorage.setItem("phoneList", JSON.stringify(arr));
    saveBtn.setAttribute("data", "add");
    saveBtn.innerHTML = "保存";
    tempArrId = "";
    userName.value = "";
    userMobile.value = "";
    userAddress.value = "";
    renderTable();
  };

  var renderTable = function () {
    var arr = [];
    var num = 0;

    var phoneList = JSON.parse(localStorage.getItem("phoneList")) || [];
    if (!phoneList.length) {
      tbody.innerHTML = '<tr> <td colspan="5">暂无数据存储</td></tr>';
      return;
    }

    phoneList.forEach(function (item) {
      arr.push(
        "<tr>",
        "<td>" + ++num + "</td>",
        "<td>" + item.userName + "</td>",
        "<td>" + item.userMobile + "</td>",
        "<td>" + item.userAddress + "</td>",
        "<td>",
        ' <span  uId="' + item.id + '" class="delete-btn">删除</span>',
        " <span>/</span> ",
        ' <span  uId="' + item.id + '" class="update-btn">修改</span>',
        "</td>",
        "</tr>"
      );
    });
    tbody.innerHTML = arr.join("");
  };
  init();
})();
