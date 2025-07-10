export declare const physics: import("../ecs/Component.js").Query<"physics", {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    /**
     *
     * @param {(pos: PhysicsPosition) => void} callback
     * @returns {() => void} - unsubscribe method
     */
    onMove(callback: (pos: PhysicsPosition) => void): () => void;
}>;
export declare const usePhysics: () => import("../ecs/Component.js").Component<"physics", {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    /**
     *
     * @param {(pos: PhysicsPosition) => void} callback
     * @returns {() => void} - unsubscribe method
     */
    onMove(callback: (pos: PhysicsPosition) => void): () => void;
}>;
export function usePhysicsSystem(): void;
//# sourceMappingURL=Physics.d.ts.map