import type {Entity} from "../components/Entity"
import type {System} from "../components/index.js"
export default class Scene {
    /**
     * add an entity to the scene.
     * @param {Entity<unknown>} entity
     */
    add(entity: Entity<Record<string,unknown>>): void;
    /**
     * add system to the scene. If the scene
     * is stopped and later resumed, all systems
     * are restarted
     * @param {System<unknown>} system
     */
    use(system: System<unknown>): void;
    /**
     * stop the current scene and remove all
     * drawn entities from the screen. The entities are
     * preserved for later reuse, in case the scene will be
     * resumed with {@link Scene.resume()}
     */
    stop(): void;
    /**
     * resume all the systems that where
     * registered and add all {@link GPUEntity2D}
     * that where drawn when the scene was
     * removed
     */
    resume(): void;
    /**
     * remove all entities from the screen and
     * stop al the systems available.
     * if the scene is resumed, nothing will be preserved
     */
    clear(): void;
    /**
     * @param {() => void} callback
     */
    onResume(callback: () => void): () => boolean;
    /**
     * @param {() => void} callback
     */
    onStop(callback: () => void): () => boolean;
    /**
     * @param {() => void} callback
     */
    onClear(callback: () => void): () => boolean;
    #private;
}
//# sourceMappingURL=Scene.d.ts.map