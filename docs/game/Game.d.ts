/**@import {System} from "../components/index.js" */
/**@import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js" */
/**@import GPUContext from "../rendering/index.js" */
export class Game {
    static "__#16@#game": Game;
    static get(): Game;
    /**
     * the camera used inside the scene.
     * every default entity is bound to this
     * camera.
     */
    camera(): Camera;
    /**
     * Context used to draw entities onto the canvas.
     * To render an entity, it must be created with the
     * context and then added to the {@link Game.engine}, like the example
     * below
     * @example
     * ```javascript
     * const game = useGame();
     * const img = game.ctx.image();
     * game.engine.add(img);
     * ```
     */
    ctx: GPUContext;
    /**
     * system that renders each entity onto the screen.
     * it works, under the hood, with {@link Game.ctx}
     * to render every entity that was added
     */
    engine: System<GPUEntity2D>;
    /**
     * scene manager useful to transit across scenes
     * and preserve their state
     */
    scenes: SceneManager;
    #private;
}
export function useGame(): Game;
import type { Camera } from "../rendering/shader/buckets/Camera";
import type SceneManager from "./SceneManager.js";
import type GPUContext from "../rendering/index.js";
import type { System } from "../components/index.js";
import type GPUEntity2D from "../rendering/shader/entity/GPUEntity2D";
//# sourceMappingURL=Game.d.ts.map