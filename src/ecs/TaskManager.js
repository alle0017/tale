import EventManager from "./Event.js";

/**
 * @enum {number}
 */
export const Priority = {
      HIGH: 100,
      LOW: -1,
};

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
      /**@type {EventManager<'change'>} */
      #events = new EventManager();

      get events() {
            return this.#events;
      }

      get lowPriorityTask() {
            return [...this.#lpTasks];
      }

      get highPriorityTask() {
            return [...this.#hpTasks];
      }

      constructor() {
            this.#lpTasks = new Set();
            this.#hpTasks = new Set();
            this.#idleCallback = this.#idleCallback.bind(this);
            this.#animationCallback = this.#animationCallback.bind(this);
      }

      #idleCallback = () => {
            for (const task of this.#lpTasks) {
                  try {
                        task();
                  } catch (e) {
                        console.error(e)
                  }
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
            this.#events.trigger('change');

            if (this.#lpTasks.size === 1) {
                  this.#idleCallback();
            }

            return () => {
                  this.#events.trigger('change');
                  this.#lpTasks.delete(task);

                  if (this.#lpTasks.size <= 0) {
                        cancelIdleCallback(this.#idleId);
                  }
            };
      }
      /**
       * creates an high priority task that 
       * runs before each frame
       * @param {() => void} task 
       */
      addAnimationTask(task) {
            this.#hpTasks.add(task);
            this.#events.trigger('change');

            if (this.#hpTasks.size === 1) {
                  this.#animationCallback();
            }

            return () => {
                  this.#events.trigger('change');
                  this.#hpTasks.delete(task);

                  if (this.#hpTasks.size <= 0) {
                        cancelAnimationFrame(this.#animId);
                  }
            };
      }
      /**
       * remove all tasks actually in execution
       */
      clearAll() {
            this.#events.trigger('change');
            this.#lpTasks.clear();
            this.#hpTasks.clear();

            cancelAnimationFrame(this.#animId);
            cancelIdleCallback(this.#idleId);
      }
}

const useTaskManager = () => TaskManager.get();

export {useTaskManager}