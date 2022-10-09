import { Viewer } from "cesium";
export declare class xjCesium {
    viewer: Viewer | undefined;
    constructor(container: HTMLElement);
    /**
     * 初始化cesium
     * @author: zwj
     * @param {HTMLElement} container
     * @return {*}
     */
    init(container: HTMLElement): void;
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */
    destroy(): void;
}
