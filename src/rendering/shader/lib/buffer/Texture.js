import ImageCache from "./Image.js";
export class Texture {
      /**
       * @type {WebGLRenderingContext}
       */
      #gl;
      /**
       * @type {boolean}
       */
      #dirty = false;
      /**
       * @type {WebGLUniformLocation}
       */
      #pointer;
      /**
       * @type {WebGLTexture}
       */
      #texture;
      /**
       * @type {string}
       */
      #image;

      get image() {
            return this.#image;
      }

      /**
       * @param {WebGLRenderingContext} gl 
       * @param {string} name 
       * @param {WebGLProgram} program 
       */
      constructor(gl, name, program) {
            this.#gl = gl;
            this.#pointer = this.#gl.getUniformLocation(program, name);
            this.#texture = this.#gl.createTexture();
            this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture);
      }

      /**
       * 
       * @param {string} value 
       */
      write(value) {  
            if (this.#image === value) {
                  return;
            }

            this.#dirty = true;
            this.#image = value;

            this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture);
            this.#gl.texImage2D(this.#gl.TEXTURE_2D, 0, this.#gl.RGBA, 1, 1, 0, this.#gl.RGBA, this.#gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

            const image = ImageCache.get(value);
            this.#gl.texImage2D(this.#gl.TEXTURE_2D, 0, this.#gl.RGBA, this.#gl.RGBA,this.#gl.UNSIGNED_BYTE, image);
            this.#gl.generateMipmap(this.#gl.TEXTURE_2D);
                  
      }

      bind() {
            if (!this.#dirty) {
                  return;
            }
            this.#dirty = false;
            this.#gl.activeTexture(this.#gl.TEXTURE0);
            this.#gl.uniform1i(this.#pointer, 0);
            this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture);
      }
}