

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

                // console.log(info);
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

        // 获取a的自定义属性id 赋值给name属性为categoryId的隐藏域
        var id = $(this).data('id');

        // 将id赋值给隐藏域，用于后续表单提交
        $('[name="categoryId"]').val(id);


        // 更新表单校验状态
        $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    })


    // // 4. 调用fileupload方法完成文件上传初始化，

    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            // console.log(data.result.picAddr);

            // 获取图片地址
            var imgUrl = data.result.picAddr;
            // 更改图片地址
            $('#pic').attr('src', imgUrl);

            // 将图片地址赋值给name属性为 brandLogo的 隐藏域
            $('[name="brandLogo"]').val(imgUrl);

            // 更新表单校验状态
            $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

        }
    });




    // 使用表单校验，表单进行进行校验
    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            categoryId: {

                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级菜单'
                    },

                }
            },

            brandLogo: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            },

            brandName: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            }

        }

    });


    // 阻止默认提交行为
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({

            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ) {

                if(info.success) {

                    // 重新渲染表单
                    render();
                    // 关闭隐藏域
                    $('#secondModal').modal('hide');

                    // 重置表单状态  
                    $('#form').data('bootstrapValidator').resetForm(true);   // 参数true 文本 与 状态一起重置

                    // 由于下拉列表和图片不是表单元素，因此需要手动重置
                    $('#dropdownText').text("请选择一级分类");
                    $('#imgBox img').attr("src", "./images/none.png");


                }

            }


        })


    });



})