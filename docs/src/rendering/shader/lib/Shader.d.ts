export default class Shader {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} vertex
     * @param {string} fragment
     */
    constructor(gl: WebGLRenderingContext, vertex: string, fragment: string);
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    /**
     * @param {string} name
     */
    createBuffer(name: string): Buffer;
    createIndexBuffer(): IndexBuffer;
    /**
     * @param {string} name
     */
    createUniform(name: string): UniformBuffer;
    /**
     * @param {string} name
     */
    createTexture(name: string): Texture;
    bind(): void;
    /**
     *
     * @param {number} count
     * @param {number} [mode=this.#gl.TRIANGLES]
     */
    draw(count: number, mode?: number): void;
    /**
     *
     * @param {number} count
     * @param {number} [mode=this.#gl.TRIANGLES]
     */
    drawIndexed(count: number, mode?: number): void;
    #private;
}
import { Buffer } from "./buffer/Buffer.js";
import { IndexBuffer } from "./buffer/IndexBuffer.js";
import { UniformBuffer } from "./buffer/UniformBuffer.js";
import { Texture } from "./buffer/Texture.js";
//# sourceMappingURL=Shader.d.ts.map