let $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#choose').on('click',function(){
    $('[type=file]').click()
})

$('[type=file]').change(function(){
    let file=this.files[0];
    let newImgURL = URL.createObjectURL(file);
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
    
   
})
$('#sure').on('click',function(){
    let dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')      
      $.ajax({
          url:'/my/update/avatar',
          type:'POST',
          data:{
            avatar:dataURL
          },
          success:function(res){
              window.parent.basicInformation()
          }
      }) // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
})