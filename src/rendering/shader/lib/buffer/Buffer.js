export class Buffer {

      /**
       * @type {WebGLRenderingContext}
       */
      #gl;
      /**
       * @type {WebGLBuffer}
       */
      #buffer;
      /**
       * @type {number}
       */
      #pointer;

      /**
       * @type {number}
       * @readonly
       */
      #type;

      /**
       * @param {WebGLRenderingContext} gl 
       * @param {string} name 
       * @param {string} type 
       * @param {WebGLProgram} program 
       */
      constructor(gl, name, type, program) {
            this.#gl = gl;
            this.#buffer = this.#gl.createBuffer();
            this.#pointer = this.#gl.getAttribLocation(program, name);
            this.#type = this.#getSize(type);
 
            if (this.#pointer < 0) {
                  throw new Error(`${name} was not bound correctly`);
            }
      }

      /**
       * @param {string} type 
       */
      #getSize(type) {
            switch (type) {
                  case "float":     return 1;
                  case "vec2":      return 2;
                  case "vec3":      return 3;
                  case "vec4":      return 4;
                  case "mat2":      return 2;
                  case "mat3":      return 3;
                  case "mat4":      return 4;
            }
      }

      /**
       * @param {number[]} values 
       * @param {number} dynamic
       */
      write(values, dynamic = this.#gl.STATIC_DRAW) {
            this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#buffer);

            this.#gl.bufferData(
                  this.#gl.ARRAY_BUFFER, 
                  new Float32Array(values),
                  dynamic
            );
      }

      /**
       * @param {number} [offset] 
       * @param {number} [stride]
       */
      bind(normalized = false, offset = 0, stride = 0) {
            this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#buffer);

            this.#gl.enableVertexAttribArray(this.#pointer);
            this.#gl.vertexAttribPointer(this.#pointer, this.#type, this.#gl.FLOAT, normalized, stride, offset);
      }
}