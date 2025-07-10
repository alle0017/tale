/**@import GPUContext from "../../index" */
/**
 * @extends {GPUEntity2D}
 */
export default class Shape extends GPUEntity2D {
    /**
     *
     * @param {number[]} vertices
     */
    constructor(vertices: number[]);
    /**
     * @type {number[]}
     */
    vertices: number[];
    /**
     * color used to draw each vertex.
     * must be a series of numbers following scheme `[r,g,b,a]`
     * repeated for each vertex
     * @type {number[]}
     */
    colors: number[];
    /**
     * accepted values are:
     *    - `3` for triangles primitive
     *    - `2` for lines
     *    - `1` for points
     * @type {1 | 2 | 3}
     */
    primitive: 1 | 2 | 3;
    zIndex: number;
    coords: number[];
    indices: number[];
    #private;
}
import GPUEntity2D from "./GPUEntity2D.js";
//# sourceMappingURL=Shape.d.ts.map