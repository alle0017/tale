/**
 * @typedef {(dt: number) => void} Task
 */
export const TaskManager = (() => {
      /**
       * @type {Task[]}
       */
      let tasks = [];
      let id = -1;
      let last = performance.now();
      let running = true;

      function loop() {
            const now = performance.now();
            const dt = (now - last) / 1000;
            last = now;

            for (let i = 0; i < tasks.length; i++) {
                  tasks[i](dt);
            }

            id = requestAnimationFrame(loop);
      }

      loop();
            
      return {
            start: () => {
                  if (!running) {
                        running = true;
                        loop();
                  }
            },
            stop: () => {
                  if (running) {
                        running = false;
                        cancelAnimationFrame(id);
                  }
            },
            /**
             * @param {Task} task
             */
            addTask: (task, priority = tasks.length) => tasks.splice(priority, 0, task),
            /**
             * @param {Task} task
             */
            removeTask: task => tasks = tasks.filter(t  => t !== task),
            clearAll: () => tasks = [],
      }
})()

const useTaskManager = () => TaskManager;

export {useTaskManager}