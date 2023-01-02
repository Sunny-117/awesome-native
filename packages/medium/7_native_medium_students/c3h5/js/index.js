
// 存储学生列表数据
var tableData = [];
// 当前页
var nowPage = 1;
// 每页展示条数
var pageSize = 3;
// 总页数
var allPage = 1;
// 绑定事件函数
function init() {
    location.hash = 'student-list'; //页面一刷新后要显示第一个tab，所以hash也应该修改
    $(window).trigger('hashchange');
    bindEvent();
}
init();

function bindEvent() {
    getTableData();
    // 哈希值改变触发页面变化事件
    $(window).on('hashchange', function () {
        var hash = location.hash;
        $('.show-list').removeClass('show-list');
        $(hash).addClass('show-list');
        $('.list-item.active').removeClass('active');
        $('.' + hash.slice(1)).addClass('active');
    });
    // 点击左侧菜单栏进行切换
    $('.list-item').on('click', function () {
        $('.drop-list').slideUp();
        var id = $(this).attr('data-id');
        location.hash = id;
        if (id == 'student-list') {
            nowPage = 1;
            getTableData();
        }
        return false;
    });

    // 点击下拉菜单
    var list = $('header .drop-list');
    $('header .btn').on('click', function () {
        list.slideToggle();
    });
    $(window).resize(function () {
        if ($(window).innerWidth() >= 768) {
            list.css('display', 'none');
        }
    });


    // 切换左侧导航事件
    // $('#menu-list').on('click', 'dd', function () {
    //     // 切换左侧导航样式
    //     $('.active').removeClass('active');
    //     $(this).addClass('active');
    //     // data-id
    //     // console.log($(this).data('id'), $(this).attr('data-id'));
    //     // 获取导航对应的内容元素
    //     var id = $(this).data('id');
    //     // 切换右侧内容区
    //     $('.content').fadeOut();
    //     $('#' + id).fadeIn();
    //     if (id == 'student-list') {
    //         nowPage = 1;
    //         getTableData();
    //     }
    // });

    // 新增学生事件
    $('#add-student-btn').click(function (e) {
        // 阻止表单提交默认刷新功能
        e.preventDefault();
        // 获取表单数据
        var data = $('#add-student-form').serializeArray();
        // 将表单数据转化成对象的形式
        data = formatData(data);
        // 如果数据没问题则提交否则弹出错误信息
        if (!data) {
            alert('请将信息填写完全后提交');
        } else {
            // 提交新增的学生信息
            transferData('/api/student/addStudent', data, function (res) {
                // 提交成功跳转到列表页
                alert('提交成功');
                $('#add-student-form')[0].reset();
                // $('#menu-list > dd[data-id=student-list]').click();
                // 点击确定更新页面
                location.hash = 'student-list';

            })
        }
        return false;
    });
    // 编辑按钮点击事件
    $('#table-body').on('click', '.edit', function (e) {
        // 编辑弹框显示
        $('#modal').slideDown();
        // 回填编辑弹框内表单数据
        var index = $(this).parents('tr').index();
        renderEditForm(tableData[index]);
        // 删除按钮点击事件
    }).on('click', '.del', function (e) {
        // 删除的学生索引
        var index = $(this).parents('tr').index();
        // 确认删除弹框
        var isDel = confirm('确认删除学号为' + tableData[index].sNo + tableData[index].name + '学生信息?');
        if (isDel) {
            // 删除学生信息
            transferData('/api/student/delBySno', {
                sNo: tableData[index].sNo
            }, function (res) {
                alert('删除成功');
                // // 获取最新数据
                // $('#menu-list > dd[data-id=student-list]').click();
                getTableData();
            })
        }
    });
    // 点击遮罩层编辑弹框消失
    $('#mask').click(function () {
        $('#modal').slideUp();
    });
    // 编辑表单提交
    $('#edit-submit-btn').click(function (e) {
        e.preventDefault();
        var data = $('#edit-form').serializeArray();
        data = formatData(data);
        if (!data) {
            alert('请将信息填写完全后提交');
        } else {
            transferData('/api/student/updateStudent', data, function (res) {
                alert('提交成功');
                $('#modal').slideUp();
                // $('#menu-list > dd[data-id=student-list]').click();
                getTableData();
            });
        }
    });
    // 点击搜索按钮  过滤表格数据
    $('#search-btn').click(function () {
        var val = $('#search-inp').val();
        // 将当前页置为1 获取表格数据
        nowPage = 1;
        getTableData(val);
    })
}

// 将表单数据转换成对象
function formatData(data) {
    var obj = {};
    // for循环的数据可以是数组  也可以是对象（类数组）
    // forEach循环只能是数组
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!item.value) {
            // 如果是数组的forEach  或者map  filter  方法中return的话  代表的是方法的返回值  
            // 否则是最近一层函数的返回值
            return false;
        }
        obj[item.name] = item.value;
    }
    return obj;
}
// 获取学生列表数据
function getTableData(val) {
    // 过滤表格数据
    if (val) {
        // 默认不分性别
        var sex = -1;
        // 搜索关键字为输入框内数据
        var search = val.trim();
        // 如果输入框内有男/ 女关键字  则修改性别属性 以及搜索关键字
        if (val.indexOf('男') != -1) {
            sex = 0;
            search = val.replace('男', '').trim();
        }
        if (val.indexOf('女') != -1) {
            sex = 1;
            search = val.replace('女', '').trim();
        }
        transferData('/api/student/searchStudent', {
            page: nowPage,
            size: pageSize,
            search: search ? search : null,
            sex: sex
        }, function (data) {
            // 保存表格数据
            tableData = data.searchList;
            allPage = Math.ceil(data.cont / pageSize);
            renderTable(data.searchList);
        })
        // 不过滤表格数据
    } else {
        transferData('/api/student/findByPage', {
            page: nowPage,
            size: pageSize
        }, function (data) {
            // 保存表格数据
            tableData = data.findByPage;
            allPage = Math.ceil(data.cont / pageSize);
            renderTable(data.findByPage);
        });
    }

}

function renderTable(data) {
    var str = '';
    data.forEach(function (item, index) {
        str += '<tr>\
        <td>' + item.sNo + '</td>\
        <td>' + item.name + '</td>\
        <td>' + (item.sex ? '女' : '男') + '</td>\
        <td>' + item.email + '</td>\
        <td>' + (new Date().getFullYear() - item.birth) + '</td>\
        <td>' + item.phone + '</td>\
        <td>' + item.address + '</td>\
        <td>\
            <button class="btn edit">编辑</button>\
            <button class="btn del">删除</button>\
        </td>\
    </tr> '
    });
    $('#table-body').html(str);
    $('#page').turnpage({
        nowPage: nowPage,
        allPage: allPage,
        callback: function (page) {
            nowPage = page;
            getTableData($('#search-inp').val())

        }
    })
}

// 回填表单数据
function renderEditForm(data) {
    var form = $('#edit-form')[0];
    for (var prop in data) {
        form[prop] ? form[prop].value = data[prop] : '';
    }
}


function transferData(path, data, cb) {
    $.ajax({
        url: 'http://api.duyiedu.com' + path,
        type: 'get',
        data: $.extend({
            appkey: '__sunny___1615100707839'
        }, data),
        // json 
        // jsonp  ---> 解决跨域问题   和ajax是两个东西
        // cors
        dataType: 'json',
        success: function (res) {
            if (res.status == 'success') {
                cb(res.data);
            } else {
                alert(res.msg);
            }
        }
    })
};
// bindEvent();
// $('#menu-list > dd[data-id=student-list]').click();