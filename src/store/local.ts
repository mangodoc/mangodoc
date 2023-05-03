import Base from "./base";

/**
 * Local存储类，单例模式实现
 * 
 * @author mangomei
 * @since 2023-05-03 11:45
 */
class Local extends Base{}
let local = Local.getInstance();
export default local;