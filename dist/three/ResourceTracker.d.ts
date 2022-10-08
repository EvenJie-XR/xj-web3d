/**
 * 由于threejs拥有很多对象都需要手动释放不然会造成内存溢出还有不必要的CPU占用，所以我们为了方便就将所有的资源全部管理起来，然后一次性释放所有资源
 * @author: zwj
 * @return {*}
 */
export declare class ResourceTracker {
    resources: Set<any>;
    constructor();
    /**
     * 绑定资源（所有会add to scene的对象都需要绑定一下）
     * @author: zwj
     * @param {any} resource 资源（所有会add to scene的内容，不管是vector还是别的都要）
     * @return {*}
     */
    track(resource: any): any;
    /**
     * 资源取消绑定
     * @author: zwj
     * @param {any} resource
     * @return {*}
     */
    untrack(resource: any): void;
    /**
     * 销毁所有资源字典里的资源
     * @author: zwj
     * @return {*}
     */
    dispose(): void;
}
