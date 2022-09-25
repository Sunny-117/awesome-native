// 所有表格数据
var tableData = [];
var page = 1;
var size = 10;
var total = 1;
function bindEvent() {
  $(".menu").on("click", "dd", function () {
    $(this).addClass("active").siblings().removeClass("active");
    var id = $(this).data("index");
    $("#" + id)
      .fadeIn()
      .siblings()
      .fadeOut();
  });

  $("#student-body > tbody").on("click", ".edit", function () {
    // 拿到当前学生的数据  渲染到编辑表单当中  并且显示编辑表单
    // 获取当前编辑按钮对应的学生的索引值
    var index = $(this).parents("tr").index();
    renderEditForm(tableData[index]);
    $(".modal").slideDown();
  });

  $("#student-body > tbody").on("click", ".remove", function () {
    var index = $(this).parents("tr").index();
    var isDel = confirm(
      "确认删除学号为" + tableData[index].sNo + "的学生信息吗？"
    );
    if (isDel) {
      $.ajax({
        url: "/delBySno",
        type: "get",
        data: {
          sNo: tableData[index].sNo,
        },
        dataType: "json",
        success: function (res) {
          if (res.status === "success") {
            alert("删除成功");
            getTableData();
          }
        },
      });
    }
  });

  $("#student-edit-submit").click(function (e) {
    e.preventDefault();
    var data = getFormData($("#student-edit-form"));
    if (data.status === "success") {
      $.ajax({
        url: "/updateStudent",
        type: "get",
        dataType: "json",
        success: function (res) {
          if (res.status === "success") {
            $(".modal").slideUp();
            getTableData();
          }
        },
      });
    }
  });
  $(".modal").click(function (e) {
    if (e.target === this) {
      $(".modal").slideUp();
    }
  });
  $("#student-add-submit").click(function (e) {
    e.preventDefault();
    var data = getFormData($("#student-add-form"));
    if (data.status === "success") {
      console.log(data.data);
      $.ajax({
        url: "/addStudent",
        type: "post",
        data: data.data,
        dataType: "json",
        success: function (res) {
          if (res.status === "success") {
            getTableData();
            $(".menu > dd[data-index=student-list]").trigger("click");
          }
        },
      });
    } else {
      alert(data.msg);
    }
  });
}

bindEvent();

// 获取表格数据
function getTableData() {
  $.ajax({
    url: "/studentList",
    type: "get",
    data: {
      page: page,
      size: size,
    },
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        tableData = res.data.result;
        total = Math.ceil(res.data.total / size);
        renderDom(res.data.result);
      }
    },
  });
}
// 渲染表格数据
function renderDom(data) {
  var str = data.reduce(function (prev, item) {
    return (
      prev +
      `  <tr>
    <td>${item.sNo}</td>
    <td>${item.name}</td>
    <td>${item.sex == 0 ? "男" : "女"}</td>
    <td>${item.email}</td>
    <td>${new Date().getFullYear() - item.birth}</td>
    <td>${item.phone}</td>
    <td>${item.address}</td>
    <td>
        <button class="btn edit">编辑</button>
        <button class="btn remove">删除</button>
    </td>
</tr>`
    );
  }, "");
  $("#student-body > tbody").html(str);

  $(".page").page({
    total: total,
    current: page,
    change: function (current) {
      page = current;
      getTableData();
    },
  });
}
// 回填编辑表单
function renderEditForm(data) {
  var form = $("#student-edit-form")[0];
  for (var prop in data) {
    if (form[prop]) {
      form[prop].value = data[prop];
    }
  }
}

// 获取表单数据
function getFormData(form) {
  var arr = form.serializeArray();
  var result = {
    status: "success",
    msg: "",
    data: {},
  };
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value) {
      result.data[arr[i].name] = arr[i].value;
    } else {
      result.status = "fail";
      result.msg = "信息填写不全，请检验后提交";
      return result;
    }
  }
  return result;
}

getTableData();
