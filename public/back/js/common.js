
// 进度条功能：
// 引入nprogress插件
// 在ajax发送开始时打开进度条
// 在ajax结束时关闭进度条
NProgress.start();

setTimeout(function () {
    NProgress.done();

},3000);


$(document).ajaxStart(function () {
    // 第一个ajax发送时，开启进度条
    NProgress.start();
})


$(document).ajaxStop(function () {
    // 在所有ajax结束时结束进度条
    // 模拟网络延迟
    setTimeout(function () {
        NProgress.done();

    },3000);

});









// 功能1：侧边栏导航切换功能
// 功能2：二级菜单切换功能
// 功能3：侧边栏隐藏功能
// 功能4、退出功能 + 模态框遮罩功能 使用模态框插件
//   实现退出功能的两种方式，
// 1、发送ajax到后台，让后台销毁当前用户的登录状态，实现退出 （推荐）
// 2、清除浏览器缓存，将cookie清空，这样本地存储的sessionid也没了。 （不推荐，容易造成后台内存浪费，原先存在的session空间未被删除）

// 功能5、绘制图标功能


$(function () {

    // 功能1：
    // 获取nav 下所有的a 给a 注册事件，切换类名

    // $('.nav li').on('click',function(){
    //     $(this).children('a').addClass('current');
    //     $(this).siblings().children('a').removeClass('current');
    //     $('.nav li:nth-child(2)').children('a').removeClass('current');
    // })


    // 功能2：
    $('.category').on('click', function () {

        $('.child').stop().slideToggle();

    })


    // 功能3：侧边栏隐藏功能

    $('.icon_menu').on('click', function () {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
    })



    // 模态框功能

    $('.icon_logout').on('click', function () {

        $('.modal').modal('show')
    })


    // 退出功能
    $('.btn-quit').on('click',function(){

        // 发送ajax到后台，
        $.ajax({

            url: '/employee/employeeLogout',
            type: 'get',
            dataType: 'json',
            success: function(info){

                if(info.success) {

                    alert('退出成功');
                    location.href = 'login.html'

                }

                if(info.error) {
                    alert('退出失败')
                }


            }

        })


    })




})