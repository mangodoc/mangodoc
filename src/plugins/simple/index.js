
import layout from './layout';
import css from './css';
import nav from './nav';
import aside from './aside';


export default{
    list(){
        let list = [css,layout,nav,aside];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        console.info("xxxx");
        console.info(list)
        return list;
    }
}