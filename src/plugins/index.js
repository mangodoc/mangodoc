import demo from './demo';
import core from './core';
import aside from './aside';
import nav from './nav';
import css from './css';

export default{
    list(){
        let list = [css,core,aside,nav,demo];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        return list;
    }
}