// 登录拦截功能

$.ajax({

    url: '/employee/checkRootLogin',
    type: 'get',
    dataType: 'json',
    success: function(info){
       
        
        if(info.success) {    
            // true == 'true' 是错误的 比较过程 先将布尔值true转换成数值 1 == 'true' ——>   'true'转化为数字NaN
            //   1 == NaN 为 false
            // 登录成功继续浏览
            console.log('用户登录成功');
            
        };

        if(info.error === 400) {
            // 登录失败，跳转到登录页面
            location.href = 'login.html';
        }

    }



})