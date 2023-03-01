const marked = require("marked")

var url = window.currentPath;
if(url === "/"){
    url = "/README.md";
}else{
    url = url + ".md";
}
// 读取 Markdown 文件
fetch(url)
.then(response => response.text())
.then(markdown => {
    // 将 Markdown 转换为 HTML
    const html = marked.parse(markdown);
    // 将 HTML 显示在页面上
    document.getElementById('app').innerHTML = html;
});


