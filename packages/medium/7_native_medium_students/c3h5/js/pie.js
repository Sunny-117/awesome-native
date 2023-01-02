(function () {
    var pie = {
        init() {
            this.getData();

            this.option = {//抽离出来
                title: {
                    text: '',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                legend: {//图例
                    data: [],//他俩不一样的为空
                    orient: 'vertical',//竖着排列
                    left: 'left',//靠左
                },
                series: {
                    name: '',
                    type: 'pie',
                    data: [],
                    radius: '55%',//小一点
                    center: ['50%', '60%'],//原因坐标
                    itemStyle: {//鼠标放上去扇形的样式
                        emphasis: {//高亮
                            shadowBlur: 10,//阴影半径
                            shadowColor: 'rgba(0,0,0,.5)'//阴影颜色
                        }
                    }
                }
            }
        },
        getData() {
            var This = this;//this-->pie
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=__sunny___1615100707839',
                success: function (data) {
                    console.log(data);
                    var list = JSON.parse(data).data;//取出有效数据
                    // console.log(list);
                    if (list.length > 0) {
                        //绘制图表
                        // 这里的this指向的是回调函数，所以要用This
                        This.areaChart(list);
                        This.sexChart(list);
                    } else {
                        alert('亲，没有数据哦~');
                    }
                }
            })
        },
        areaChart(data) {
            var myChart = echarts.init($('.areaChart')[0]);//jquery对象转成原生对象
            var legendData = [];
            var seriesData = [];

            //{"address":"陕西","appkey":"kaivon_1574822824764","birth":2000,"ctime":1609994625,"email":"3862185@163.com","id":72668,"name":"得到","phone":"13902924233","sNo":"000074975","sex":0,"utime":1609994625}
            /*
                legend的数据格式为['北京','上海','广州'] 去重
                series的数据格式为[{ value: 1, name: '北京' },...]
             */

            var newData = {};

            data.forEach(function (item) {
                if (!newData[item.address]) {// 生成数组并且去重
                    //如果这个条件满足说明这个地名是第一次出现
                    newData[item.address] = 1;
                    legendData.push(item.address);
                } else {
                    newData[item.address]++;
                }
            });

            for (var prop in newData) {
                seriesData.push({
                    name: prop,
                    value: newData[prop]
                });
            }
            // console.log(seriesData)

            this.option.title.text = '渡一教育学生地区分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '地区分布';
            this.option.series.data = seriesData;

            myChart.setOption(this.option);
        },
        sexChart(data) {
            var myChart = echarts.init($('.sexChart')[0]);
            var legendData = ['男', '女'];


            //{"address":"陕西","appkey":"kaivon_1574822824764","birth":2000,"ctime":1609994625,"email":"3862185@163.com","id":72668,"name":"得到","phone":"13902924233","sNo":"000074975","sex":0,"utime":1609994625}
            // 变成下面格式
            /*
                legend的数据格式为['北京','上海','广州']
                series的数据格式为[{ value: 1, name: '北京' },...]
             */

            var newData = {};
            data.forEach(function (item) {// 遍历这个数组
                if (!newData[item.sex]) {
                    newData[item.sex] = 1;
                } else {
                    newData[item.sex]++;
                }
            });


            var seriesData = [
                { name: '男', value: newData[0] },
                { name: '女', value: newData[1] },
            ];


            this.option.title.text = '渡一教育学生性别分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '性别分布';
            this.option.series.data = seriesData;

            myChart.setOption(this.option);
        }
    }

    pie.init();
})();