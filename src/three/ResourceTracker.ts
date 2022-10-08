import * as THREE from 'three'
/**
 * 由于threejs拥有很多对象都需要手动释放不然会造成内存溢出还有不必要的CPU占用，所以我们为了方便就将所有的资源全部管理起来，然后一次性释放所有资源
 * @author: zwj
 * @return {*}
 */
export class ResourceTracker {
    public resources: Set<any>; // 资源字典
    constructor() {
        this.resources = new Set();
    }
    /**
     * 绑定资源（所有会add to scene的对象都需要绑定一下）
     * @author: zwj
     * @param {any} resource 资源（所有会add to scene的内容，不管是vector还是别的都要）
     * @return {*}
     */    
    track(resource: any) {
        if (!resource) {
            return resource;
        }

        // handle children and when material is an array of materials or
        // uniform is array of textures
        if (Array.isArray(resource)) {
            resource.forEach(resource => this.track(resource));
            return resource;
        }

        if (resource.dispose || resource instanceof THREE.Object3D) {
            this.resources.add(resource);
        }
        if (resource instanceof THREE.Object3D) {
            this.track((resource as any).geometry);
            this.track((resource as any).material);
            this.track(resource.children);
        } else if (resource instanceof THREE.Material) {
            // We have to check if there are any textures on the material
            for (const value of Object.values(resource)) {
                if (value instanceof THREE.Texture) {
                    this.track(value);
                }
            }
            // We also have to check if any uniforms reference textures or arrays of textures
            if ((resource as any).uniforms) {
                for (const value of Object.values((resource as any).uniforms)) {
                    if (value) {
                        const uniformValue = (value as any).value;
                        if (uniformValue instanceof THREE.Texture || Array.isArray(uniformValue)) {
                            this.track(uniformValue);
                        }
                    }
                }
            }
        }
        return resource;
    }
    /**
     * 资源取消绑定
     * @author: zwj
     * @param {any} resource
     * @return {*}
     */    
    untrack(resource: any) {
        this.resources.delete(resource);
    }
    /**
     * 销毁所有资源字典里的资源
     * @author: zwj
     * @return {*}
     */    
    dispose() {
        for (const resource of this.resources) {
            if (resource instanceof THREE.Object3D) {
                if (resource.parent) {
                    resource.parent.remove(resource);
                }
            }
            if (resource.dispose) {
                resource.dispose();
            }
        }
        this.resources.clear();
    }
}
