export default class TextureBucket {
    static "__#10@#VERTICES_POS": number[];
    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl: WebGLRenderingContext);
    entities: TextureEntity[];
    /**
     * @param {TextureEntity} texture
     */
    add(texture: TextureEntity): void;
    /**
     * @param {TextureEntity} texture
     */
    remove(texture: TextureEntity): void;
    /**
     * bind the camera to this bucket.
     * this passage is needed to render correctly
     * the texture
     * @param {Camera} camera
     */
    bindCamera(camera: Camera): void;
    draw(): TextureBucket;
    removeAll(): void;
    #private;
}
import type { Camera } from "./Camera.js";
import type TextureEntity from "../entity/Texture";
//# sourceMappingURL=TextureBucket.d.ts.map