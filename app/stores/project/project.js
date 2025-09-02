import { createState } from "../../store";
/**@import { State } from "../../store";*/



const { accessor, mutator, derive } = /**@type {State<Project>}*/(createState({
      scenes: {},
      entities: {
            None: {
                  components: []
            }
      },
}))
export {derive}
export const scenes = accessor(state => state.scenes);
export const entities = accessor(state => state.entities);
export const _state = accessor(state => state);

/**
 * @type {(name: string) => void}
 */
export const createScene = mutator((state, name) => {
      state.scenes[name] = {
            entities: [],
      };
      return state;
});
/**
 * @type {(sceneName: string, entity: EntityInstance) => void}
 */
export const addEntityToScene = mutator((state, sceneName, entity) => {
      state.scenes[sceneName].entities.push(entity);
      return state;
});