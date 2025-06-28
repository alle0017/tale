import { useTaskManager } from "./TaskManager.js";

/**
 * create a system that is run as a low priority task.
 * the system update function is called during each cycle
 * @template T
 * @param {(components: T[]) => void} system 
 */
export function createSystem(system) {
      /**@type {Set<T>} */
      const components = new Set();
      const manager = useTaskManager();
      const task = () => {
            system([...components])
      };

      let dispose = manager.addTask(task);

      return {
            /**
             * @param {T} comp 
             */
            add(comp) {
                  components.add(comp);
            },
            /**
             * @param {T} comp 
             */
            delete(comp) {
                  components.delete(comp);
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
 * @param {(components: T[]) => void} system 
 */
export function createAnimationSystem(system) {
      /**@type {Set<T>} */
      const components = new Set();
      const manager = useTaskManager();
      const task = () => {
            system([...components])
      };

      let dispose = manager.addAnimationTask(task);

      return {
            /**
             * @param {T} comp 
             */
            add(comp) {
                  components.add(comp);
            },
            /**
             * @param {T} comp 
             */
            delete(comp) {
                  components.delete(comp);
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