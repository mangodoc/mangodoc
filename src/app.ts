import CoverPage from "./page/coverpage";
import MainPage from "./page/mainpage";
import Util from "./util/util";

/**
 * 应用类
 * 
 * @author mangomei
 * @since 2023-05-02 17:36
 */
class App {
    /**
     * 启动应用
     */
    start(){
        // 判断是否进入封面
        if(Util.check()){
            new CoverPage().render();
        }else{
            // 不是封面
            let mainPage = new MainPage();
            mainPage.watch();
            mainPage.render();
        }
    }
}

export default App;