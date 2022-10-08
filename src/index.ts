import { jThree } from "./three"
import { jCesium } from "./cesium"
export const ThreeD = {
    /**
     * 初始化three场景
     * @author: zwj
     * @param {HTMLElement} container three的canvas的父容器
     * @return {*}
     */    
    initThreeScene(container: HTMLElement): jThree {
        return new jThree(container);
    },
    /**
     * 初始化cesium场景
     * @author: zwj
     * @param {HTMLElement} container cesium的canvas的父容器
     * @return {*}
     */    
    initCesiumScene(container: HTMLElement): jCesium {
        return new jCesium(container);
    }
}