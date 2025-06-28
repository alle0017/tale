export class SharedUniformBuffer {
      /**
       * @type {WebGLRenderingContext}
       */
      #gl;
      /**
       * @type {number[]}
       */
      #values;
      /**
       * @type {boolean}
       */
      #dirty = false;
      /**
       * @readonly
       * @type {string}
       */
      #type;

      /**
       * @param {WebGLRenderingContext} gl 
       * @param {string} type 
       */
      constructor(gl, type) {
            this.#gl = gl;
            this.#type = type;
      }

      /**
       * @param {number[]} values
       */
      write(values) {  
            this.#values = values;
            this.#dirty = true;
      }

      /**
       * 
       * @param {WebGLProgram} program 
       * @param {string} name 
       * @returns 
       */
      bind(program, name) {

            if (!this.#dirty) {
                  return;
            }
            const pointer = this.#gl.getUniformLocation(program, name);

            this.#dirty = false;

            switch (this.#type) {
                  case "float":    return this.#gl.uniform1f(pointer, this.#values[0]);
                  case "vec2":     return this.#gl.uniform2fv(pointer, this.#values);
                  case "vec3":     return this.#gl.uniform3fv(pointer, this.#values);
                  case "vec4":     return this.#gl.uniform4fv(pointer, this.#values);
                  case "int":      return this.#gl.uniform1i(pointer, this.#values[0]);
                  case "ivec2":    return this.#gl.uniform2iv(pointer, this.#values);
                  case "ivec3":    return this.#gl.uniform3iv(pointer, this.#values);
                  case "ivec4":    return this.#gl.uniform4iv(pointer, this.#values);
                  case "bool":     return this.#gl.uniform1i(pointer, this.#values ? 1 : 0);
                  case "mat2":     return this.#gl.uniformMatrix2fv(pointer, false, this.#values);
                  case "mat3":     return this.#gl.uniformMatrix3fv(pointer, false, this.#values);
                  case "mat4":     return this.#gl.uniformMatrix4fv(pointer, false, this.#values);
                  default: throw new Error(`Unknown uniform type: ${this.#type}`);
            }
      }
}