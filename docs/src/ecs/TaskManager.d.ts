export type Priority = number;
export declare namespace Priority {
    const HIGH: number;
    const LOW: number;
}
export class TaskManager {
    /**
     * @type {TaskManager}
     */
    static "__#16@#instance": TaskManager;
    static get(): TaskManager;
    /**
     * @param {() => void} task
     */
    addTask(task: () => void): () => void;
    /**
     * creates an high priority task that
     * runs before each frame
     * @param {() => void} task
     */
    addAnimationTask(task: () => void): () => void;
    /**
     * remove all tasks actually in execution
     */
    clearAll(): void;
    #private;
}
export function useTaskManager(): TaskManager;
//# sourceMappingURL=TaskManager.d.ts.map