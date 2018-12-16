
$(function () {
    //使用表单校验插件
    $('.formLogin').bootstrapValidator({
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
            username: {
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
                    //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }

                    callback: {
                        message: '用户名不存在哦'
                    }
                }
            },

            // 校验密码
            password: {

                validators: {

                    // 不能为空
                    notEmpty: {
                        message: '用户名不能为空哦'
                    },

                    // 长度校验
                    stringsLength: {
                        min: 3,
                        max: 8,
                        message: '密码长度必须为3-8之间'
                    },

                    // 
                    callback: {
                        message: '密码错误哦'
                    }

                }

            }

        }

    });



    // 禁止按钮默认行为，使用ajax进行数据处理

    $(".formLogin").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({

            url: '/employee/employeeLogin',
            type: 'post',
            data: $('.formLogin').serialize(),
            dataType: 'json',
            success: function(info){
                if(info.success) {
                    // 登录成功，跳转到index
                    location.href = "index.html"
                }

                if(info.error === 1000) {
                    // 提示用户名不存在
                    $(".formLogin").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                }

                if(info.error === 1001) {
                    // 提示密码错误
                    $(".formLogin").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                }
                
            }

        })

    });


    // 设置重置功能
    $('.btn-reset').on('click',function(){

        // 使用插件的方法，重置表单时隐藏错误信息图标和文字
        $(".formLogin").data('bootstrapValidator').resetForm();

    })



})