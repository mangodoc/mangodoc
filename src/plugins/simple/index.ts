import demo from './demo';
import layout from './layout';
import aside from './aside';
import nav from './nav';
import css from './css';
import prism from '../prism';
import pageconfig from '../pageconfig';
import alert from '../alert';
import link from '../link';
import tab from '../tab';
import fullscreen from './fullscreen';
import wordcount from './wordcount';
import iconfont from '../iconfont';
import pagenav from '../pagenav';
import imgview from '../imgview';

export default {
    list(){
        let list = [css,layout,aside,nav,demo,pageconfig,prism,alert,link,tab,fullscreen,wordcount,iconfont,pagenav,imgview];
        if(window.$mangodoc.plugins){
            list = list.concat(window.$mangodoc.plugins);
        }
        return list;
    }
}