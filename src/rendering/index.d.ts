import type GPUEntity2D from "./entities/GPUEntity2D.js";

/**
 * Represents the rendering context for WebGL operations.
 */
export default interface GPUContext {
      //camera: Camera;
      entities: GPUEntity2D[];
      canvas: { width: number, height: number };
      /**
       * Draws all entities added to the current context
       */
      draw(): void;
      /**
       * Clears the canvas
       */
      clear(): void;
      /**
       * remove all current drawn entities.
       */
      removeAll(): void;
      addEntity(entity: GPUEntity2D): void;
      removeEntity(entity: GPUEntity2D): void;
}