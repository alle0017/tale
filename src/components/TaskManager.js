export class TaskManager {
      /**
       * @type {TaskManager}
       */
      static #instance;

      static get() {
            if (!TaskManager.#instance) {
                  TaskManager.#instance = new TaskManager();
            }

            return TaskManager.#instance;
      }

      /**
       * @type {Set<() => void>}
       * @readonly
       */
      #lpTasks;
      /**
       * @type {Set<() => void>}
       * @readonly
       */
      #hpTasks;
      #idleId = -1;
      #animId = -1;


      constructor() {
            this.#lpTasks = new Set();
            this.#hpTasks = new Set();
            this.#idleCallback = this.#idleCallback.bind(this);
            this.#animationCallback = this.#animationCallback.bind(this);
      }

      #idleCallback = () => {
            for (const task of this.#lpTasks) {
                  task();
            }
            this.#idleId = requestIdleCallback(this.#idleCallback);
      }

      #animationCallback = () => {
            for (const task of this.#hpTasks) {
                  task();
            }
            this.#animId = requestAnimationFrame(this.#animationCallback);
      }
      /**
       * @param {() => void} task 
       */
      addTask(task) {
            this.#lpTasks.add(task);

            if (this.#lpTasks.size === 1) {
                  this.#idleCallback();
            }

            return () => {
                  this.#lpTasks.delete(task);

                  if (this.#lpTasks.size <= 0) {
                        cancelIdleCallback(this.#idleId);
                  }
            };
      }
      /**
       * @param {() => void} task 
       */
      addAnimationTask(task) {
            this.#hpTasks.add(task);

            if (this.#hpTasks.size === 1) {
                  this.#animationCallback();
            }

            return () => {
                  this.#hpTasks.delete(task);

                  if (this.#hpTasks.size <= 0) {
                        cancelAnimationFrame(this.#animId);
                  }
            };
      }
      clearAll() {
            this.#lpTasks.clear();
            this.#hpTasks.clear();

            cancelAnimationFrame(this.#animId);
            cancelIdleCallback(this.#idleId);
      }
}

const useTaskManager = () => TaskManager.get();

export {useTaskManager}