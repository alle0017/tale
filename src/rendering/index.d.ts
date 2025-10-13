import type { Camera } from "./shaders/Camera.js";
import { Shader } from "./shaders/shader.js";

/**
 * Represents the rendering context for WebGL operations.
 */
export default interface GPUContext {
      camera: Camera;
      entities: Shader[];
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
      addEntity(shader: Shader): void;
      removeEntity(shader: Shader): void;
}