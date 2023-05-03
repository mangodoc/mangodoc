<style type="text/css">
.coverpage{
  width:80%;
  margin:0 auto;
}
.coverpage .logo{
  width:25%;
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

@media only screen and (max-width: 500px) {
  .coverpage{
    width:98%;
    margin:0 auto;
  }
  .coverpage .logo{
    width:60%;
  }
}
</style>

<div class="coverpage">
  <el-result style="margin:0 auto;" sub-title="一个简单的doc文档构建器，采用微内核架构风格实现，使用插件机制来支持扩展。>2.0.0使用typescript对内核进行重构，使得代码更加可读可维护，更优雅！">
    <template slot="icon">
      <el-image src="static/mangodoc.png" class="logo"></el-image>
    </template>
    <template slot="extra">
      <el-button type="default" size="medium" @click="handleClick('README')">查看主页</el-button>
      <el-button type="primary" class="theme-color" size="medium" @click="handleClick('quickstart')">快速开始</el-button>
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
          futures: [
            {
              title: "简单文档",
              remark: "基于typescript(2.x)实现的简单文档生成器。"
            },
            {
              title: "脚手架工具",
              remark: "支持<a href='https://github.com/mg0324/mangodoc-cli'>mangodoc<a/>工具快速创建文档模板并启动。"
            },
            {
              title: "marked转换",
              remark: "基于marked实现markdown到html的转换。"
            },
            {
              title: "elementui风格",
              remark: "基于<a href='https://element.eleme.cn/#/zh-CN/component/installation'>elementui</a>的vue组件版本构建。"
            },
            {
              title: "简单路由",
              remark: "基于es6中的fetch()加上window.location.hash实现。"
            },
            {
              title: "静态部署",
              remark: "支持静态资源部署，如gitee pages、github pages、docker和paas http server等。"
            },
            {
              title: "插件扩展",
              remark: "提供插件API接口，包括生命周期和部分事件监听函数。"
            },
            {
              title: "支持vue",
              remark: "md内支持局部使用，详情参考<a href='#/demo/elementui'>例子</a>。"
            },
            {
              title: "接口api",
              remark: "将内部配置暴露为window.$mangodocApi提供给外部插件调用。"
            }
          ]
      }
    },
    methods: {
        handleClick(url) {
          window.location.href = "/#/"+url;
          window.location.reload();
        }
    }
  }
)
</script>