
## 快速开始
> 本工具基于node平台，且发布到npm公共仓库。
### 1.安装mangodoc-cli和http-server
``` shell
npm install -g mangodoc-cli
npm install -g http-server
```
### 2.从模板初始化
``` shell
mkdir test # 修改为自己的项目名，如test
cd test # 进入到项目下
mangodoc init # 初始化，执行完后会下载模板仓库内容到当前文件夹下
```
### 3.调整文档标题和内容后，启动服务
``` shell
http-server
```
访问服务`http://localhost:8080/`
