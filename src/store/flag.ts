import Base from "./base";

/**
 * Flag存储类，单例模式实现
 * 
 * @author mangomei
 * @since 2023-05-02 18:42
 */
class Flag extends Base{}
let flag = Flag.getInstance();
export default flag;