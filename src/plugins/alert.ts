export default {
    afterEach(html: string, next: any){
        const regexPattern = /<p>@(alert)\((success|info|warning|error)\)\(([^)]+)\)\(([^)]+)\)<\/p>/g;
        let newHtml = html.replace(regexPattern, (match, _tag, type, title, content) => {
            return `<div role="alert" class="el-alert el-alert--${type} is-light" style="margin:5px 0px;">
                <i class="el-alert__icon el-icon-${type} is-big"></i>
                <div class="el-alert__content">
                    <span class="el-alert__title is-bold">${title}</span>
                    <p class="el-alert__description">${content}</p>
                </div>
            </div>`;
        });
        next(newHtml);
    }
}