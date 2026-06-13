

export default {
    afterEach(html: string, next: any){
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var tabNode = doc.querySelector("tab");
        if (tabNode) {
            var content = tabNode.innerHTML;
            let style = (tabNode as HTMLElement).style.cssText;
            let results = [];
            let lines = content.split("\n");
            let title = "";
            let contents = [];
            for (let i = 0; i < lines.length; i++) {
                let item = lines[i];
                if (item.trim() === "" && title === "") {
                    continue;
                }
                if (item.startsWith("@@ ")) {
                    title = item.split("@@ ")[1];
                } else {
                    contents.push(item);
                }
                if ((i+1 < lines.length && lines[i+1].startsWith("@@ "))
                || i == lines.length - 1) {
                    results.push({
                        title: title,
                        content: contents.join("\n")
                    });
                    title = "";
                    contents = [];
                }
            }
            if (results.length > 0) {
                let contentHtml = "";
                for (let i = 0; i < results.length; i++) {
                    let item = results[i];
                    contentHtml += `
                    <el-tab-pane label="${item.title}">${item.content}</el-tab-pane>
                `;
                }
                let newTabHtml = `
                <el-tabs type="border-card" style="${style}">
                    ${contentHtml}
                </el-tabs>`;
                let temp = document.createElement('div');
                temp.innerHTML = newTabHtml;
                tabNode.parentNode?.replaceChild(temp.firstChild!, tabNode);
            }
        }
        next(doc.body.innerHTML);
    }
}