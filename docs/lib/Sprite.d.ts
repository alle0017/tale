import type { Texture } from '../rendering/shader/lib/buffer/Texture';
import type { Position } from './index';
export function useSprite(asset: string): {
    sprite: Texture;
    /**
     * bind the position component
     * to the sprite, so whenever the
     * position component changes the sprite
     * will follow it. Every position that
     * was previously bind will be unbind
     * @param {Position} position
     */
    bind(position: Position): void;
    /**
     * detach previously bound
     * position.
     * @throws {Error} if no position was bound
     */
    unbind(): void;
    /**
     * stop rendering the sprite onto
     * the screen
     */
    hide(): void;
    /**
     * start rendering the sprite onto the
     * screen
     */
    show(): void;
};
//# sourceMappingURL=Sprite.d.ts.map