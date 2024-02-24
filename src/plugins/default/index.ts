import demo from './demo';
import layout from './layout';
import aside from './aside';
import nav from './nav';
import css from './css';
import prism from './prism';
import pageconfig from './pageconfig';

export default {
    list(){
        let list = [css,layout,aside,nav,pageconfig,demo,prism];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        return list;
    }
}