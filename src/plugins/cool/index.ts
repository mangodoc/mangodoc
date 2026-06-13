import demo from './demo';
import layout from './layout';
import aside from './aside';
import nav from './nav';
import css from './css';
import effects from './effects';
import prism from '../prism';
import pageconfig from '../pageconfig';
import alert from '../alert';
import link from '../link';
import tab from '../tab';
import iconfont from '../iconfont';
import fullscreen from './fullscreen';
import wordcount from './wordcount';
import darkmode from './darkmode';
import colorpicker from './colorpicker';
import particles from './particles';

export default {
    list(){
        let list = [
            css,
            layout,
            aside,
            nav,
            demo,
            effects,
            pageconfig,
            prism,
            alert,
            link,
            tab,
            iconfont,
            fullscreen,
            wordcount,
            darkmode,
            colorpicker,
            particles
        ];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        return list;
    }
}
