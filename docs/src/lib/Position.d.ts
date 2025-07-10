import { PhysicsPosition } from '../../../src/lib/index';
export declare const position: import("../ecs/Component").Query<"position", {
    x: number;
    y: number;
    /**
     *
     * @param {(pos: Position) => void} callback
     * @returns {() => void} - unsubscribe method
     */
    onMove(callback: (pos: Position) => void): () => void;
}>;
export declare const usePosition: () => import("../ecs/Component").Component<"position", {
    x: number;
    y: number;
    /**
     *
     * @param {(pos: Position) => void} callback
     * @returns {() => void} - unsubscribe method
     */
    onMove(callback: (pos: Position) => void): () => void;
}>;
export function usePhysicsPosition(): PhysicsPosition;
//# sourceMappingURL=Position.d.ts.map