import simplePlugin from "./plugins/simple/index";
import defaultPlugin from "./plugins/default/index";
import util from "./util";

let themeMap = {
    "simple": simplePlugin,
    "default": defaultPlugin
}

export default {
    current() {
        return themeMap[util.getConfigOrDefault("theme")];
    }
}