/**
 * create a system that is run as a low priority task.
 * the system update function is called during each cycle
 * @template T
 * @param {(components: T[], isDirty: boolean) => void} system
 */
export function createSystem<T>(system: (components: T[], isDirty: boolean) => void): {
    /**
     * @param {T} comp
     */
    add(comp: T): void;
    /**
     * @param {T} comp
     */
    delete(comp: T): void;
    dispose(): void;
    stop(): void;
    resume(): void;
};
/**
 * create a system that is run as high-priority task.
 * the system update function is called during each cycle
 * @template T
 * @param {(components: T[], isDirty: boolean) => void} system
 */
export function createAnimationSystem<T>(system: (components: T[], isDirty: boolean) => void): {
    /**
     * @param {T} comp
     */
    add(comp: T): void;
    /**
     * @param {T} comp
     */
    delete(comp: T): void;
    dispose(): void;
    stop(): void;
    resume(): void;
};
//# sourceMappingURL=System.d.ts.map