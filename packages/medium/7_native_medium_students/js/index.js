/**
 *
 * @param {String} method 请求方式  需要大写
 * @param {String} url    请求地址  协议（http）+ 域名+ 端口号 + 路径
 * @param {String} data   请求数据  key=value&key1=value1
 * @param {Function} cb     成功的回调函数
 * @param {Boolean} isAsync 是否异步 true 是异步  false 代表同步
 */
function ajax(method, url, data, cb, isAsync) {
  console.log(data);
  // get   url + '?' + data
  // post
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // xhr.readyState    1 - 4  监听是否有响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        cb(JSON.parse(xhr.responseText));
      }
    }
  };
  method = method.toUpperCase();
  if (method == "GET") {
    xhr.open(method, url + "?" + data, isAsync);
    xhr.send();
  } else if (method == "POST") {
    xhr.open(method, url, isAsync);
    // key=value&key1=valu1
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
}

var tableData = [];
// 绑定事件处理函数
function bindEvent() {
  // 切换行为
  var menu = document.querySelector(".menu");
  menu.onclick = function (e) {
    if (e.target.tagName === "DD") {
      // var actives = document.getElementsByClassName('active');
      // 获取所有当前选中的导航的兄弟节点
      var actives = getSiblings(e.target);
      // 为当前选择的导航添加样式
      e.target.classList.add("active");
      // 切换之前的导航样式
      for (var i = 0; i < actives.length; i++) {
        actives[i].classList.remove("active");
      }
      // 获取到当前导航对应的右侧内容区要展示区域的id
      // var id = e.target.getAttribute('data-id')
      var id = e.target.dataset.id;
      // 获取到当前导航对应的右侧内容区
      var content = document.getElementById(id);
      // 显示右侧内容区
      content.classList.add("active-content");
      // 切换右侧内容区之前的样式
      var activeContent = getSiblings(content);
      for (var i = 0; i < activeContent.length; i++) {
        activeContent[i].classList.remove("active-content");
      }
    }
  };
  // 新增学生行为
  var studentAddSubmit = document.getElementById("student-add-submit");
  studentAddSubmit.onclick = function (e) {
    e.preventDefault();
    // 获取新增学生的表单数据
    var form = document.getElementById("student-add-form");
    var formData = getFormData(form);
    // 如果数据校验未通过则弹出错误信息
    if (formData.status == "fail") {
      alert(formData.msg);
    } else {
      transferData("/api/student/addStudent", formData.data, function (data) {
        alert("添加成功");
        // 跳转到学生列表页
        var studentListMenu = document.querySelector(
          '.menu dd[data-id="student-list"]'
        );
        getTableData();
        studentListMenu.click();
      });
    }
  };

  // 编辑按钮点击行为
  // 这样写不能确定表格数据有没有渲染到页面上，可以使用事件委托:委托到页面上一直存在的元素(tbody)
  /*  var editBtn = document.getElementsByClassName('edit')[0];//直接写edit的元素还没出现呢，因为ajax执行是异步的
   for (var i = 0; i < editBtn.length; i++) {
     (function (i) {
       editBtn[i].onclick = function () {
         console.log(i)
       }
     }(i));
   } */
  // 表格体
  var tbody = document.querySelector("#student-body tbody");
  // 编辑弹窗元素
  var modal = document.querySelector(".modal");
  tbody.onclick = function (e) {
    //父元素到子元素：捕获
    // 编辑按钮
    if (e.target.classList.contains("edit")) {
      // 有没有edit的类名，有的话就是编辑按钮
      // 点击编辑按钮需要将编辑表单显示出来
      modal.classList.add("show");
      // 当前编辑按钮对应的学生索引
      var index = e.target.dataset.index;
      // 渲染编辑表单数据
      renderEditForm(tableData[index]);
    }
    // console.log(e.target.classList.contains('edit'))
    // 删除按钮
    else if (e.target.classList.contains("remove")) {
      var index = e.target.dataset.index;
      var student = tableData[index];
      // 确认删除的弹窗  如果点击确认返回true  点击取消返回 false
      var isDel = confirm("确认删除学号为" + student.sNo + "的学生信息吗？");
      if (isDel) {
        transferData(
          "/api/student/delBySno",
          {
            sNo: student.sNo,
          },
          function () {
            alert("删除成功");
            getTableData();
          }
        );
      }
    }
  };
  // 编辑表单的提交
  var studentEditSubmit = document.getElementById("student-edit-submit");
  studentEditSubmit.onclick = function (e) {
    e.preventDefault(); // 阻止默认刷新行为
    // 获取新增学生的表单数据
    var form = document.getElementById("student-edit-form");
    var formData = getFormData(form);
    // 如果数据校验未通过则弹出错误信息
    if (formData.status == "fail") {
      alert(formData.msg);
    } else {
      transferData("/api/student/updateStudent", formData.data, function () {
        alert("修改成功");
        modal.classList.remove("show");
        getTableData(); //编辑完重新渲染表格数据
      });
    }
  };
  // 点击编辑弹窗的遮罩层  则弹窗消失
  modal.onclick = function (e) {
    if (e.target === this) {
      // 目标对象是不是自己
      modal.classList.remove("show");
    }
  };
}
// 查找所有的兄弟节点
function getSiblings(node) {
  var elements = [].slice.call(node.parentNode.children);
  return elements.filter(function (item) {
    return item != node;
  });
}
// 获取表单数据
function getFormData(form) {
  // 读取表单中的所有数据
  var name = form.name.value;
  var sex = form.sex.value;
  var email = form.email.value;
  var sNo = form.sNo.value;
  var birth = form.birth.value;
  var phone = form.phone.value;
  var address = form.address.value;
  // 规则校验
  // 姓名 不为空   地址  不为空
  if (!name || !sex || !email || !sNo || !birth || !phone || !address) {
    return {
      status: "fail",
      msg: "信息填写不完全，请校验后提交",
    };
  }
  // 性别 为0或1
  var sexReg = /^[01]$/;
  if (!sexReg.test(sex)) {
    return {
      status: "fail",
      msg: "性别只能选择男或女",
    };
  }
  // 邮箱  @ .com/.cn
  var emailReg = /^[\w\.]+@[\w-]+\.(com|cn)$/;
  if (!emailReg.test(email)) {
    return {
      status: "fail",
      msg: "邮箱格式不正确",
    };
  }
  // 出生年份  年龄在 10 - 80之间  1940 - 2010
  if (birth < 1940 || birth > 2010) {
    return {
      status: "fail",
      msg: "学生出生年份请填写1940 - 2010 之间的数字",
    };
  }
  // 手机号  11位数字  以1开头  第二位不是1/2
  var phoneReg = /^1[3-9]\d{9}$/;
  if (!phoneReg.test(phone)) {
    return {
      status: "fail",
      msg: "手机号格式不正确",
    };
  }
  // 学号必须为4-16位的数字组成
  var sNoReg = /^\d{4,16}$/;
  if (!sNoReg.test(sNo)) {
    return {
      status: "fail",
      msg: "学号必须为4-16位的数字组成",
    };
  }

  return {
    status: "success",
    data: {
      name,
      sex,
      email,
      sNo,
      birth,
      phone,
      address,
    },
  };
}

// 获取学生列表数据
function getTableData() {
  // ajax('get', '/api/student/findAll')
  //  请求表格数据
  transferData("/api/student/findAll", "", function (data) {
    // console.log(data);
    tableData = data;
    renderTable(data);
  });
}

// 封装网络请求的方法
function transferData(url, data, success) {
  // 请求数据（字符串类型）
  var dataStr = "";
  // 判断当前传递的数据是对象类型的话 需要转换成key=value&key1=value1格式的字符串
  if (typeof data === "object") {
    data = Object.assign(
      {
        appkey: "__sunny___1615100707839",
      },
      data
    );
    // 将请求参数转换成接口要求的字符串key=value&key1=value1格式
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        dataStr += prop + "=" + data[prop] + "&";
      }
    }
  } else {
    // 如果传递过来的是字符串  那么直接作为请求数据
    dataStr = data + "&appkey=__sunny___1615100707839";
  }
  ajax(
    "get",
    "http://open.duyiedu.com" + url,
    dataStr,
    function (res) {
      // 后台已经正常处理了我的请求  则继续下面的功能
      if (res.status == "success") {
        success(res.data);
      } else {
        alert(res.msg);
      }
    },
    true
  );
}

// 渲染表格数据
function renderTable(data) {
  // 数组遍历方法(forEach(不改变原数组), map, reduce)
  //   var str = '';
  //   data.forEach(function (item, index) {// forEach
  //     str += `<tr>
  //     <td>${item.sNo}</td>
  //     <td>${item.name}</td>
  //     <td>${item.sex == 0 ? '男': '女'}</td>
  //     <td>${item.email}</td>
  //     <td>${new Date().getFullYear() - item.birth}</td>
  //     <td>${item.phone}</td>
  //     <td>${item.address}</td>
  //     <td>
  //         <button class="btn edit">编辑</button>
  //         <button class="btn remove">删除</button>
  //     </td>
  // </tr>`;
  //   });
  //   var str = data.map(function (item) {// map,返回的是一个新数组
  //     return `<tr>
  //     <td>${item.sNo}</td>
  //     <td>${item.name}</td>
  //     <td>${item.sex == 0 ? '男': '女'}</td>
  //     <td>${item.email}</td>
  //     <td>${new Date().getFullYear() - item.birth}</td>
  //     <td>${item.phone}</td>
  //     <td>${item.address}</td>
  //     <td>
  //         <button class="btn edit">编辑</button>
  //         <button class="btn remove">删除</button>
  //     </td>
  // </tr>`
  //   }).join('');// 数组转字符串
  var str = data.reduce(function (prev, item, index) {
    // reduce
    return `${prev}<tr>
    <td>${item.sNo}</td>
    <td>${item.name}</td>
    <td>${item.sex == 0 ? "男" : "女"}</td>
    <td>${item.email}</td>
    <td>${new Date().getFullYear() - item.birth}</td>
    <td>${item.phone}</td>
    <td>${item.address}</td>
    <td>
        <button class="btn edit" data-index=${index}>编辑</button>
        <button class="btn remove" data-index=${index}>删除</button>
    </td>
</tr>`;
  }, "");
  var tbody = document.querySelector("#student-body tbody");
  tbody.innerHTML = str;
}

// 编辑表单的数据回填
function renderEditForm(data) {
  var form = document.getElementById("student-edit-form");
  // form.name.value = data.name;
  // form.sex.value = data.sex;
  // form.email.value = data.email;

  // console.log(data);点击编辑之后拿到的数据
  for (var prop in data) {
    if (form[prop]) {
      // 存在的话就设置
      form[prop].value = data[prop];
    }
  }
}

bindEvent();

getTableData();

// 一定要写项目思路总结
// 主要是项目思路

// 作业：做个分页效果
