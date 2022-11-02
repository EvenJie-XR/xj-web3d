import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import { ResourceTracker } from "./ResourceTracker"

export class xjThree {
    public scene: Scene
    public camera: PerspectiveCamera
    public renderer: WebGLRenderer
    public controls: TrackballControls | OrbitControls | ArcballControls | undefined
    public resourceManager: ResourceTracker;
    public animationId: number | undefined;
    constructor(public container: HTMLElement){
        this.resourceManager = new ResourceTracker();
        this.scene = new Scene()
        this.camera = new PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0, 1000 );
        this.camera.position.set(0, 0, -10);
        this.renderer = new WebGLRenderer( { antialias: true } );
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( container.clientWidth, container.clientHeight );
        this.tick();
        this.onCanvasResize();
    }
    /**
     * 渲染帧
     * @author: zwj
     * @return {*}
     */    
    private tick(){
        this.animationId = requestAnimationFrame(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls?.update();
            this.tick();
        });
    }
    /**
     * 自适应当前canvas的size
     * @author: zwj
     * @return {*}
     */    
    private onCanvasResize(){
        window.addEventListener("resize", () => {
            this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
            const aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.aspect = aspect;
			this.camera.updateProjectionMatrix();
        })
    }
    /**
     * 开启TrackballControls
     * @author: zwj
     * @return {*}
     */    
    public enableTrackballControls(){
        if(this.controls){
            this.controls.dispose();
        }
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
    }
    /**
     * 销毁当前控制器
     * @author: zwj
     * @return {*}
     */    
    public disposeControls(){
        this.controls?.dispose();
        this.controls = undefined;
    }
    /**
     * 开启OrbitControls
     * @author: zwj
     * @return {*}
     */    
    public enableOrbitControls() {
        if(this.controls){
            this.controls.dispose();
        }
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.listenToKeyEvents( window ); // optional
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 1;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI / 2;
    }
    /**
     * 开启ArcballControls
     * @author: zwj
     * @return {*}
     */    
    public enableArcballControls() {
        if(this.controls){
            this.controls.dispose();
        }
        this.controls = new ArcballControls( this.camera, this.renderer.domElement, this.scene );
        this.controls.setGizmosVisible(false);
    }
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */    
    public destroy(){
        this.scene.clear();
        this.resourceManager.dispose();
        this.renderer.dispose();
        this.renderer.forceContextLoss();
        this.controls?.dispose();
        this.animationId && cancelAnimationFrame(this.animationId);
        const gl = this.renderer.domElement.getContext('webgl');
        gl && gl.getExtension('WEBGL_lose_context')?.loseContext();
        console.log(this.renderer.info);
    }
}