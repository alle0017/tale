import GPUEntity2D from "./GPUEntity2D.js";

export default class Shape extends GPUEntity2D {
      /**
       * @type {number[]}
       */
      vertices;
      /**
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

            for (let i = 0; i < points.length - 1; i++) {
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
}