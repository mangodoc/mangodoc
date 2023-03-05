import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default {
    mounted(){
        console.info("prism mounted");
        setTimeout(() => {
            Prism.highlightAll();
        }, 200);
    }
}
