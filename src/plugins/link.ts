export default {
    afterEach(html: string, next: any){
        // console.info("demo afterEach:"+html);
        const lines = html.split('\n');
        const regexPattern = /@link\((.*?)\)\((.*?)\)\((.*?)\)/g;
        let results = new Array();
        let inCode = false;
        lines.forEach((line, index) => {
          let text = line;
          if (line.indexOf("<code>") > -1 || line.indexOf("</code>") > -1){
            inCode = !inCode;
          }
          // 不在``` code内的才解析
          if (!inCode) {
            let match;
            const resultArray = [];
            while ((match = regexPattern.exec(line)) !== null) {
              const type = match[1];
              const title = match[2];
              const url = match[3];
              resultArray.push({ type, title, url });
            }
            if (resultArray.length > 0){
              text = "";
            }
            resultArray.forEach((item) => {
              let theHtml = `
                <el-link href="${item.url}" type="${item.type}" target="_blank">${item.title}</el-link>
              `;
              text += theHtml;
            });
          }
          results.push(text);
        });
        let newHtml = results.join('\n');
        next(newHtml);
    }
}