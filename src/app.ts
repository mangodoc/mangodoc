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
    start(){
        if(Util.check()){
            new CoverPage().render();
        }else{
            let mainPage = MainPage.getInstance();
            mainPage.watch();
            mainPage.render();
        }
    }
}

export default App;