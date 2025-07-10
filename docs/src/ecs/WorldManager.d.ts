/**@import {World} from "./World" */
/**
 * class that handles {@link World} lifecycle.
 */
export class WorldManager {
    /**
     * current world in execution
     * @type {World}
     */
    static "__#1@#current": World;
    /**
     * change the current world.
     * stopping previous systems and
     * replacing all old entities.
     * they will remain in the old world,
     * that can be later resumed
     * @param {World} world
     */
    static use(world: World): void;
    /**
     * current world in execution
     */
    static current: World;
}
import { World } from "./World";
//# sourceMappingURL=WorldManager.d.ts.map