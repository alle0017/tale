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
       * @type {Set<import("../Resumable").Entity>}
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
      /**
       * @type {Map<string,import("../Resumable").Position>}
       */
      positions = new Map();
      /**
       * @type {Map<string,import("../Resumable").Body>}
       */
      bodies = new Map();
}