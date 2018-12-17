
// 功能1：发送ajax请求 渲染页面
// 功能2：点击添加按钮，发送ajax请求到后台，接收数据，重新渲染


$(function () {


    var currentPage = 1;
    var pageSize = 5;
    var totalPages;

    // 功能一

    render();

    function render() {
        $.ajax({

            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },

            dataType: 'json',
            success: function (info) {

                // console.log(info);

                // 使用模板
                var htmlStr = template('firstTpl', info);
                $('tbody').html(htmlStr);

                totalPages = Math.ceil(info.total / pageSize);




                // 渲染分页
                $(".Fpagintor").bootstrapPaginator({
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


    // 功能2

    $('#btnAdd').on('click', function () {

        // 显示模态框
        console.log(1);

        $('#addModal').modal('show');

    })



    $('#firstForm').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在6到30之间'
                    },

                }
            },
        }

    });


    $("#firstForm").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({

            url: '/category/addTopCategory',
            type: 'post',
            data: $('#firstForm').serialize(),
            dataType: 'json',
            success: function (info) {

                console.log(info);
                if (info.success) {

                    // 重新渲染页面
                    render();
                    // 隐藏模态框
                    $('#addModal').modal('hide');
                    // 调用插件的重置表单方法
                    $("#firstForm").data('bootstrapValidator').resetForm(true);

                }

            }
        })
    });









})