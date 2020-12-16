let form=layui.form;
let layer=layui.layer;
getInfo()
function getInfo(){
    $.ajax({
        url:'/my/userinfo',
        success:function(res){
            form.val("formTest",res.data);
        }
    })
    
}

$('#cz').click(function(e){
e.preventDefault()
getInfo()
})


$('#formGet').on('submit',function(e){
    e.preventDefault();
    let data=$(this).serialize();
    $.ajax({
        url:'/my/userinfo',
        data,
      type:'POST',
        success:function(res){
            console.log(res);
            if (res.status!==0) {
                
                return layer.msg('失败')
            }
            layer.msg('成功')
            window.parent.basicInformation();
        }
    })
   
})
