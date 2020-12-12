$(function(){
    $('#goDl').click(function(){
        $('.zhuce').show();
        $('.login').hide();
    })
//去登录
    $('#goZe').click(function(){
        $('.login').show();
        $('.zhuce').hide();
    })


    //表单校验


    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repass:function(value){
            if($('.passIpt').val()!==value){
                return '两次密码不一致';
            }
        }
      });      

      //注册账号
      $('#regiForm').on('submit',function(e){
          e.preventDefault()
          let data=$(this).serialize();
          $.ajax({
              data,
              type:'POST',
              url:"http://ajax.frontend.itheima.net/api/reguser",
              success:function(res){
                    if(res.status!==0){
                            return layer.msg(res.message); 
                    }
                    //注册成功
                    layer.msg(res.message)
                    $('#regiForm')[0].reset();
                     $('#goZe').click();
              }
          })
      })
    

      //登录
      $('#loginForm').on('submit',function(e){
            e.preventDefault();
            let data=$(this).serialize()
            $.ajax({
                type:'POST',
                url:"http://ajax.frontend.itheima.net/api/login",
                data,
                success:function(res){
                    if(res.status!==0){
                            return layer.msg(res.message)
                        }
                        //登录成功
                        layer.msg(res.message);
                        layer.msg('关闭后想跳首页',{
                            time:2000,
                        }, function(){
                           
                            //do something
                            location.href='/home/index.html';
                          }); 
                }

            })
      })
})

