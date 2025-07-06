export class SharedUniformBuffer {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} type
     */
    constructor(gl: WebGLRenderingContext, type: string);
    /**
     * @param {number[]} values
     */
    write(values: number[]): void;
    /**
     *
     * @param {WebGLProgram} program
     * @param {string} name
     * @returns
     */
    bind(program: WebGLProgram, name: string): void;
    #private;
}
//# sourceMappingURL=SharedUniformBuffer.d.ts.map