const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const basePath = path.join(__dirname, '');

const server = http.createServer((req, res) => {
  let url = req.url;
  console.info(url);
  if(url.endsWith(".md")){
    url = "/docs" + url;
  }
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
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Mg Doc</title>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
          <div id="app"></div>
          <script>
            window.currentPath = "${url}";
          </script>
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
