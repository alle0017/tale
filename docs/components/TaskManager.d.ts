export class TaskManager {
    /**
     * @type {TaskManager}
     */
    static "__#1@#instance": TaskManager;
    static get(): TaskManager;
    /**
     * @param {() => void} task
     */
    addTask(task: () => void): () => void;
    /**
     * @param {() => void} task
     */
    addAnimationTask(task: () => void): () => void;
    clearAll(): void;
    #private;
}
export function useTaskManager(): TaskManager;
//# sourceMappingURL=TaskManager.d.ts.map