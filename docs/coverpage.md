<style type="text/css">
.coverpage{
  width:80%;
  margin:0 auto;
}
.coverpage .logo{
  width:30%;
}
.coverpage .future-remark{
  color:gray;
  font-size:14px;
  min-height:60px;
}
.coverpage .future-card{
  margin:8px;
}
.coverpage .footer{
  text-align:center;
  color:gray;
  padding-top:10px;
}
.coverpage .footer a{
  font-size:14px;
}
.icon-title{
  height:50px;
  padding:10px;
  border-radius:5px;
  font-size:16px;
}
.mg-badge {
  color: #fff;
  display: inline-block;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
  background-color: green;
  border-radius: 10%;
  position: relative;
  top: -15px;
  left: 0px;
  font-size: 15px;
}

@media only screen and (max-width: 500px) {
  .coverpage{
    width:98%;
    margin:0 auto;
  }
  .coverpage .logo{
    width:100%;
  }
}
</style>

<div class="coverpage">
  <el-result style="margin:0 auto;" sub-title="提供给mangodoc的使用者一套持续更新的模板仓库！">
    <template slot="icon">
      <img class="logo" src="/static/mangodoc-template.png">
    </template>
    <template slot="extra">
      <el-button type="default" size="medium" @click="handleClick('changelog')">更新日志</el-button>
      <el-button type="primary" class="theme-color" size="medium" @click="handleClick('README')">查看主页</el-button>
    </template>
  </el-result>
  <el-row>
    <el-col :xs="24" :md="8" v-for="(item,index) in futures">
      <el-card shadow="hover" class="future-card">
        <h3>{{item.title}}</h3>
        <div v-html="item.remark" class="future-remark">
        </div>
      </el-card>
    </el-col>
  </el-row>
  <div v-html="footer" class="footer">
  </div>
</div>

<script type="text/javascript">
(
  {
    data(){
      return {
          footer: window.$mangodoc.footer,
          version: window.$mangodoc.version,
          futures: [
            {
              title: "支持giscus评论",
              remark: "集成外部插件mangodoc-giscus - 支持giscus评论"
            },
            {
              title: "支持文章目录",
              remark: "集成外部插件mangodoc-toc - 支持文章目录书签生成"
            },
            {
              title: "支持图片放大缩小",
              remark: "集成外部插件mangodoc-imgview - 集成hammerjs支持图片点击查看和放大移动"
            },
            {
              title: "支持返回顶部",
              remark: "集成外部插件mangodoc-top - 支持文章阅读时返回顶部"
            },
            {
              title: "支持百度统计",
              remark: "集成外部插件mangodoc-baidu-tj - 支持集成百度统计"
            },
            {
              title: "支持PlantUML",
              remark: "集成外部插件mangodoc-plantuml - 支持集成plantuml"
            },
            {
              title: "支持valine评论",
              remark: "集成外部插件mangodoc-valine - 支持valine评论，匿名评论"
            },
            {
              title: "支持busuanzi显示访问信息",
              remark: "集成外部插件mangodoc-busuanzi - 集成卜算子，显示网站访问信息"
            },
            {
              title: "支持文档最后修改时间",
              remark: "集成外部插件mangodoc-update-time - 显示文档最后修改时间"
            }
          ]
      }
    },
    methods: {
        handleClick(url) {
          window.location.href = window.$mangodoc.context + "/#/" + url;
          window.location.reload();
        }
    }
  }
)
</script>