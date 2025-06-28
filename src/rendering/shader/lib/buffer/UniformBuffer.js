export class UniformBuffer {
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
       * @type {WebGLUniformLocation}
       */
      #pointer;

      /**
       * @readonly
       * @type {string}
       */
      #type;

      /**
       * @param {WebGLRenderingContext} gl 
       * @param {string} name 
       * @param {WebGLProgram} program 
       * @param {string} type 
       */
      constructor(gl, name, program, type) {
            this.#gl = gl;
            this.#pointer = this.#gl.getUniformLocation(program, name);
            this.#type = type;
      }

      /**
       * @param {number[]} values
       */
      write(values) {  
            this.#values = values;
            this.#dirty = true;
      }

      bind() {
            if (!this.#dirty) {
                  return;
            }
            this.#dirty = false;

            switch (this.#type) {
                  case "float":    return this.#gl.uniform1f(this.#pointer, this.#values[0]);
                  case "vec2":     return this.#gl.uniform2fv(this.#pointer, this.#values);
                  case "vec3":     return this.#gl.uniform3fv(this.#pointer, this.#values);
                  case "vec4":     return this.#gl.uniform4fv(this.#pointer, this.#values);
                  case "int":      return this.#gl.uniform1i(this.#pointer, this.#values[0]);
                  case "ivec2":    return this.#gl.uniform2iv(this.#pointer, this.#values);
                  case "ivec3":    return this.#gl.uniform3iv(this.#pointer, this.#values);
                  case "ivec4":    return this.#gl.uniform4iv(this.#pointer, this.#values);
                  case "bool":     return this.#gl.uniform1i(this.#pointer, this.#values ? 1 : 0);
                  case "mat2":     return this.#gl.uniformMatrix2fv(this.#pointer, false, this.#values);
                  case "mat3":     return this.#gl.uniformMatrix3fv(this.#pointer, false, this.#values);
                  case "mat4":     return this.#gl.uniformMatrix4fv(this.#pointer, false, this.#values);
                  default: throw new Error(`Unknown uniform type: ${this.#type}`);
            }
      }
}