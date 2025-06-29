import type { Camera } from "./shader/buckets/Camera.js";
import type Shape from "./shader/entity/Shape.js";
import type TextureEntity from "./shader/entity/Texture.js";

/**
 * Represents the rendering context for WebGL operations.
 */
export default interface GPUContext {
      camera: Camera;
      /**
       * Draws all entities added to the current context
       */
      draw(): void;
      /**
       * Clears the canvas
       */
      clear(): void;
      /**
       * Creates a rectangle shape that
       * can be later drawn using 
       * {@link GPUContext.drawShape()}
       */
      rect(): Shape;
      /**
       * Adds specified shape to the screen.
       * @param shape - The shape to add.
       */
      drawShape(shape: Shape): void;
      /**
       * Removes specified shape from the screen
       * @param shape - The shape to remove.
       */
      clearShape(shape: Shape): void;
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
       * Removes specified texture entity from the screen
       * @param img - The texture entity to remove.
       */
      clearImage(img: TextureEntity): void;
      /**
       * remove all current drawn entities.
       */
      removeAll(): void;
}