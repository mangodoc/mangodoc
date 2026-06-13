import Util from "../util/util";


export default {
    beforeEach(content: string){
        let start = content.indexOf("@@start");
        let end = content.indexOf("@@end");
        if (start !== -1 && end !== -1 && end > start){
            let text = content.substring(start + "@@start".length, end).trim();
            if (text){
                window.$pageconfig = JSON.parse(text);
            }
            content = content.substring(end + "@@end".length);
        } else {
            window.$pageconfig = Util.getDefaultPageConfig();
        }
        return content;
    }
}
