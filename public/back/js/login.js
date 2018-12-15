
// 初始化表单校验
$(function () {

    $('.form-horizontal').bootstrapValidator({


        // 指定校验是的图标显示
        feedbackIcons: {

            valid: 'glyphicon glyphicon-ok',   // 有效的
            invalid: 'glyphicon glyphicon-remove',  // 无效的
            validating: 'glyphicon glyphicon-refresh',  // 确认的

        },


        // 指定校验字段
        fields: {
            // 校验用户名对应的name属性 
            username: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6之间'
                    },

                    // callback 专门用来定制字段回调提示内容
                    callback: {
                        message: '用户名不存在哦'
                    }

                }
            },

            // 校验密码子弹
            password: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },

                    // 长度校验
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: '密码长度必须为3到10之间'
                    },

                    // callback 专门用来定制字段的回调提示内容
                    callback: {
                        message: '密码错误哦'
                    }
                }
            }

        }


    })



    // 点击登录，发送ajax请求
    // 根据后台返回的信息，分别进行处理

    $(".form-horizontal").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({

            url: '/employee/employeeLogin',
            type: 'post',
            data: $('.form-horizontal').serialize(),
            dataType: 'json',
            success: function(info){
                // console.log(info);
                if(info.success) {
                    // 验证成功，登录首页
                    location.href = 'index.html';
                }

                if(info.error===1000) {
                    // 用户名错误
                    // 更新字段的状态   字段名称  状态  验证器   
                    $('.form-horizontal').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                }

                if(info.error===1001) {
                    // 密码错误 
                    $('.form-horizontal').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                    
                }

            }

        })


    });



    // 点击重置按钮，重置表单，清空表单项，隐藏所有状态信息

    $('.login .btn-reset').on('click',function(){

        $('.form-horizontal').data('bootstrapValidator').resetForm()
    })



})