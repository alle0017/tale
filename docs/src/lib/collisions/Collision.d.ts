import { RigidBody } from '../../../../src/lib/index';
/**
 * create a collision system where,
 * each body registered to it, is checked
 * to see whether is colliding with
 * something else, in that case triggers
 * an event of collision
 */
export function useCollisionSystem(): void;
export declare const body: import("../../ecs/Component.js").Query<"body", RigidBody>;
export declare const useBody: () => import("../../ecs/Component.js").Component<"body", RigidBody>;
//# sourceMappingURL=Collision.d.ts.map