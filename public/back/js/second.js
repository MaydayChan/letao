

// 发送ajax请求，渲染页面

$(function () {

    var currentPage = 1;
    var pageSize = 5;
    var totalPages;


    render();

    function render() {
        $.ajax({

            url: '/category/querySecondCategoryPaging',
            data: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {

                console.log(info);
                // 通过template渲染页面
                var htmlStr = template('secondTpl', info)
                $('tbody').html(htmlStr)

                totalPages = Math.ceil(info.total / 5);

                // console.log(totalPages);


                // 分页插件
                // 渲染分页
                $("#Spagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: totalPages,//总页数
                    size: "normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值

                        currentPage = page;

                        render();
                    }



                });



            }

        })

    }



    // 给按钮注册点击事件
    $('.btnAdd').on('click', function () {

        // 显示模态框
        $('#secondModal').modal('show');

        // 发送ajax请求
        $.ajax({

            url: "/category/queryTopCategoryPaging",
            type: 'get',
            data: {
                page: 1,
                pageSize: 100    // 模拟获取全部数据的接口
            },
            dataType: 'json',
            success: function (info) {

                console.log(info);
                var htmlStr = template('brandTpl', info);
                $('.dropdown-menu').html(htmlStr);

            }


        })

    })


    // 给下拉列表里面的a注册点击事件
    // 将a里面的文本设置给按钮，从而让下拉列表可选

    $('.dropdown-menu').on('click', 'a', function () {

        // 获取选中的文本
        var text = $(this).text()
        // 将文本渲染给按钮 
        $('#dropdownText').text(text);
    })


    // // 4. 调用fileupload方法完成文件上传初始化，

    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            console.log(data.result.picAddr);
            
            // 获取图片地址
            var imgUrl = data.result.picAddr;
            // 更改图片地址
            $('#pic').attr('src',imgUrl);

        }
    });


})