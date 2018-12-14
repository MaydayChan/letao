
// 初始化表单校验
$(function () {

    $('.form-horizontal').bootstrapValidator({


        // 指定校验是的图标显示
        feedbackIcons: {

            valid: 'glyphicon glyphicon-star',   // 有效的
            invalid: 'glyphicon glyphicon-remove',  // 无效的
            validating: 'glyphicon glyphicon-ok',  // 确认的

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



                }
            },

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
                    }


                }
            }

        }


    })



})