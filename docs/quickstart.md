
## 快速开始
### 创建index.html页
``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>mangodoc</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="description" content="Description">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
        <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
        <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div id="vue"></div>
    <script>
        window.$mangodoc = {
            title: 'mangodoc',
            repo: 'https://github.com/mg0324/mangodoc',
            footer: '<span>mango mei &copy; 2023</span> @ copyright'
        };
    </script>
    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mangodoc@1.0.0/dist/mangodoc.min.js"></script>    
  </body>
</html>
```
### 创建`docs`文件夹，且文件目录如下
```
- docs
|----_navbar.json # 导航栏配置
|----_sidebar.json # 左侧菜单配置
README.md # 主页
... 其他文档
```
### 运行静态资源服务器，如`http-server`
``` shell
npm install -g http-server
http-server
```
启动后，访问`localhost:8080`即可。
