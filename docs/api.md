> 此页面内容用于说明mangodoc对外暴露的接口，包括配置、状态和存储。

## 配置
可以用`window.$mangodocApi.getConfig(key)`来获取，如`window.$mangodocApi.getConfig('smallWidth')`获取最新宽度。
``` js
export default {
    sideWidth: 200, // 左侧栏宽度默认200px
    smallWidth: 500, // 宽度超过500px为大屏
    logo: "static/icon/favicon-32x32.png", // 默认的logo
}
```

## 状态
* `window.$mangodocApi.setFlag()` - 用于设置状态
* `window.$mangodocApi.getFlag(key)` - 用于获取状态，如`aside`、`layout`、`nav`、`vue`等，用来加强插件逻辑执行顺序。

当然也可以用来在不同插件间传递状态数据。

## 存储
`mangodoc`核心将一些内部数据暴露给外部插件。
`window.$mangodocApi.getStore(key)` - 获取存储数据
* updateTime - 对应md文档的修改时间，给最近修改时间的外部插件使用。

持续更新中。

