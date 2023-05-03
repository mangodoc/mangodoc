import Base from "./base";

/**
 * store存储类，单例模式实现
 * 
 * @author mangomei
 * @since 2023-05-02 18:42
 */
class Store extends Base {}
let store = Store.getInstance();
export default store;