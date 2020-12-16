let layer=layui.layer
function basicInformation(){
$.ajax({
    url:'/my/userinfo',
    // headers:{
    //     Authorization:localStorage.getItem('token'),
    // },
    success:function(res){
           
            let name=res.data.nickname||res.data.username;
         
            if(res.status!==0){
              return  lay.msg('获取用户信息失败')
            }
            $('#welcome').text(name)
            if (res.data.user_pic) {
                //显头像，隐藏文字头像
                $('.layui-nav-img').attr('src',res.data.user_pic).show()
                $('.textAvatar').hide()
            }else{
                //显示文字头像，隐藏头像
                $('.textAvatar').text(name[0].toUpperCase()).css('display','inline-block');
                $('.layui-nav-img').hide()
            }
    },
    complete:function(res){
        
        let data = res.responseJSON;
        if (data.status===1) { 
        location.href = "/home/login.html";
        localStorage.removeItem("token");
        }
    }
})
}
basicInformation();

$('#goOut').click(function(){
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href = "/home/login.html";
        layer.close(index);
      });
})