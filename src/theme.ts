import simplePlugin from "./plugins/simple/index";
import defaultPlugin from "./plugins/default/index";
import coolPlugin from "./plugins/cool/index";
import util from "./util/util";

let themeMap:any = {
    "simple": simplePlugin,
    "default": defaultPlugin,
    "cool": coolPlugin
}

class Theme {
    current() {
        return themeMap[util.getConfig("theme")];
    }
}

export default Theme;
