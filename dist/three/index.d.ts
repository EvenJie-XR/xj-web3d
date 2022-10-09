import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import { ResourceTracker } from "./ResourceTracker";
export declare class xjThree {
    container: HTMLElement;
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    controls: TrackballControls | OrbitControls | ArcballControls | undefined;
    resourceManager: ResourceTracker;
    animationId: number | undefined;
    constructor(container: HTMLElement);
    /**
     * 渲染帧
     * @author: zwj
     * @return {*}
     */
    private tick;
    /**
     * 自适应当前canvas的size
     * @author: zwj
     * @return {*}
     */
    private onCanvasResize;
    /**
     * 开启TrackballControls
     * @author: zwj
     * @return {*}
     */
    enableTrackballControls(): void;
    /**
     * 销毁当前控制器
     * @author: zwj
     * @return {*}
     */
    disposeControls(): void;
    /**
     * 开启OrbitControls
     * @author: zwj
     * @return {*}
     */
    enableOrbitControls(): void;
    /**
     * 开启ArcballControls
     * @author: zwj
     * @return {*}
     */
    enableArcballControls(): void;
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */
    destroy(): void;
}
