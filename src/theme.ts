import simplePlugin from "./plugins/simple/index";
import defaultPlugin from "./plugins/default/index";
import util from "./util/util";

let themeMap:any = {
    "simple": simplePlugin,
    "default": defaultPlugin
}

class Theme {
    current() {
        return themeMap[util.getConfig("theme")];
    }
}

export default Theme;