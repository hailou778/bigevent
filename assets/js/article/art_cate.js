$(function () {
  let layer = layui.layer;
  let form = layui.form;

  // 发送ajax请求-来获取所有的文章分类
  getArtCate();
  function getArtCate() {
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取文章分类列表失败！");
        }

        // 成功
        // 将数据 + 模板结合起来 template(模板id名, 数据);
        let htmlStr = template("trTpl", res);
        $("#tb").html(htmlStr);
      },
    });
  }

  // 添加分类按钮的点击功能
  let index; // 使用index变量存储弹出层的索引（方便后面close关闭对应的弹出层）
  $("#btnAdd").click(function () {
    // 添加弹出框
    index = layer.open({
      type: 1, // 弹出层就是页面层
      title: "添加文章分类", // 标题
      // area: ["500px", "300px"], // 宽高
      area: "500px", // 宽
      // content: "<h1>哈哈</h1>",
      content: $("#addFormTpl").html(), // 注意是通过html() 来获取的结果，因为这样会获取到标签 + 内容
    });
  });

  //添加分类的弹出框
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/addcates",
      type: "POST",
      data,
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg("添加失败");
        }
        layer.close(index);
        getArtCate();
      },
    });
  });

  // 点击编辑按钮编辑弹出层
  let editIndex;
  $("#tb").on("click", ".editBtn", function () {
    editIndex = layer.open({
      type: 1, // 弹出层就是页面层
      title: "编辑", // 标题
      // area: ["500px", "300px"], // 宽高
      area: "500px", // 宽
      // content: "<h1>哈哈</h1>",
      content: $("#editFormTpl").html(), // 注意是通过html() 来获取的结果，因为这样会获取到标签 + 内容
    });
    //发送ajax获取对应的数据信息
    let id = $(this).attr("data-id");
    $.ajax({
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("editForm", res.data);
      },
    });
  });

  //修改编辑层
  $("body").on("submit", "#addForm", function () {
    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/updatecate",
      type: "POST",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取失败");
        }
        layer.msg("成功");
        layer.close(editIndex);
        getArtCate();
      },
    });
  });

  //删除文章
  $("body").on("click", ".delBtn", function () {
    let id = $(this).attr("data-id");
    layer.confirm("is not?", function (index) {
      //do something
      $.ajax({
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除失败");
          }
          layer.msg("已经删除");
          getArtCate();
        },
      });
      layer.close(index);
    });
  });
});
