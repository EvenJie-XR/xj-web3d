import { buildModuleUrl, TileMapServiceImageryProvider, Viewer, Ion } from "cesium";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOTNkMWU3NS0wM2JiLTQ4NmMtYTgyNi05NWU3MWVjMWEzMmYiLCJpZCI6NzE0MzQsImlhdCI6MTYzNTIxNjIyMX0.QnoSt0kZkqKMAL_9EHw6toCwONY-Ao2mRwYpS36FLAk'
export class jCesium{
    public viewer: Viewer | undefined
    constructor(container: HTMLElement){
        this.testPreset();
        this.init(container);
    }
    /**
     * 初始化cesium
     * @author: zwj
     * @param {HTMLElement} container
     * @return {*}
     */    
    public init(container: HTMLElement) {
        this.viewer = new Viewer(container, {
            infoBox: false, // 解决iframe无法执行js报错问题
            baseLayerPicker: true, // 去掉底图选择器
            sceneModePicker: false, // 去掉场景模式选择器 （3D，2D）
            homeButton: false, // 去掉起始点按钮
            geocoder: false, // 去掉地理代码搜索
            navigationHelpButton: false, // 去掉导航帮助按钮
            animation: false, // 取消动画按钮
            timeline: false, // 去掉时间线
            fullscreenButton: false, // 去掉全屏按钮
            selectionIndicator: false, // 去掉选择指示器
            imageryProvider: new TileMapServiceImageryProvider({ // 使用请求量少的图片瓦片地图提供者减少不必要的外网底图请求，避免网络无法科学上网时导致整个地球出不来
                url: buildModuleUrl("Assets/Textures/NaturalEarthII")
            })
        });
        (this.viewer.cesiumWidget.creditContainer as HTMLDivElement).style.display = 'none'; // 去掉cesium的左下角logo区域
    }
    /**
     * 检测预备环境是否满足要求
     * @author: zwj
     * @return {*}
     */    
    public testPreset() {
        if(!(window as any).CESIUM_BASE_URL){ // 检查是否设置CESIUM_BASE_URL
            throw new Error('CESIUM_BASE_URL未设置，请设置cesium静态资源包的位置，例如：cesium静态资源包在public/cesium目录下，此项目有baseUrl：xj，浏览器url：http://localhost:5173/xj/examples/xxx/xxx/xxx.html，那么我们设置CESIUM_BASE_URL为：/xj/cesium/。')
        }
    }
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */    
    public destroy(){
        this.viewer?.canvas.getContext('webgl')?.getExtension('WEBGL_lose_context')?.loseContext();
        this.viewer?.destroy();
        this.viewer = undefined;
    }
}