import { useRendering } from "../rendering/Rendering.js";
import { State } from "./state.js";
import { TaskManager } from "./TaskManager.js";
/**@import { Getter, Setter } from "./state.js";*/
/**@import {Entity} from "./Entity" */
/**@import EventManager from "./Event" */

/**
 * @typedef {{
 *    entities: Entity[]
 * }} Scene
 */
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
export const createScene = () => setScene({ entities: [], });
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

// clean up
events.on('change', (e) => {
      //@ts-ignore
      if (e.data.previousState != getScene()) {
            events.clear();
            TaskManager.clearAll();
      }     
});
