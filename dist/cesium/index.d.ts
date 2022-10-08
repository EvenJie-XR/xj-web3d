import { Viewer } from "cesium";
export declare class jCesium {
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
     * 检测预备环境是否满足要求
     * @author: zwj
     * @return {*}
     */
    testPreset(): void;
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */
    destroy(): void;
}
