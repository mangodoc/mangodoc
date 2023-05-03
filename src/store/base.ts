/**
 * 存储基类 单例模式实现
 * 
 * @author mangomei
 * @since 2023-05-03 11:48
 */
export default class Base {
    protected data: any = {};

    private static instance: Base = new Base();

    protected constructor(){}

    set(key: string,value: any): void{
        this.data[key] = value;
    }

    get(key: string): any{
        return this.data[key];
    }

    static getInstance(){
        return Base.instance;
    }
}
