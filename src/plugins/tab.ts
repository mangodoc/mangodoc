

export default {
    afterEach(html: string, next: any){
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        // 使用 DOM 操作方法找到包含 <tab> 的节点
        var tabNode: any = doc.querySelector("tab");
        // 输出结果
        if (tabNode) {
            // 获取节点内容
            var content = tabNode.innerHTML;
            let style = tabNode.style.cssText;
            let results = [];
            let lines = content.split("\n");
            let title = "";
            let contents = [];
            for (let i = 0; i < lines.length; i++) {
                let item = lines[i];
                if (item.trim() === "" && title === "") {
                    continue;
                }
                // 开始 是标题
                if (item.startsWith("@@ ")) {
                    title = item.split("@@ ")[1];
                } else {
                // 内容
                    contents.push(item);
                }
                // 结束
                if ((i+1 < lines.length && lines[i+1].startsWith("@@ "))
                || i == lines.length - 1) {
                    results.push({
                        title: title,
                        content: contents.join("\n")
                    });
                    // 重置
                    title = "";
                    contents = [];
                }
            }
            // 开始渲染
            if (results.length > 0) {
                // 渲染
                let contentHtml = "";
                for (let i = 0; i < results.length; i++) {
                let item = results[i];
                contentHtml+= `
                    <el-tab-pane label="${item.title}">${item.content}</el-tab-pane>
                `;
                }
                let newTabHtml = `
                <el-tabs type="border-card" style="${style}">
                    ${contentHtml}
                </el-tabs>`;
                tabNode.replaceWith($(newTabHtml)[0]);
            }
        }
        next($(doc.body).html());
    }
}