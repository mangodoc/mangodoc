## 配置参数
### title
配置站点标题，如`title: "mangodoc"`。
### repo
配置站点仓库地址，如`repo: 'https://github.com/mg0324/mangodoc'`。
### sideWidth
配置站点左侧栏宽度，默认为`250`。
### alwaysRefresh
配置内容是否总是刷新，默认`false`。开启后，请求md资源时会加上随机数，保证浏览器获取最新内容。
### themeColor
配置站点主题颜色，默认蓝色，可自定义如`themeColor: "#F08"`。
### version
配置站点的版本，可以为空。若配置`1.0`，则会显示在标题右上角。
### menuOpens
配置站点左侧菜单默认展开列表，默认为空。值为数组，如`["5","6"]`,指向`_sidebar.json`内的`index`属性。
### coverPage
配置封面，默认为`false`。开启后可在`coverpage.md`中做局部vue页面来构建自己的封面。
### theme
配置主题，默认为`default`。可配置`default`和`simple`，根据自己需要选择。
### themePadding
配置主题填充，默认为`10%`。
### context
配置站点上下文，默认为空。