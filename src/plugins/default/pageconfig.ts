import Util from "../../util/util";


export default {
    beforeEach(content: string){
        console.info("pageconfig beforeEach");
        let start = content.indexOf("@@start");
        let end = content.indexOf("@@end");
        console.info(start,end);
        if (start !== -1 || end !== -1){
            let text = content.substring("@@start".length, end)
            if (text){
                window.$pageconfig =JSON.parse(text)
                console.info("pageconfig is {}", window.$pageconfig);
            }
            content = content.substring(end + "@@end".length);
        } else {
            window.$pageconfig = Util.getDefaultPageConfig();
        }
        return content;
    }
}
