import TextureEntity from '../rendering/shader/entity/Texture';
export declare const sprite: import("../ecs/Component.js").Query<"sprite", {
    sprite: TextureEntity;
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
}>;
export declare const useSprite: (asset: string) => import("../ecs/Component.js").Component<"sprite", {
    sprite: TextureEntity;
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
}>;
//# sourceMappingURL=Sprite.d.ts.map