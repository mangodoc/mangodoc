export default {
    ready(){
      injectStyle();
    }
}

function injectStyle() {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      body {
        margin: 0px;
        padding: 0px;
      }
      html, body {
        height: 100%;
      }
      #page,#vue {
        height: 100%;
      }
      #footer{
        height:40px !important;
        line-height:40px;
        text-align:center;
        border-top: 1px solid #eee;
      }
      #aside {
        border-right: 1px solid #eee;
      }
      #aside ul {
        margin: 0px;
        padding: 0px;
      }
      #aside ul li {
        list-style: none;
      }
      #aside ul li a {
        text-decoration: none;
        color: #409EFF;
      }
      #title{
        text-align: center;
        border-bottom: 1px solid #eee;
        height: 50px;
        line-height: 50px;
        margin: 0px;
        padding: 0px;
      }
      #header {
        height:51px !important;
        line-height: 51px;
        text-align: right;
        border-bottom: 1px solid #eee;
        padding-left:0px;
      }
      #header .oper{
        font-size: 28px;
        color: #409EFF;
        float: left;
        line-height: 51px;
        padding: 0px;
        margin: 0px;
        cursor: pointer;
        margin-left: 8px;
      }
      #header ul{
        display: inline-block;
        padding: 0px;
        margin: 0px;
        height: 51px;
        line-height: 51px;
      }
      #header ul li{
        list-style: none;
        display: inline-block;
        float: left;
        margin-right: 8px;
      }
      #header ul li a {
        text-decoration: none;
      }
      code{
        background: #409EFF;
        border-radius: 3px;
        padding: 3px;
        color: white;
      }
      h1{
        font-size: 32px;
        margin: 0px;
      }
      blockquote{
        border-left: 3px solid #409EFF;
        margin-left: 0px;
        padding-left: 8px;
      }
      .el-menu{
        border-right: 0px !important;
      }
      .nav-a{
        font-size: 14px;
        text-decoration: none;
        color: #409EFF;
      }      
    `;
    document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
}
