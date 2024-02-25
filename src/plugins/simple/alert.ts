export default {
    afterEach(html: string, next: any){
        // console.info("demo afterEach:"+html);
        const lines = html.split('\n');
        const regexPattern = /<p>@(alert)\((success|info|warning|error)\)\(([^)]+)\)\(([^)]+)\)<\/p>/;
        let results = new Array();
        lines.forEach((line, index) => {
          let text = line;
          const matchResult = line.match(regexPattern);
          if (matchResult) {
            const type = matchResult[2];
            const title = matchResult[3];
            const content = matchResult[4];
            let theHtml = `
              <div role="alert" class="el-alert el-alert--${type} is-light" style="margin:5px 0px;">
                  <i class="el-alert__icon el-icon-${type} is-big"></i>
                  <div class="el-alert__content">
                      <span class="el-alert__title is-bold">${title}</span>
                      <p class="el-alert__description">${content}</p>
                  </div>
              </div>
            `;
            text = theHtml;
          } 
          results.push(text);
        });
        let newHtml = results.join('\n');
        next(newHtml);
    }
}