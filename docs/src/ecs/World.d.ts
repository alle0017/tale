import { Entity } from "./Entity";
/**
 * class that handles world.
 * world are micro-cosmos, composed
 * of entities and systems
 * that acts only on that entities.
 * only one world can exist at time
 */
export class World {
    entities: Entity<{}>[];
    /**
     * add new entity into the world.
     * from the moment an entity is added,
     * until it is removed with {@link World.remove()},
     * the entity will be affected to systems
     * that can query it.
     * @param {Entity<{}>} entity
     */
    add(entity: Entity<{}>): void;
    /**
     * remove the specified entity from the world
     * @param {Entity<{}>} entity
     */
    remove(entity: Entity<{}>): void;
    /**
     * add system to the tracked once.
     * A system that is tracked is dependant
     * to the World for its execution
     * @param {() => void} system
     */
    addSystem(system: () => void, priority?: number): void;
    /**
     * cleanup method called
     * when the World leave
     */
    onLeave(): void;
    /**
     * method used when the World
     * is started. All systems attached to it are
     * restarted
     */
    onEnter(): void;
    /**
     * lifecycle hook called each time an
     * entity is added or removed from the system
     * @param {() => void} hook
     */
    onStateChange(hook: () => void): () => boolean;
    /**
     * @param {() => void} callback
     */
    onResume(callback: () => void): () => boolean;
    /**
     * @param {() => void} callback
     */
    onStop(callback: () => void): () => boolean;
    #private;
}
//# sourceMappingURL=World.d.ts.map