import { useTaskManager } from "./TaskManager.js";

/**
 * create a system that is run as a low priority task.
 * the system update function is called during each cycle
 * @template T
 * @param {(components: T[], isDirty: boolean) => void} system 
 */
export function createSystem(system) {
      let dirty = false;
      /**@type {Set<T>} */
      const components = new Set();
      const manager = useTaskManager();
      const task = () => {
            system([...components], dirty);
            dirty = false;
      };

      let dispose = manager.addTask(task);

      return {
            /**
             * @param {T} comp 
             */
            add(comp) {
                  components.add(comp);
                  dirty = true;
            },
            /**
             * @param {T} comp 
             */
            delete(comp) {
                  components.delete(comp);
                  dirty = true;
            },

            dispose() {
                  dispose();
                  components.clear();
            },
            stop() {
                  dispose();
            },
            resume() {
                  dispose = manager.addTask(task);
            }
      }
}

/**
 * create a system that is run as high-priority task.
 * the system update function is called during each cycle
 * @template T
 * @param {(components: T[], isDirty: boolean) => void} system 
 */
export function createAnimationSystem(system) {
      /**@type {Set<T>} */
      const components = new Set();
      const manager = useTaskManager();
      let dirty = false;
      const task = () => {
            system([...components], dirty);
            dirty = false;
      };

      let dispose = manager.addAnimationTask(task);

      return {
            /**
             * @param {T} comp 
             */
            add(comp) {
                  components.add(comp);
                  dirty = true;
            },
            /**
             * @param {T} comp 
             */
            delete(comp) {
                  components.delete(comp);
                  dirty = true;
            },

            dispose() {
                  dispose();
                  components.clear();
            },
            stop() {
                  dispose();
            },
            resume() {
                  dispose = manager.addAnimationTask(task);
            }
      }
}