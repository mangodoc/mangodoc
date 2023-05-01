# mangodoc-template
> mangodoc template 模板仓库，可通过`mangodoc init`初始化



## 快速开始
> 本工具基于node平台，且发布到npm公共仓库。
1. 安装mangodoc-cli和http-server
``` shell
npm install -g mangodoc-cli # 安装mangodoc命令
npm install -g http-server # 安装http-server命令，启动本地http server
```
2. 从模板初始化
``` shell
mkdir test # 修改为自己的项目名，如test
cd test # 进入到项目下
mangodoc init # 初始化，执行完后会下载模板仓库内容到当前文件夹下
```
3. 调整文档标题和内容后，启动服务
``` shell
http-server
```
4. 访问服务`http://localhost:8080/`

## 集成特性
* 集成外部插件[mangodoc-giscus](https://github.com/mg0324/mangodoc-giscus) - 支持giscus评论
* 集成外部插件[mangodoc-toc](https://github.com/mg0324/mangodoc-toc) - 支持文章目录书签生成
* 集成外部插件[mangodoc-imgview](https://github.com/mg0324/mangodoc-imgview) - 集成`hammerjs`支持图片点击查看和放大移动
* 集成外部插件[mangodoc-top](https://github.com/mg0324/mangodoc-top) - 支持文章阅读时返回顶部
* 集成外部插件[mangodoc-baidu-tj](https://github.com/mg0324/mangodoc-baidu-tj) - 支持集成百度统计
* 集成外部插件[mangodoc-plantuml](https://github.com/mg0324/mangodoc-plantuml) - 支持集成`plantuml`
* 集成外部插件[mangodoc-valine](https://github.com/mg0324/mangodoc-valine) - 支持valine评论，匿名评论
* 集成外部插件[mangodoc-busuanzi](https://github.com/mg0324/mangodoc-busuanzi) - 集成卜算子，显示网站访问信息
* 集成外部插件[mangodoc-update-time](https://github.com/mg0324/mangodoc-update-time) - 显示文档最后修改时间
* 支持版本号显示
* 支持菜单和导航小图标

