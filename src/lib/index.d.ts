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

export declare const usePhysics: () => PhysicsPosition;
export declare const usePosition: () => Position;
export declare const usePhysicsPosition: () => PhysicsPosition;
export declare const use2dRenderingSystem: () => {
    add(comp: (context: CanvasRenderingContext2D) => void): void;
    delete(comp: (context: CanvasRenderingContext2D) => void): void;
    dispose(): void;
    stop(): void;
    resume(): void;
};