/**@import GPUEntity2D from "../rendering/shader/entity/GPUEntity2D.js" */
/**@import GPUContext from "../rendering/index.js" */
export class Game {
    static "__#14@#game": Game;
    static get(): Game;
    /**
     * the camera used inside the scene.
     * every default entity is bound to this
     * camera.
     */
    camera: Camera;
    /**
     * Context used to draw entities onto the canvas.
     * To render an entity, it must be created with the
     * context and then drawn using standard Context api.
     * this is simplified by the `useSprite` hook. if
     * you want more control, you have to do something like
     * this
     * @example
     * ```javascript
     * const game = useGame();
     * const img = game.ctx.image();
     * img.draw(game.ctx);
     * const f = () => {
     *    game.ctx.clear();
     *    game.ctx.draw();
     *    requestAnimationFrame(f);
     * }
     * f();
     * ```
     */
    ctx: GPUContext;
    /**
     * scene manager useful to transit across Worlds
     * and preserve their state
     */
    worlds: typeof WorldManager;
    /**
     * method used to preload all images
     * that will be used inside the game
     * @param  {Record<string,string>} imgs
     */
    preload(imgs: Record<string, string>): Promise<void>;
    #private;
}
export function useGame(): Game;
import { WorldManager } from "../ecs/WorldManager.js";
import { Camera } from '../rendering/shader/buckets/Camera';
import GPUContext from "../rendering/index.js";
//# sourceMappingURL=Game.d.ts.map