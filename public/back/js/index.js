
// 表单功能

$(function () {


    // 第一个表单
    var myChart1 = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        // 标题文本
        title: {
            text: '2018年注册人数'
        },
        // 提示框组件
        tooltip: {},
        // 图例
        legend: {
            data: ['销量', '人数']
        },
        // x轴的数据
        xAxis: {
            name: '月份',
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        // y轴的数据。一般不进行设置，会根据表单自动刻录
        yAxis: {},
        // 
        series: [{
            name: '销量',
            type: 'bar',  // 图表类型
            data: [500, 1000, 1500, 2000, 2500, 3000]
        },

        {
            name: '月份',
            type: 'bar',
            data: [1500, 700, 400, 550, 400, 700]
        }


        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);




    // 第二个表单
    // 第一个表单

    var myChart2 = echarts.init(document.querySelector('.echarts_right'));

    var option2 = {
        title: {
            text: '热门销售品牌',
            subtext: '2018年12月',
            x: 'center',
            // 标题文本样式
            textStyle: {
                color: "red",
                fontSize: 30
            }
        },
        tooltip: { 
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // 设置对齐方式
            orient: 'vertical',
            // right: 10,
            // top: 20,
            // bottom: 20,
            left: 'left',
            data: ['耐克', '阿迪', '阿迪王', '老北京', '老奶奶'],

        },

        // 系列列表

        series: [
            {
                name: '姓名',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '阿迪王' },
                    { value: 135, name: '老北京' },
                    { value: 1548, name: '老奶奶' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    myChart2.setOption(option2);







})