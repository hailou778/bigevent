let layer=layui.layer
function basicInformation(){
$.ajax({
    url:'/my/userinfo',
    headers:{
        Authorization:localStorage.getItem('token'),
    },
    success:function(res){
            console.log(res);
            let name=res.data.nickname||res.data.username;
            console.log(name);
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
                $('.textAvatar').show().text(name[0].toUpperCase());
                $('.layui-nav-img').hide()
            }
    }
})
}
basicInformation();