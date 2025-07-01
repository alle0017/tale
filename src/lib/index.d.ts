export type Position = {
      x: number,
      y: number;
      onMove(callback: (pos: Position) => void): () => void;
}

export type PhysicsPosition = {
      x: number,
      y: number,
      vx: number,
      vy: number,
      ax: number,
      ay: number,
      onMove(callback: (pos: Position) => void): () => void;
}

/**
 * x should be considered the leftmost 
 * point onto the rectangle, while y should be considered
 * the topmost point onto the rectangle.
 * ### example
 * 
 * ---
 * \
 * ```plaintext
 * a +---+ b
 *   |   |
 * c +---+ d
 * ```
 * 
 * `c` is the (x,y) point used to check conditions
 */
export type RigidBody = {
      x: number,
      y: number,
      width: number,
      height: number,
      onCollision(body: RigidBody): void;
}