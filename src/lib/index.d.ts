export type Position = {
      x: number,
      y: number;
      onMove(callback: (pos: Position) => void): void;
}

export type PhysicsPosition = {
      x: number,
      y: number,
      vx: number,
      vy: number,
      ax: number,
      ay: number,
      onMove(callback: (pos: Position) => void): void;
}