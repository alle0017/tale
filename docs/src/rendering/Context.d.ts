/**
 * Represents the rendering context for WebGL operations.
 * @implements {GPUContext}
 */
export default class Context implements GPUContext {
    camera: Camera;
    entities: GPUEntity2D[];
    /**
     * Draws all textures and shapes in their respective buckets.
     */
    draw(): void;
    /**
     * Clears the WebGL context with a black background.
     */
    clear(): void;
    /**
     * Creates a rectangle shape.
     * @returns {Shape} A new rectangle shape.
     */
    rect(): Shape;
    /**
     * Creates a new texture entity.
     * @returns {TextureEntity} A new texture entity.
     */
    image(): TextureEntity;
    /**
     * Adds a texture entity to the texture bucket for rendering.
     * @param {TextureEntity} img - The texture entity to add.
     */
    drawImage(img: TextureEntity): void;
    /**
     * Removes a texture entity from the texture bucket.
     * @param {TextureEntity} img - The texture entity to remove.
     */
    clearImage(img: TextureEntity): void;
    /**
     * Adds a shape to the shape bucket for rendering.
     * @param {Shape} shape - The shape to add.
     */
    drawShape(shape: Shape): void;
    /**
     * Removes a shape from the shape bucket.
     * @param {Shape} shape - The shape to remove.
     */
    clearShape(shape: Shape): void;
    removeAll(): void;
    #private;
}
import { Camera } from "./shader/buckets/Camera.js";
import Shape from "./shader/entity/Shape.js";
import TextureEntity from "./shader/entity/Texture.js";
import GPUEntity2D from "./shader/entity/GPUEntity2D.js";
import GPUContext from './index';
//# sourceMappingURL=Context.d.ts.map