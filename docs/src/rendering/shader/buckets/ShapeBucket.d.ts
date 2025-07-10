export default class ShapeBucket {
    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl: WebGLRenderingContext);
    entities: Shape[];
    /**
     * bind the camera to this bucket.
     * this passage is needed to render correctly
     * the texture
     * @param {Camera} camera
     */
    bindCamera(camera: Camera): void;
    /**
     * @param {Shape} shape
     */
    add(shape: Shape): void;
    /**
     * @param {Shape} shape
     */
    remove(shape: Shape): void;
    draw(): ShapeBucket;
    removeAll(): void;
    #private;
}
import { Camera } from "./Camera.js";
import Shape from "../entity/Shape.js";
//# sourceMappingURL=ShapeBucket.d.ts.map