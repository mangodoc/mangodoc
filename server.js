const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const basePath = path.join(__dirname, '');

const server = http.createServer((req, res) => {
  let url = req.url;
  console.info(url);
  // if(url.endsWith(".md")){
  //   url = "/docs" + url;
  // }
  if( url.endsWith(".js") 
    || url.endsWith(".md")
    || url.endsWith(".css")
    ){
    fs.readFile(basePath + url,function(err,data){
      if(err) {
        res.end(err.message)
        return;
      }
      // res.setHeader('Content-Type', 'text/javascript');
      res.end(data.toString("utf-8"));
      return;
    });
  }else{
    // 返回 HTML 页面
    res.setHeader('Content-Type', 'text/html');
    var template = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>My Docs</title>
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
              window.$mgdoc = {
                  title: 'mgdoc-test',
                  footer: '<span>mango mei &copy; 2022</span> @ copyright'
              };
          </script>
          <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
          <script src="https://unpkg.com/element-ui/lib/index.js"></script>
          <script src="./lib/mgdoc.min.js"></script>    
        </body>
      </html>
    `;
    res.end(template);
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
