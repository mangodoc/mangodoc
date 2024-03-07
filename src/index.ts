import App from "./app";
import api from "./api";

// 暴露api
window.$mangodocApi = api;
// 启动应用
let app = new App();
app.start();
console.info("mangodoc start");