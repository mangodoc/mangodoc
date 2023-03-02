import demo from './demo';
import core from './core';
import aside from './aside';
import nav from './nav';
import css from './css';

export default{
    list(){
        return [css,core,aside,nav,demo];
    }
}