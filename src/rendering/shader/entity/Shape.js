import GPUEntity2D from "./GPUEntity2D.js";
/**@import GPUContext from "../../index" */

/**
 * @extends {GPUEntity2D}
 */
export default class Shape extends GPUEntity2D {
      /**
       * @type {number[]}
       */
      vertices;
      /**
       * color used to draw each vertex.
       * must be a series of numbers following scheme `[r,g,b,a]`
       * repeated for each vertex
       * @type {number[]}
       */
      colors;
      /**
       * accepted values are:
       *    - `3` for triangles primitive
       *    - `2` for lines 
       *    - `1` for points
       * @type {1 | 2 | 3}
       */
      primitive = 3;

      zIndex = 0;

      get coords() {
            const coords = [];

            for (let i = 0; i < this.vertices.length; i+= 2) {
                  coords.push(
                        this.vertices[i],
                        this.vertices[i + 1],
                        this.zIndex
                  );
            }

            return coords;
      }

      get indices() {
            switch (this.primitive) {
                  case 1: return this.vertices.map((_,i) => i);
                  case 2: return this.#wire(this.vertices);
                  default: return this.#triangulate(this.vertices);
            }
      }

      /**
       * 
       * @param {number[]} vertices 
       */
      constructor(vertices) {
            super();
            this.vertices = vertices;
      }

      /**
       * 
       * @param {number[]} points 
       */
      #triangulate(points) {
            const indices = [];

            for (let i = 0; i < points.length/2 - 1; i++) {
                  indices.push(0);
                  indices.push(i);
                  indices.push(i + 1);
            }

            return indices;
      }

      /**
       * 
       * @param {number[]} points 
       */
      #wire(points) {
            const indices = [];

            for (let i = 0; i < points.length; i++) {
                  indices.push(i);
                  indices.push((i + 1)%points.length);
            }

            return indices;
      }

      /**
       * draw this into the provided
       * context
       * @param {GPUContext} ctx 
       */
      draw(ctx) {
            ctx.drawShape(this);
      }

      /**
       * remove this from the provided
       * context
       * @param {GPUContext} ctx 
       */
      remove(ctx) {
            ctx.clearShape(this);
      }
}