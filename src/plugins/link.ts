export default {
    afterEach(html: string, next: any){
        const regexPattern = /@link\((.*?)\)\((.*?)\)\((.*?)\)/g;
        let newHtml = html.replace(regexPattern, (match, type, title, url) => {
            return `<el-link href="${url}" type="${type}" target="_blank">${title}</el-link>`;
        });
        next(newHtml);
    }
}