import { xjThree } from "./three/index"
import { xjCesium } from "./cesium/index"
export const XJ = {
    /**
     * 初始化three场景
     * @author: zwj
     * @param {HTMLElement} container three的canvas的父容器
     * @return {*}
     */    
    initThreeScene(container: HTMLElement): xjThree {
        return new xjThree(container);
    },
    /**
     * 初始化cesium场景
     * @author: zwj
     * @param {HTMLElement} container cesium的canvas的父容器
     * @return {*}
     */    
    initCesiumScene(container: HTMLElement): xjCesium {
        return new xjCesium(container);
    }
}
