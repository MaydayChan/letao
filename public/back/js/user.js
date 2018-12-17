
// 渲染页面
// 发送ajax请求，从后台获取数据
// 在成功的回调函数中通过template插件渲染页面
// 通过分页插件paginator在成功的回调函数中渲染分页
// 利用分页插件自带的事件，在事件中设置分页按钮点击渲染
$(function () {

    var currentPage = 1;
    var pageSize = 5;
    var totalPages;
    var currentId;  // 当前用户id
    var isDelete;   // 修改当前状态


    render();

    function render() {
        $.ajax({

            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {

                // 使用template模板进行动态渲染
                var htmlStr = template('userTpl', info)    // info是一个对象，里面的所有属性都可以在模板中任意使用 
              
                // console.log(1);
                

                $('tbody').html(htmlStr)
                totalPages = Math.ceil(info.total / pageSize);

                // 分页设置
                $('.paginator').bootstrapPaginator({

                    bootstrapMajorVersion: 3,           // 版本信息。.3x版本必须填
                    currentPage: currentPage,           //当前页
                    totalPages: totalPages,             //总页数
                    size: "normal",                     //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {

                        currentPage = page;             //为按钮绑定点击事件 page:当前点击的按钮值

                        render();                       // 重新渲染页面
                    }
                });
            }
        })
    }


    // 禁用启用功能
    // 给tbody注册事件委托，让button触发事件

    $('tbody').on('click', '.btn', function () {

        // 启用模态框
        $('#userModal').modal('show')

        // 获取当前数据的id
        currentId = $(this).parent().data().id;    // currentId获取到的是一个对象
        // console.log(currentId)
        // 获取当前按钮状态
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        // 点击模态框确定按钮发送ajax请求
    })


    $('#submitBtn').on('click', function () {
        
        // 发送ajax请求
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {

                id: currentId,
                isDelete: isDelete,

            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                if (info.success) {

                    // console.log(1);
                    // console.log(render);
                    
                    // 重新渲染页面
                    render();

                    // 隐藏模态框
                    $('#userModal').modal('hide');

                }



            }
        })
    })
})