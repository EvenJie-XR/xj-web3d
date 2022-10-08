import { Viewer } from "cesium";
export declare class jCesium {
    viewer: Viewer | undefined;
    constructor(container: HTMLElement);
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */
    destroy(): void;
}
