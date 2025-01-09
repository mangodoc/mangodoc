import Util from "../../util/util"

export default {
    ready(){
      injectStyle();
    }
}

function injectStyle() {
  let themeColor = Util.getConfig("themeColor");
  let sideWidth = Util.getConfig("sideWidth");
  let themePadding = Util.getConfig("themePadding");
  let contentWidth = (100 - parseInt(themePadding)*2 - (sideWidth/window.screen.width)*100) + '%';
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    body {
      margin: 0px;
      padding: 0px;
      -webkit-font-smoothing: antialiased;
      color: #34495e;
      font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;
      font-size: 15px;
      letter-spacing: 0;
      margin: 0;
      overflow-x: hidden;
    }
    html, body {
      height: 100%;
      overflow: hidden;
    }
    #page, #app {
      height: 100%;
    }
    #container, #footer {
      width: ${contentWidth};
    }
    #header {
      padding: 0 ${themePadding};
    }
    #main {
      padding-left: ${themePadding};
      min-height: 100px;
    }
    #footer{
      height:40px !important;
      line-height:40px;
      text-align:center;
    }
    #footer a{
      font-size: 12px;
    }
    #container>p>img {
      width:100%;
    }
    #aside {
      overflow-x: hidden;
      padding-top: 10px;
      padding-right: 10px;
    }
    #aside ul {
      margin: 0px;
      padding: 0px;
    }
    #aside ul li {
      list-style: none;
    }
    .theme-color {
      color: ${themeColor};
    }
    #aside ul li a {
      text-decoration: none;
      color: black !important;
    }
    #title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin: 0px;
      padding: 0px;
      display: block;
      font-size: 20px;
      text-decoration: none;
      float: left;
      padding-left: 20px;
    }
    #header {
      height:51px !important;
      line-height: 51px;
      text-align: right;
      border-bottom: 1px solid #eee;
    }
    #header .oper{
      font-size: 25px;
      color: ${themeColor};
      float: left;
      line-height: 51px;
      padding: 0px;
      margin: 0px;
      cursor: pointer;
      margin-left: 8px;
      display: none;
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
      color: black !important;
    }
    #header .version{
      color: gray;
    }
    pre {
      background: #eee;
      border-radius: 3px;
      padding: 8px;
      overflow: auto;
    }
    pre[class*="language-"] {
      background: #f8f8f8 !important;
    }
    code {
      border-radius: 2px;
    }
    pre code {
      background: none;
      color: black;
    }
    h1 {
      font-size: 32px;
      margin: 0px;
    }
    blockquote {
      border-left: 3px solid ${themeColor};
      margin: 0px;
      padding-left: 8px;
      background: #f8f8f8;
      color: gray;
      border-radius: 3px;
    }
    blockquote p {
      padding: 3px;
    }
    .el-menu{
      border-right: 0px !important;
    }
    .nav-a {
      font-size: 14px;
      text-decoration: none;
      color: ${themeColor};
      margin-left: 5px;
    }
    .el-menu-item.is-active  {
      border-right: 4px solid ${themeColor};
      background: #edf5ff;
    }
    .fullscreen-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .fullscreen-loading::before {
      content: "";
      width: 60px;
      height: 60px;
      border: 5px solid #ddd;
      border-top-color: #777;
      border-radius: 50%;
      animation: rotate 1s linear infinite;
    }
    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
    #logo {
      vertical-align: middle;
      margin-right:8px;
      width:30px;
    }      
    @media only screen and (max-width: 500px) {
      #aside{
        display: none;
      }
      img {
        width:100%;
      }
      #logo {
        width: 10%;
      }
      #title {
        width: auto !important;
      }
      #header,#footer {
        padding: 0 20px;
      }
      #container {
        width: 100% !mportant;
      }
      #main {
        padding: 0;
      }
      #title {
        padding-left: 0px;
      }
      #oper {
        display: inline !important;
      }
    }
    /* 滚动条的样式 */
    ::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    .version-item sup{
      right: 0px !important;
      top: 15px !important;
      background: ${themeColor};
    }
    p,li{
      font-family: Arial, sans-serif;
      color: #333;
    }
    #container ul, #container ol{
      line-height: 1.6rem;
      word-spacing: 0.05rem;
      padding-left: 20px;
    }
    #container strong{
      color: black;
    }
    ul {
      padding-left: 25px;
    }
    #toc {
      right: ${themePadding} !important;
    }
    green {
      color: green;
    }
    red {
      color: red;
    }
    darkred {
      color: darkred;
    }
    darkgreen {
      color: darkgreen;
    }
    pink {
      color: pink;
    }
    gray {
      color: gray;
    }
    orange {
      color: orange;
    }
    blue {
      color: blue;
    }
    yellow {
      color: yellow;
    }
    p code {
      border-radius: 2px;
      color: #e96900;
      margin: 0 2px;
      padding: 3px 5px;
      white-space: pre-wrap;
      background-color: #e9ecef;
      font-weight: bold;
    }
    pre {
      position: relative;
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem;
    }
    pre[class*="language-"] {
      padding-top: 25px !important;
    }
    code[class*="language-"]::before {
      position: absolute;
      top: 0;
      right: 0;
      background: #e9ecef;
      padding: 2px 8px;
      font-size: 12px;
      border-radius: 0 4px 0 4px;
      font-family: sans-serif;
      color: #eb345b;
      font-weight: bold;
    }

    /* 为不同语言定义内容 */
    code.language-sql::before {
      content: "SQL";
    }
    
    code.language-js::before {
      content: "JavaScript";
    }
    
    code.language-shell::before {
      content: "Shell";
    }
    
    code.language-powershell::before {
      content: "Shell";
    }
    
    code.language-python::before {
      content: "Python";
    }
    
    code.language-java::before {
      content: "Java";
    }
    
    code.language-javascript::before {
      content: "JavaScript";
    }
    
    code.language-html::before {
      content: "HTML";
    }
    
    code.language-css::before {
      content: "CSS";
    }
  `;
  document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
}