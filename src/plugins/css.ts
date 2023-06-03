import Util from "../util/util"

export default {
    ready(){
      injectStyle();
    }
}

function injectStyle() {
    let themeColor = Util.getConfigOrDefault("themeColor");
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
      #page,#app {
        height: 100%;
      }
      #footer{
        height:40px !important;
        line-height:40px;
        text-align:center;
        border-top: 1px solid #eee;
      }
      #footer a{
        font-size: 12px;
      }
      #aside {
        border-right: 1px solid #eee;
        overflow-x: hidden;
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
        color: ${themeColor};
      }
      #title{
        text-align: center;
        border-bottom: 1px solid #eee;
        height: 50px;
        line-height: 50px;
        margin: 0px;
        padding: 0px;
        display: block;
        font-size: 20px;
        text-decoration: none;
      }
      #header {
        height:51px !important;
        line-height: 51px;
        text-align: right;
        border-bottom: 1px solid #eee;
        padding-left:0px;
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
      pre {
        background: #eee;
        border-radius: 3px;
        padding: 8px;
        overflow: auto;
      }
      pre code{
        background: none;
        color: black;
      }
      h1{
        font-size: 32px;
        margin: 0px;
      }
      blockquote{
        border-left: 3px solid ${themeColor};
        margin: 0px;
        padding-left: 8px;
        background: #eee;
        color: gray;
        border-radius: 3px;
      }
      blockquote p{
        padding: 3px;
      }
      .el-menu{
        border-right: 0px !important;
      }
      .nav-a{
        font-size: 14px;
        text-decoration: none;
        color: ${themeColor};
        margin-left: 5px;
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
      }
      /* 滚动条的样式 */
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
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
      .el-menu-item.is-active {
        color: ${themeColor} !important;
      }
      ul {
        padding-left: 25px;
      }
    `;
    document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
}
