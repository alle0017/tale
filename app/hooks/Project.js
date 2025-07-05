/**@import EntityView from "../components/entity/EntityView";*/

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