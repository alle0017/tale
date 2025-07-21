/**@import EntityView from "../components/entity/EntityView";*/
import { createState } from "@alle0017!/photonjs/store/store.js"

const {accessor, mutator, derive} = createState({
      id: 0,
      /**
       * @type {Set<EntityView>}
       */
      entities: new Set(),
      /**
       * @type {Set<import("../Resumable").SceneResumable>}
       */
      scenes: new Set(),
      /**
       * @type {Map<string,HTMLImageElement>}
       */
      images: new Map(),
});

export const addEntity = mutator(/**@param {EntityView} e*/(store, e) => {
      store.entities.add(e); 
      return store;
});

export const entities = accessor(state => [...state.entities]);

export default class Project {
      static project = new Project();
      #entityId = 0;
      #sceneId = 0;

      get baseEntityName() {
            return `Entity${this.#entityId++}`;
      }

      get baseSceneName() {
            return `Scene${this.#sceneId++}`;
      }

      /**
       * @type {Set<EntityView>}
       */
      entities = new Set();
      /**
       * @type {Set<import("../Resumable").SceneResumable>}
       */
      scenes = new Set();
      /**
       * @type {Map<string,HTMLImageElement>}
       */
      images = new Map();
}