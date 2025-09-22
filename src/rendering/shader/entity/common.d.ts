import { Primitive } from "./GPUEntity2D";

export interface Drawable {
      vertices: number[];
      primitive: Primitive;
}

export interface SingularImage {
      image: string,
      textureCoords: number[],
}

export interface FrameSource {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
}