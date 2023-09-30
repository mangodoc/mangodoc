
import layout from './layout';
import css from './css';
import nav from './nav';
import aside from './aside';
import prism from './prism';

export default {
    list(){
        let list = [css,layout,aside,nav,prism];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        return list;
    }
}