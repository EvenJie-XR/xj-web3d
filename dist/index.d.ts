import { jThree } from "./three";
import { jCesium } from "./cesium";
export declare const ThreeD: {
    /**
     * 初始化three场景
     * @author: zwj
     * @param {HTMLElement} container three的canvas的父容器
     * @return {*}
     */
    initThreeScene(container: HTMLElement): jThree;
    /**
     * 初始化cesium场景
     * @author: zwj
     * @param {HTMLElement} container cesium的canvas的父容器
     * @return {*}
     */
    initCesiumScene(container: HTMLElement): jCesium;
};
