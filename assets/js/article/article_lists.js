let form = layui.form;
let laypage = layui.laypage;
let layer = layui.layer;
let query = {
  pagenum: 1, //页码值
  pagesize: 2, //每页显示多少条数据
  cate_id: "", //文章分类的 全部Id
  state: "", //文章的全部状态，可选值有：已发布、草稿
};
//获取文章列表
getArtList();
function getArtList() {
  $.ajax({
    url: "/my/article/list",
    data: query,
    success: function (res) {
      //console.log(res);
      let htmlStr = template("trTpl", res);
      $("#tb").html(htmlStr);
      //渲染分页
      renderPage(res.total);
    },
  });
}

//渲染分页
function renderPage(total) {
  //执行一个laypage实例
  laypage.render({
    elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # 号
    count: total, //数据总数，从服务端得到
    limit: query.pagesize,
    limits: [2, 3, 4],
    curr: query.pagenum,
    layout: ["count", "limit", "prev", "page", "next", "skip"], // 自定义排版
    jump: function (obj, first) {
      //obj包含了当前分页的所有参数，比如：
      //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
      //console.log(obj.limit); //得到每页显示的条数
      query.pagenum = obj.curr;
      query.pagesize = obj.limit;
      //首次不执行
      if (!first) {
        //do something
        getArtList();
      }
    },
  });
}

const paddZero = function (n) {
  return n < 10 ? "0" + n : n;
};
template.defaults.imports.filterTime = function (time) {
  let d = new Date(time);
  let y = d.getFullYear();
  let m = paddZero(d.getMonth() + 1);
  let day = paddZero(d.getDate());

  let h = paddZero(d.getHours());
  let mm = paddZero(d.getMinutes());
  let s = paddZero(d.getSeconds());

  return `${y}-${m}-${day} ${h}:${mm}:${s}`;
};

//筛选,获取文章类别
$.ajax({
  url: "/my/article/cates",
  success: function (res) {
    // console.log(res);
    res.data.forEach((element) => {
      $(`<option value="${element.Id}">${element.name}</option>`).appendTo(
        $("#cateSelect")
      );
      form.render(); //更新全部
    });
  },
});

//筛选功能获取到文章分类和和状态
$("#form").on("submit", function (e) {
  e.preventDefault();
  query.cate_id = $("#cateSelect").val();
  query.state = $("#stateSelect").val();
  getArtList();
});

//文章删除功能
$("#tb").on("click", ".delBtn", function () {
  if ($(".delBtn").length === 1) {
    // if成立，说明页面中还有一个删除按钮，但是经过ajax的删除操作，页面中就没有了当前这页的数据（加载上一页的数据）
    if (query.pagenum === 1) {
      query.pagenum = 1;
    } else {
      query.pagenum = query.pagenum - 1;
    }
  }
  let id = $(this).attr("data-id");
  layer.confirm("is not?", function (index) {
    //do something
    $.ajax({
      url: "/my/article/delete/" + id,
      success: function (res) {
        if (res.status !== 0) {
          layer.msg("删除失败");
        }
        layer.msg("成功删除");
        getArtList();
      },
    });
    layer.close(index);
  });
});

//编辑功能
$("body").on("click", ".editBtn", function () {
  let id = $(this).attr("data-bj");
  sessionStorage.setItem("id", id);
  location.href = "/article/art_pub.html";
});
