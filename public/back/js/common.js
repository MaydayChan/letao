
// 功能1：侧边栏导航切换功能
// 功能2：二级菜单切换功能
// 功能3：侧边栏隐藏功能
// 功能4、退出功能 + 模态框遮罩功能 使用模态框插件
    //   实现退出功能的两种方式，
    // 1、发送ajax到后台，让后台销毁当前用户的登录状态，实现退出 （推荐）
    // 2、清除浏览器缓存，将cookie清空，这样本地存储的sessionid也没了。 （不推荐，容易造成后台内存浪费，原先存在的session空间未被删除）

// 功能5、绘制图标功能


$(function(){

    // 功能1：
    // 获取nav 下所有的a 给a 注册事件，切换类名

    // $('.nav li').on('click',function(){
    //     $(this).children('a').addClass('current');
    //     $(this).siblings().children('a').removeClass('current');
    //     $('.nav li:nth-child(2)').children('a').removeClass('current');
    // })


    // 功能2：
    $('.category').on('click',function(){

        $('.child').stop().slideToggle();

    })


    // 功能3：侧边栏隐藏功能

    $('.icon_menu').on('click',function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
    })



})