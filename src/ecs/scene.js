import { useRendering } from "../rendering/Rendering.js";
import { State } from "./state.js";
/**@import { Getter, Setter } from "./state.js";*/
/**@import {Entity} from "./Entity" */
/**@import EventManager from "./Event" */

/**
 * @typedef {{
 *    entities: Entity[]
 * }} Scene
 */
/**
 * @type {{
 *   events: EventManager<'change'| 'leave' | 'update'>;
 *   mutator: <Args extends unknown[]>(setter: Setter<Scene, Args>) => (...args: Args) => void;
 *   observer: <K>(getter: Getter<Scene, K>) => () => K;
 *}}
 */
//@ts-expect-error
const {
      observer, 
      mutator, 
      events
} = State(/**@type {Scene}*/(null));

export {events};
export const setScene = mutator(
      /**
      * @param {Scene} scene
      */
      (_, scene) => {
            return scene;
      }
);
export const createScene = () => setScene({ entities: [] });
export const getScene = observer((scene) => scene);
export const addEntity = mutator(
      /**
       * @param {Entity} entity 
       */
      (scene, entity) => {
            scene.entities.push(entity);
            return scene;
      }
);
