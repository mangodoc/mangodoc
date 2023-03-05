import demo from './demo';
import core from './core';
import aside from './aside';
import nav from './nav';
import css from './css';
import prism from './prism';

export default{
    list(){
        let list = [css,core,aside,nav,demo,prism];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        return list;
    }
}